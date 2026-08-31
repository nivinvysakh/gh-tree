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
  weeks: ContributionWeek[];
}

const QUERY = `
  query ($login: String!, $from: DateTime!, $to: DateTime!, $assignedQuery: String!) {
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
  }
`;

/**
 * Fetches the authenticated user's contribution calendar, authored PRs,
 * merged PRs, and assigned PRs using GitHub's GraphQL API.
 */
export async function fetchContributions(
  token: string,
  login: string,
  days: number
): Promise<ContributionData> {
  const to = new Date();
  const from = new Date(to.getTime() - days * 24 * 60 * 60 * 1000);
  const assignedQuery = `is:pr is:open assignee:${login}`;

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

  // Collect and deduplicate PR events
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
        countedMergedPRs.add(prKey);
        const dateStr = (pr.mergedAt || item.occurredAt || pr.createdAt || "").slice(0, 10);
        assignPRToWeek(weeks, dateStr, "merged");
      }
    } else if (pr.state === "OPEN") {
      if (!countedOpenPRs.has(prKey)) {
        countedOpenPRs.add(prKey);
        const dateStr = (item.occurredAt || pr.createdAt || "").slice(0, 10);
        assignPRToWeek(weeks, dateStr, "open");
      }
    }
  }

  // Process direct openPRs query
  const directOpenNodes = userData.openPRs?.nodes || [];
  for (const pr of directOpenNodes) {
    const prKey = pr.id || pr.url || pr.createdAt;
    if (!countedOpenPRs.has(prKey)) {
      countedOpenPRs.add(prKey);
      const dateStr = (pr.createdAt || "").slice(0, 10);
      assignPRToWeek(weeks, dateStr, "open");
    }
  }

  // Process direct mergedPRs query
  const directMergedNodes = userData.mergedPRs?.nodes || [];
  for (const pr of directMergedNodes) {
    const prKey = pr.id || pr.url || pr.mergedAt || pr.createdAt;
    if (!countedMergedPRs.has(prKey)) {
      countedMergedPRs.add(prKey);
      const dateStr = (pr.mergedAt || pr.createdAt || "").slice(0, 10);
      assignPRToWeek(weeks, dateStr, "merged");
    }
  }

  // Process assigned PRs from search
  const assignedNodes = json.data?.assignedPRs?.nodes || [];
  for (const pr of assignedNodes) {
    if (!pr) continue;
    const prKey = pr.id || pr.url || pr.createdAt;
    if (!countedAssignedPRs.has(prKey)) {
      countedAssignedPRs.add(prKey);
      const dateStr = (pr.createdAt || "").slice(0, 10);
      assignPRToWeek(weeks, dateStr, "assigned");
    }
  }

  return {
    totalCommits: calendar.totalContributions || 0,
    totalOpenPRs: countedOpenPRs.size,
    totalMergedPRs: countedMergedPRs.size,
    totalAssignedPRs: countedAssignedPRs.size,
    weeks,
  };
}

function assignPRToWeek(
  weeks: ContributionWeek[],
  dateStr: string,
  type: "open" | "merged" | "assigned"
): void {
  if (weeks.length === 0) return;

  let matchedIndex = weeks.findIndex((w) => {
    if (w.days.length === 0) return false;
    const start = w.days[0].date;
    const end = w.days[w.days.length - 1].date;
    return dateStr >= start && dateStr <= end;
  });

  if (matchedIndex === -1) {
    if (dateStr < (weeks[0].days[0]?.date || "")) {
      matchedIndex = 0;
    } else {
      matchedIndex = weeks.length - 1;
    }
  }

  if (matchedIndex >= 0 && matchedIndex < weeks.length) {
    if (type === "open") {
      weeks[matchedIndex].openPRs += 1;
    } else if (type === "merged") {
      weeks[matchedIndex].mergedPRs += 1;
    } else {
      weeks[matchedIndex].assignedPRs += 1;
    }
  }
}
