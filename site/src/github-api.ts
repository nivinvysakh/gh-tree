import { ContributionData, ContributionDay, ContributionWeek } from "../../src/github";

export interface GitHubUserProfile {
  login: string;
  name: string;
  avatarUrl: string;
  bio: string;
  publicRepos: number;
  followers: number;
}

/**
 * Calculates the current consecutive active day streak from a sorted list of contribution days.
 */
export function calculateBrowserStreak(days: { date: string; count: number }[]): number {
  if (!days || days.length === 0) return 0;
  
  // Sort ascending by date (oldest to newest)
  const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date));
  
  let streak = 0;
  let idx = sorted.length - 1;

  // If the last day (today) has 0 contributions, check if streak is alive from yesterday
  if (idx >= 0 && sorted[idx].count === 0) {
    idx--;
  }

  while (idx >= 0 && sorted[idx].count > 0) {
    streak++;
    idx--;
  }

  return streak;
}

/**
 * Fetches basic public profile information for a GitHub user.
 */
export async function fetchGitHubProfile(username: string): Promise<GitHubUserProfile> {
  const cleanUser = username.trim().replace(/^@/, "");
  try {
    const res = await fetch(`https://api.github.com/users/${encodeURIComponent(cleanUser)}`);
    if (res.ok) {
      const data = await res.json();
      return {
        login: data.login || cleanUser,
        name: data.name || data.login || cleanUser,
        avatarUrl: data.avatar_url || `https://github.com/${cleanUser}.png?size=200`,
        bio: data.bio || "GitHub Developer",
        publicRepos: data.public_repos || 0,
        followers: data.followers || 0,
      };
    }
  } catch (err) {
    console.warn("Could not fetch user profile from GitHub API:", err);
  }

  return {
    login: cleanUser,
    name: cleanUser,
    avatarUrl: `https://github.com/${cleanUser}.png?size=200`,
    bio: "Minecraft Profile Gardener",
    publicRepos: 12,
    followers: 42,
  };
}

/**
 * Fetches PR counts (open, merged, assigned/reviews) for a user from the public GitHub Search API.
 */
export async function fetchUserPRStats(username: string): Promise<{ openPRs: number; mergedPRs: number; assignedPRs: number }> {
  const cleanUser = username.trim().replace(/^@/, "");
  let openPRs = 2;
  let mergedPRs = 3;
  let assignedPRs = 1;

  try {
    const [resOpen, resMerged] = await Promise.allSettled([
      fetch(`https://api.github.com/search/issues?q=author:${encodeURIComponent(cleanUser)}+type:pr+state:open`),
      fetch(`https://api.github.com/search/issues?q=author:${encodeURIComponent(cleanUser)}+type:pr+is:merged`),
    ]);

    if (resOpen.status === "fulfilled" && resOpen.value.ok) {
      const data = await resOpen.value.json();
      if (typeof data.total_count === "number") {
        openPRs = Math.min(4, Math.max(0, data.total_count));
      }
    }

    if (resMerged.status === "fulfilled" && resMerged.value.ok) {
      const data = await resMerged.value.json();
      if (typeof data.total_count === "number") {
        mergedPRs = Math.min(4, Math.max(0, data.total_count));
      }
    }
  } catch (err) {
    console.warn("Could not fetch PR counts from GitHub Search API:", err);
  }

  return { openPRs, mergedPRs, assignedPRs };
}

/**
 * Checks repository owner and contributor status for a given GitHub username.
 */
export async function checkUserStatus(username: string): Promise<{ isOwner: boolean; isContributor: boolean }> {
  const clean = username.trim().toLowerCase().replace(/^@/, "");
  const isOwner = clean === "nivinvysakh";
  let isContributor = isOwner;

  if (!isContributor) {
    try {
      const res = await fetch("https://api.github.com/repos/nivinvysakh/gh-tree/contributors");
      if (res.ok) {
        const list = await res.json();
        if (Array.isArray(list)) {
          isContributor = list.some((c: any) => c.login?.toLowerCase() === clean);
        }
      }
    } catch (err) {
      console.warn("Could not check repo contributors:", err);
    }
  }

  return { isOwner, isContributor };
}

/**
 * Fetches the user's contribution graph from the CORS-friendly public contributions API.
 * Maps to the gh-tree ContributionData format with real PR counts and streak.
 */
export async function fetchGitHubContributions(
  username: string,
  openPRsOverride?: number,
  mergedPRsOverride?: number,
  assignedPRsOverride?: number
): Promise<ContributionData> {
  const cleanUser = username.trim().replace(/^@/, "");

  // If overrides not explicitly passed, fetch real PR stats in parallel
  const prStatsPromise = (openPRsOverride === undefined || mergedPRsOverride === undefined || assignedPRsOverride === undefined)
    ? fetchUserPRStats(cleanUser)
    : Promise.resolve({
        openPRs: openPRsOverride ?? 2,
        mergedPRs: mergedPRsOverride ?? 4,
        assignedPRs: assignedPRsOverride ?? 1,
      });

  try {
    const [contribRes, prStats] = await Promise.all([
      fetch(`https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(cleanUser)}?y=last`),
      prStatsPromise,
    ]);

    const openPRs = openPRsOverride ?? prStats.openPRs;
    const mergedPRs = mergedPRsOverride ?? prStats.mergedPRs;
    const assignedPRs = assignedPRsOverride ?? prStats.assignedPRs;

    if (contribRes.ok) {
      const data = await contribRes.json();
      if (data.contributions && Array.isArray(data.contributions) && data.contributions.length > 0) {
        const allDays: { date: string; count: number }[] = data.contributions;
        
        // Take the last 28 days (4 weeks) for the tree canopy
        const recentDays = allDays.slice(-28);
        const weeks: ContributionWeek[] = [];

        for (let w = 0; w < 4; w++) {
          const slice = recentDays.slice(w * 7, (w + 1) * 7);
          const days: ContributionDay[] = slice.map((d) => ({
            date: d.date,
            count: d.count,
          }));
          const total = days.reduce((sum, d) => sum + d.count, 0);

          weeks.push({
            days,
            total,
            openPRs: Math.round(openPRs / 4),
            mergedPRs: Math.round(mergedPRs / 4),
            assignedPRs: Math.round(assignedPRs / 4),
          });
        }

        const totalCommits = data.total?.lastYear || allDays.reduce((sum, d) => sum + d.count, 0);
        const calculatedStreak = calculateBrowserStreak(allDays);

        return {
          totalCommits,
          totalOpenPRs: openPRs,
          totalMergedPRs: mergedPRs,
          totalAssignedPRs: assignedPRs,
          currentStreak: calculatedStreak,
          weeks,
        };
      }
    }
  } catch (err) {
    console.warn("Could not fetch from contributions API, falling back to simulated data:", err);
  }

  const prStats = await prStatsPromise;
  const openPRs = openPRsOverride ?? prStats.openPRs;
  const mergedPRs = mergedPRsOverride ?? prStats.mergedPRs;
  const assignedPRs = assignedPRsOverride ?? prStats.assignedPRs;

  // Fallback mock contribution calendar
  return generateMockContributions(48, 14, openPRs, mergedPRs, assignedPRs);
}

/**
 * Generates customizable mock contribution data for live playground previewing.
 */
export function generateMockContributions(
  totalCommits: number = 42,
  streak: number = 14,
  openPRs: number = 2,
  mergedPRs: number = 3,
  assignedPRs: number = 1
): ContributionData {
  const weeks: ContributionWeek[] = [];
  const now = new Date();

  for (let w = 0; w < 4; w++) {
    const days: ContributionDay[] = [];
    let weekTotal = 0;

    for (let d = 0; d < 7; d++) {
      const dayOffset = (3 - w) * 7 + (6 - d);
      const date = new Date(now.getTime() - dayOffset * 86400000);
      const dateStr = date.toISOString().split("T")[0];
      
      // Distribute commits realistically
      const count = Math.floor(Math.random() * 5) + (dayOffset < streak ? 1 : 0);
      weekTotal += count;
      days.push({ date: dateStr, count });
    }

    weeks.push({
      days,
      total: weekTotal,
      openPRs: Math.round(openPRs / 4),
      mergedPRs: Math.round(mergedPRs / 4),
      assignedPRs: Math.round(assignedPRs / 4),
    });
  }

  return {
    totalCommits,
    totalOpenPRs: openPRs,
    totalMergedPRs: mergedPRs,
    totalAssignedPRs: assignedPRs,
    currentStreak: streak,
    weeks,
  };
}
