export interface ContributionDay {
  date: string; // YYYY-MM-DD
  count: number;
}

export interface ContributionWeek {
  days: ContributionDay[];
  total: number;
  openPRs: number;
  mergedPRs: number;
  assignedPRs: number;
}

export interface ContributionData {
  totalCommits: number;
  totalOpenPRs: number;
  totalMergedPRs: number;
  totalAssignedPRs: number;
  currentStreak: number;
  weeks: ContributionWeek[];
}

const QUERY = `
  query ($login: String!, $from: DateTime!, $to: DateTime!, $assignedQuery: String!, $reviewQuery: String!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
        pullRequestContributions(first: 100) {
          nodes {
            occurredAt
            pullRequest {
              id
              url
              state
              merged
              mergedAt
              createdAt
            }
          }
        }
        pullRequestReviewContributions(first: 100) {
          nodes {
            occurredAt
            pullRequest {
              id
              url
              createdAt
            }
          }
        }
      }
      openPRs: pullRequests(states: [OPEN], first: 100, orderBy: {field: CREATED_AT, direction: DESC}) {
        totalCount
        nodes {
          id
          url
          createdAt
        }
      }
      mergedPRs: pullRequests(states: [MERGED], first: 100, orderBy: {field: CREATED_AT, direction: DESC}) {
        totalCount
        nodes {
          id
          url
          mergedAt
          createdAt
        }
      }
    }
    assignedPRs: search(query: $assignedQuery, type: ISSUE, first: 100) {
      issueCount
      nodes {
        ... on PullRequest {
          id
          url
          createdAt
        }
      }
    }
    reviewedPRs: search(query: $reviewQuery, type: ISSUE, first: 100) {
      issueCount
      nodes {
        ... on PullRequest {
          id
          url
          createdAt
        }
      }
    }
  }
`;

/**
 * Fetches the authenticated user's contribution calendar (over `days`), and
 * authored PRs, merged PRs, PR reviews, and assigned PRs within the recency window (`prDays`).
 */
export async function fetchContributions(
  token: string,
  login: string,
  days: number,
  prDays: number = 14
): Promise<ContributionData> {
  const to = new Date();
  const from = new Date(to.getTime() - days * 24 * 60 * 60 * 1000);
  const prFrom = new Date(to.getTime() - prDays * 24 * 60 * 60 * 1000);
  const prStartDate = prFrom.toISOString().slice(0, 10);

  const assignedQuery = `is:pr is:open assignee:${login}`;
  const reviewQuery = `is:pr reviewed-by:${login}`;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "commit-tree-action",
    },
    body: JSON.stringify({
      query: QUERY,
      variables: {
        login,
        from: from.toISOString(),
        to: to.toISOString(),
        assignedQuery,
        reviewQuery,
      },
    }),
  });

  if (!res.ok) {
    throw new Error(`GitHub GraphQL request failed: ${res.status} ${res.statusText}`);
  }

  const json = (await res.json()) as any;

  if (json.errors) {
    throw new Error(`GitHub GraphQL errors: ${JSON.stringify(json.errors)}`);
  }

  const userData = json.data?.user;
  if (!userData) {
    throw new Error(`GitHub user '@${login}' not found or inaccessible.`);
  }

  const collection = userData.contributionsCollection || {};
  const calendar = collection.contributionCalendar || { totalContributions: 0, weeks: [] };

  const weeks: ContributionWeek[] = (calendar.weeks || []).map((w: any) => {
    const days: ContributionDay[] = (w.contributionDays || []).map((d: any) => ({
      date: d.date,
      count: d.contributionCount || 0,
    }));
    return {
      days,
      total: days.reduce((sum, d) => sum + d.count, 0),
      openPRs: 0,
      mergedPRs: 0,
      assignedPRs: 0,
    };
  });

  // Collect and deduplicate PR events strictly within the recency window (prDays)
  const countedOpenPRs = new Set<string>();
  const countedMergedPRs = new Set<string>();
  const countedAssignedPRs = new Set<string>();

  // Process pullRequestContributions from contributionsCollection
  const prContribs = collection.pullRequestContributions?.nodes || [];
  for (const item of prContribs) {
    const pr = item.pullRequest;
    if (!pr) continue;
    const prKey = pr.id || pr.url || `${pr.createdAt}-${pr.state}`;

    if (pr.merged || pr.state === "MERGED") {
      if (!countedMergedPRs.has(prKey)) {
        const dateStr = (pr.mergedAt || item.occurredAt || pr.createdAt || "").slice(0, 10);
        if (assignPRToWeek(weeks, dateStr, "merged", prStartDate)) {
          countedMergedPRs.add(prKey);
        }
      }
    } else if (pr.state === "OPEN") {
      if (!countedOpenPRs.has(prKey)) {
        const dateStr = (item.occurredAt || pr.createdAt || "").slice(0, 10);
        if (assignPRToWeek(weeks, dateStr, "open", prStartDate)) {
          countedOpenPRs.add(prKey);
        }
      }
    }
  }

  // Process pullRequestReviewContributions (PR Reviews -> Golden Apples 🍏✨)
  const reviewContribs = collection.pullRequestReviewContributions?.nodes || [];
  for (const item of reviewContribs) {
    const pr = item.pullRequest;
    if (!pr) continue;
    const prKey = `review-${pr.id || pr.url || item.occurredAt}`;
    if (!countedAssignedPRs.has(prKey)) {
      const dateStr = (item.occurredAt || pr.createdAt || "").slice(0, 10);
      if (assignPRToWeek(weeks, dateStr, "assigned", prStartDate)) {
        countedAssignedPRs.add(prKey);
      }
    }
  }

  // Process direct openPRs query
  const directOpenNodes = userData.openPRs?.nodes || [];
  for (const pr of directOpenNodes) {
    const prKey = pr.id || pr.url || pr.createdAt;
    if (!countedOpenPRs.has(prKey)) {
      const dateStr = (pr.createdAt || "").slice(0, 10);
      if (assignPRToWeek(weeks, dateStr, "open", prStartDate)) {
        countedOpenPRs.add(prKey);
      }
    }
  }

  // Process direct mergedPRs query
  const directMergedNodes = userData.mergedPRs?.nodes || [];
  for (const pr of directMergedNodes) {
    const prKey = pr.id || pr.url || pr.mergedAt || pr.createdAt;
    if (!countedMergedPRs.has(prKey)) {
      const dateStr = (pr.mergedAt || pr.createdAt || "").slice(0, 10);
      if (assignPRToWeek(weeks, dateStr, "merged", prStartDate)) {
        countedMergedPRs.add(prKey);
      }
    }
  }

  // Process assigned PRs from search
  const assignedNodes = json.data?.assignedPRs?.nodes || [];
  for (const pr of assignedNodes) {
    if (!pr) continue;
    const prKey = pr.id || pr.url || pr.createdAt;
    if (!countedAssignedPRs.has(prKey)) {
      const dateStr = (pr.createdAt || "").slice(0, 10);
      if (assignPRToWeek(weeks, dateStr, "assigned", prStartDate)) {
        countedAssignedPRs.add(prKey);
      }
    }
  }

  // Process reviewed PRs from search
  const reviewedNodes = json.data?.reviewedPRs?.nodes || [];
  for (const pr of reviewedNodes) {
    if (!pr) continue;
    const prKey = `rev-search-${pr.id || pr.url || pr.createdAt}`;
    if (!countedAssignedPRs.has(prKey)) {
      const dateStr = (pr.createdAt || "").slice(0, 10);
      if (assignPRToWeek(weeks, dateStr, "assigned", prStartDate)) {
        countedAssignedPRs.add(prKey);
      }
    }
  }

  const currentStreak = calculateStreak(weeks);

  return {
    totalCommits: calendar.totalContributions || 0,
    totalOpenPRs: countedOpenPRs.size,
    totalMergedPRs: countedMergedPRs.size,
    totalAssignedPRs: countedAssignedPRs.size,
    currentStreak,
    weeks,
  };
}

/**
 * Computes the consecutive active contribution day streak from weekly contribution data.
 * Checks up to today/yesterday so ongoing days don't prematurely break active streaks.
 */
export function calculateStreak(weeks: ContributionWeek[]): number {
  const allDays: ContributionDay[] = [];
  for (const w of weeks) {
    for (const d of w.days) {
      allDays.push(d);
    }
  }

  if (allDays.length === 0) return 0;

  // Sort ascending by date
  allDays.sort((a, b) => a.date.localeCompare(b.date));

  let streak = 0;
  let idx = allDays.length - 1;

  // If the last day (today) has 0 contributions, check if yesterday had contributions
  if (allDays[idx].count === 0) {
    idx--;
  }

  while (idx >= 0 && allDays[idx].count > 0) {
    streak++;
    idx--;
  }

  return streak;
}

function assignPRToWeek(
  weeks: ContributionWeek[],
  dateStr: string,
  type: "open" | "merged" | "assigned",
  minDateStr?: string
): boolean {
  if (weeks.length === 0 || !dateStr) return false;

  const firstWeek = weeks[0];
  const lastWeek = weeks[weeks.length - 1];
  const windowStart = minDateStr || firstWeek.days[0]?.date || "";
  const windowEnd = lastWeek.days[lastWeek.days.length - 1]?.date || "";

  // Strictly enforce that the PR must have occurred within the recency window
  if (windowStart && dateStr < windowStart) {
    return false;
  }
  if (windowEnd && dateStr > windowEnd) {
    return false;
  }

  const matchedIndex = weeks.findIndex((w) => {
    if (w.days.length === 0) return false;
    const start = w.days[0].date;
    const end = w.days[w.days.length - 1].date;
    return dateStr >= start && dateStr <= end;
  });

  if (matchedIndex >= 0 && matchedIndex < weeks.length) {
    if (type === "open") {
      weeks[matchedIndex].openPRs += 1;
    } else if (type === "merged") {
      weeks[matchedIndex].mergedPRs += 1;
    } else {
      weeks[matchedIndex].assignedPRs += 1;
    }
    return true;
  }

  return false;
}
