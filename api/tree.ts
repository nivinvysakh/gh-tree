import { calculateTree, TreeOptions, TreeType, PetType, ChestType, SeasonalEvent } from "../src/tree";
import { generateSvg } from "../src/svg";
import { encodeGif } from "../src/gif";
import { ContributionData, ContributionDay, ContributionWeek } from "../src/github";
import { WeatherCondition, fetchLiveWeather } from "../src/weather";

/**
 * Calculates current streak from an array of contribution days.
 */
function calculateDaysStreak(allDays: { date: string; count: number }[]): number {
  if (!allDays || allDays.length === 0) return 0;
  const sorted = [...allDays].sort((a, b) => a.date.localeCompare(b.date));
  let streak = 0;
  let idx = sorted.length - 1;

  if (idx >= 0 && sorted[idx].count === 0) {
    idx--;
  }

  while (idx >= 0 && sorted[idx].count > 0) {
    streak++;
    idx--;
  }

  return streak;
}

interface CachedPRStats {
  openPRs: number;
  mergedPRs: number;
  assignedPRs: number;
  timestamp: number;
}

const prStatsCache = new Map<string, CachedPRStats>();

/**
 * Fetches real PR stats (open, merged) from GitHub Search API for a user with in-memory caching.
 */
async function fetchUserPRStats(username: string): Promise<{ openPRs: number; mergedPRs: number; assignedPRs: number }> {
  const clean = username.toLowerCase().trim().replace(/^@/, "");
  const now = Date.now();
  const cached = prStatsCache.get(clean);
  if (cached && now - cached.timestamp < 3600_000) {
    return { openPRs: cached.openPRs, mergedPRs: cached.mergedPRs, assignedPRs: cached.assignedPRs };
  }

  let openPRs = 0;
  let mergedPRs = 0;
  let assignedPRs = 0;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    const [resOpen, resMerged] = await Promise.allSettled([
      fetch(`https://api.github.com/search/issues?q=author:${encodeURIComponent(clean)}+type:pr+state:open`, {
        signal: controller.signal,
        headers: { "User-Agent": "gh-tree-api", Accept: "application/vnd.github.v3+json" },
      }),
      fetch(`https://api.github.com/search/issues?q=author:${encodeURIComponent(clean)}+type:pr+is:merged`, {
        signal: controller.signal,
        headers: { "User-Agent": "gh-tree-api", Accept: "application/vnd.github.v3+json" },
      }),
    ]);
    clearTimeout(timeout);

    if (resOpen.status === "fulfilled" && resOpen.value.ok) {
      const data: any = await resOpen.value.json();
      if (typeof data.total_count === "number") {
        openPRs = Math.min(4, Math.max(0, data.total_count));
      }
    }

    if (resMerged.status === "fulfilled" && resMerged.value.ok) {
      const data: any = await resMerged.value.json();
      if (typeof data.total_count === "number") {
        mergedPRs = Math.min(4, Math.max(0, data.total_count));
      }
    }

    prStatsCache.set(clean, { openPRs, mergedPRs, assignedPRs, timestamp: now });
  } catch (err) {
    console.warn("Could not fetch real PR stats, defaulting to 0:", err);
  }

  return { openPRs, mergedPRs, assignedPRs };
}

/**
 * Fetches contributions for a user using public endpoints.
 */
export async function fetchUserContributions(
  username: string,
  openPRsOverride?: number,
  mergedPRsOverride?: number,
  assignedPRsOverride?: number
): Promise<ContributionData> {
  const cleanUser = username.trim().replace(/^@/, "");
  if (!cleanUser) {
    throw new Error("Missing or invalid GitHub username.");
  }

  const prStatsPromise =
    openPRsOverride === undefined || mergedPRsOverride === undefined || assignedPRsOverride === undefined
      ? fetchUserPRStats(cleanUser)
      : Promise.resolve({
          openPRs: openPRsOverride ?? 0,
          mergedPRs: mergedPRsOverride ?? 0,
          assignedPRs: assignedPRsOverride ?? 0,
        });

  // 1. Fetch public contribution calendar & PR stats in parallel
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);

  let contribRes: Response;
  let prStats: { openPRs: number; mergedPRs: number; assignedPRs: number };

  try {
    const [cRes, stats] = await Promise.all([
      fetch(`https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(cleanUser)}?y=last`, {
        signal: controller.signal,
        headers: {
          "User-Agent": "gh-tree-api",
        },
      }),
      prStatsPromise,
    ]);
    contribRes = cRes;
    prStats = stats;
  } catch (err: any) {
    if (err?.name === "AbortError") {
      throw new Error("GitHub contribution service timed out. Please try again.");
    }
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }

  if (contribRes.status === 404) {
    throw new Error(`User "@${cleanUser}" not found on GitHub.`);
  }

  if (!contribRes.ok) {
    throw new Error(`Failed to fetch contributions for "@${cleanUser}" (HTTP ${contribRes.status}).`);
  }

  const data: any = await contribRes.json();
  const allDays: { date: string; count: number }[] = Array.isArray(data.contributions) ? data.contributions : [];

  if (allDays.length === 0) {
    throw new Error(`No contribution data found for "@${cleanUser}".`);
  }

  const openPRs = openPRsOverride ?? prStats.openPRs;
  const mergedPRs = mergedPRsOverride ?? prStats.mergedPRs;
  const assignedPRs = assignedPRsOverride ?? prStats.assignedPRs;

  // Slice the most recent 28 days into 4 distinct weeks
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

  const totalCommits = data.total?.lastYear ?? allDays.reduce((sum, d) => sum + d.count, 0);
  const currentStreak = calculateDaysStreak(allDays);

  return {
    totalCommits,
    totalOpenPRs: openPRs,
    totalMergedPRs: mergedPRs,
    totalAssignedPRs: assignedPRs,
    currentStreak,
    weeks,
  };
}

/**
 * Builds the weather condition based on user parameter.
 */
export function resolveWeather(weatherParam?: string): WeatherCondition {
  const norm = (weatherParam || "auto").toLowerCase().trim();
  switch (norm) {
    case "rain":
      return { type: "rain", description: "Rainy shower", isDay: true, temperatureC: 14 };
    case "snow":
      return { type: "snow", description: "Snowing", isDay: true, temperatureC: -2 };
    case "night":
      return { type: "night", description: "Starry night", isDay: false, temperatureC: 18 };
    case "cloudy":
      return { type: "cloudy", description: "Overcast", isDay: true, temperatureC: 16 };
    case "clear":
    case "sunny":
    case "auto":
    default:
      return { type: "sunny", description: "Clear sky", isDay: true, temperatureC: 22 };
  }
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<": return "&lt;";
      case ">": return "&gt;";
      case "&": return "&amp;";
      case "'": return "&apos;";
      case '"': return "&quot;";
      default: return c;
    }
  });
}

/**
 * Generates a Minecraft-themed Error SVG that renders cleanly on GitHub READMEs.
 */
export function renderErrorSvg(message: string, username?: string): string {
  const width = 500;
  const height = 180;
  const safeUser = escapeXml(username || "user");
  const safeMsg = escapeXml(message || "Error loading Minecraft tree");

  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .mc-title { font-family: 'Minecraft', 'Courier New', monospace, sans-serif; font-size: 14px; font-weight: bold; fill: #ff5555; }
      .mc-sub { font-family: 'Minecraft', 'Courier New', monospace, sans-serif; font-size: 11px; fill: #aaaaaa; }
      .mc-btn { font-family: 'Minecraft', 'Courier New', monospace, sans-serif; font-size: 10px; fill: #55ff55; }
    </style>
  </defs>
  <!-- Background Card -->
  <rect x="0" y="0" width="${width}" height="${height}" rx="8" fill="#141419" stroke="#33333d" stroke-width="2"/>
  
  <!-- Minecraft Redstone Alert Icon -->
  <rect x="24" y="24" width="32" height="32" rx="4" fill="#990000" stroke="#ff4444" stroke-width="2"/>
  <text x="40" y="46" font-family="monospace" font-size="20" font-weight="bold" fill="#ffffff" text-anchor="middle">!</text>

  <!-- Error Text -->
  <text x="68" y="38" class="mc-title">Minecraft Contribution Tree</text>
  <text x="68" y="56" class="mc-sub">${safeMsg}</text>

  <!-- Help / Instructions Box -->
  <rect x="24" y="76" width="452" height="80" rx="6" fill="#1e1e26" stroke="#2c2c38" stroke-width="1.5"/>
  <text x="40" y="98" class="mc-sub" fill="#dddddd">Tip: Make sure the GitHub username is valid and public.</text>
  <text x="40" y="118" class="mc-sub">Format: https://gh-tree.vercel.app/api/tree?user=${safeUser}&amp;theme=oak</text>
  <text x="40" y="138" class="mc-btn">Customize live at: https://gh-tree.vercel.app</text>
</svg>`;
}

let cachedContributors: { list: Set<string>; timestamp: number } | null = null;

/**
 * Checks if a user has contributed to nivinvysakh/gh-tree.
 * Results are cached in memory for 1 hour to prevent GitHub API rate limits.
 */
export async function checkIsRepoContributor(username: string): Promise<boolean> {
  const clean = username.toLowerCase().trim();
  const now = Date.now();

  if (cachedContributors && now - cachedContributors.timestamp < 3600_000) {
    return cachedContributors.list.has(clean);
  }

  try {
    const res = await fetch("https://api.github.com/repos/nivinvysakh/gh-tree/contributors?per_page=100", {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "gh-tree-api",
      },
    });

    if (res.ok) {
      const data = (await res.json()) as any[];
      if (Array.isArray(data)) {
        const logins = new Set(data.map((c: any) => (c.login || "").toLowerCase().trim()).filter(Boolean));
        cachedContributors = { list: logins, timestamp: now };
        return logins.has(clean);
      }
    }
  } catch (err) {
    console.warn("Could not check repo contributors:", err);
  }

  return cachedContributors ? cachedContributors.list.has(clean) : false;
}

/**
 * Main Serverless API Handler
 */
export default async function handler(req: any, res: any) {
  // Support query params from both Next.js/Vercel (req.query) and URL string
  let query = req.query || {};
  if (!query || Object.keys(query).length === 0) {
    try {
      const url = new URL(req.url || "", `http://${req.headers?.host || "localhost"}`);
      const params: Record<string, string> = {};
      url.searchParams.forEach((v, k) => {
        params[k] = v;
      });
      query = params;
    } catch {
      query = {};
    }
  }

  const rawUser = query.user || query.username || query.login || "";
  const username = String(rawUser).trim();

  // CORS & Caching Headers
  res.setHeader?.("Access-Control-Allow-Origin", "*");
  res.setHeader?.("Access-Control-Allow-Methods", "GET, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.status?.(200).end?.();
  }

  if (!username) {
    const errorSvg = renderErrorSvg("Missing 'user' query parameter (e.g. ?user=username)");
    res.setHeader?.("Content-Type", "image/svg+xml; charset=utf-8");
    res.setHeader?.("Cache-Control", "public, max-age=300");
    return res.status ? res.status(400).send(errorSvg) : errorSvg;
  }

  // Parse Options
  const rawTheme = (query.theme || query.type || query.biome || "oak").toLowerCase().trim();
  const theme: TreeType = [
    "oak",
    "sakura",
    "spruce",
    "birch",
    "jungle",
    "dark_oak",
    "acacia",
    "mangrove",
    "crimson",
    "warped",
  ].includes(rawTheme)
    ? (rawTheme as TreeType)
    : "oak";

  const city = query.city || query.location;
  const weather = city ? await fetchLiveWeather(String(city), query.weather) : resolveWeather(query.weather);

  const rawPet = (query.pet || "auto").toLowerCase().trim();
  const pet: PetType | "none" | "auto" = ["none", "auto", "wolf", "fox", "cat"].includes(rawPet)
    ? (rawPet as PetType | "none" | "auto")
    : "auto";

  const rawChest = (query.chest || "auto").toLowerCase().trim();
  let showChest: boolean | "auto" = "auto";
  if (rawChest === "true" || rawChest === "1") showChest = true;
  else if (rawChest === "false" || rawChest === "0" || rawChest === "none") showChest = false;

  const rawCampfire = (query.campfire || "auto").toLowerCase().trim();
  let showCampfire: boolean | "auto" = "auto";
  if (rawCampfire === "true" || rawCampfire === "1") showCampfire = true;
  else if (rawCampfire === "false" || rawCampfire === "0" || rawCampfire === "none") showCampfire = false;

  const rawEvent = (query.event || "auto").toLowerCase().trim();
  const event: SeasonalEvent | "auto" = ["auto", "none", "halloween", "holiday", "fireworks"].includes(rawEvent)
    ? (rawEvent as SeasonalEvent | "auto")
    : "auto";

  const openPRs = query.openPRs !== undefined ? parseInt(String(query.openPRs), 10) : undefined;
  const mergedPRs = query.mergedPRs !== undefined ? parseInt(String(query.mergedPRs), 10) : undefined;
  const assignedPRs = query.assignedPRs !== undefined ? parseInt(String(query.assignedPRs), 10) : undefined;
  const frameIndex = query.frame !== undefined ? Math.max(0, Math.min(11, parseInt(String(query.frame), 10) || 0)) : 0;

  const rawFormat = (query.format || query.ext || "").toLowerCase().trim();
  // Default to animated GIF unless format=svg is explicitly requested
  const isGif = rawFormat !== "svg" && rawFormat !== "static";

  try {
    const contributionData = await fetchUserContributions(username, openPRs, mergedPRs, assignedPRs);

    const cleanUser = username.toLowerCase().trim();
    const rawIsOwner = query.isOwner !== undefined ? String(query.isOwner).toLowerCase().trim() : undefined;
    const isOwner = rawIsOwner === "true" ? true : rawIsOwner === "false" ? false : cleanUser === "nivinvysakh";

    const rawIsContributor = query.isContributor !== undefined ? String(query.isContributor).toLowerCase().trim() : undefined;
    const isContributor =
      rawIsContributor === "true"
        ? true
        : rawIsContributor === "false"
        ? false
        : isOwner
        ? false
        : await checkIsRepoContributor(cleanUser);

    const treeOpts: TreeOptions = {
      treeType: theme,
      weather,
      pet,
      showChest,
      showCampfire,
      event,
      isOwner,
      isContributor,
    };

    const treeLayout = calculateTree(contributionData, treeOpts);

    if (isGif) {
      const frames: { svg: string }[] = [];
      for (let i = 0; i < 12; i++) {
        frames.push({ svg: generateSvg(treeLayout, i, 12) });
      }
      const gifBytes = await encodeGif(frames, treeLayout.width, treeLayout.height, 200);
      const gifBuffer = Buffer.from(gifBytes);

      res.setHeader?.("Content-Type", "image/gif");
      res.setHeader?.("Cache-Control", "public, max-age=14400, s-maxage=14400, stale-while-revalidate=86400");

      return res.status ? res.status(200).send(gifBuffer) : gifBuffer;
    }

    const svgOutput = generateSvg(treeLayout, frameIndex, 12);

    res.setHeader?.("Content-Type", "image/svg+xml; charset=utf-8");
    // Cache for 4 hours on CDN and 4 hours in browser; revalidate smoothly
    res.setHeader?.("Cache-Control", "public, max-age=14400, s-maxage=14400, stale-while-revalidate=86400");

    return res.status ? res.status(200).send(svgOutput) : svgOutput;
  } catch (error: any) {
    const errorSvg = renderErrorSvg(error.message || "Could not generate tree", username);
    res.setHeader?.("Content-Type", "image/svg+xml; charset=utf-8");
    res.setHeader?.("Cache-Control", "public, max-age=300");
    return res.status ? res.status(200).send(errorSvg) : errorSvg;
  }
}
