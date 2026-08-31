import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { fetchContributions } from "../src/github";

describe("github module", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("fetches and correctly parses contribution calendar and PRs strictly within window", async () => {
    const mockGraphQLResponse = {
      data: {
        user: {
          contributionsCollection: {
            contributionCalendar: {
              totalContributions: 42,
              weeks: [
                {
                  contributionDays: [
                    { date: "2026-08-10", contributionCount: 3 },
                    { date: "2026-08-11", contributionCount: 2 },
                  ],
                },
                {
                  contributionDays: [
                    { date: "2026-08-17", contributionCount: 5 },
                    { date: "2026-08-18", contributionCount: 0 },
                  ],
                },
              ],
            },
            pullRequestContributions: {
              nodes: [
                {
                  occurredAt: "2026-08-10T10:00:00Z",
                  pullRequest: {
                    id: "pr_1",
                    url: "https://github.com/test/repo/pull/1",
                    state: "OPEN",
                    merged: false,
                    createdAt: "2026-08-10T09:00:00Z",
                  },
                },
                {
                  occurredAt: "2026-08-17T14:00:00Z",
                  pullRequest: {
                    id: "pr_2",
                    url: "https://github.com/test/repo/pull/2",
                    state: "MERGED",
                    merged: true,
                    mergedAt: "2026-08-17T15:00:00Z",
                    createdAt: "2026-08-16T08:00:00Z",
                  },
                },
              ],
            },
          },
          openPRs: {
            totalCount: 1,
            nodes: [
              {
                id: "pr_1",
                url: "https://github.com/test/repo/pull/1",
                createdAt: "2026-08-10T09:00:00Z",
              },
            ],
          },
          mergedPRs: {
            totalCount: 2,
            nodes: [
              {
                id: "pr_2",
                url: "https://github.com/test/repo/pull/2",
                mergedAt: "2026-08-17T15:00:00Z",
                createdAt: "2026-08-16T08:00:00Z",
              },
              // Old merged PR from 2 years ago (must be ignored!)
              {
                id: "pr_old",
                url: "https://github.com/test/repo/pull/old",
                mergedAt: "2024-01-01T00:00:00Z",
                createdAt: "2023-12-01T00:00:00Z",
              },
            ],
          },
        },
        assignedPRs: {
          issueCount: 1,
          nodes: [
            {
              id: "pr_3",
              url: "https://github.com/test/repo/pull/3",
              createdAt: "2026-08-10T11:00:00Z",
            },
          ],
        },
      },
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockGraphQLResponse,
    });

    const result = await fetchContributions("fake_token", "testuser", 30);

    expect(result.totalCommits).toBe(42);
    expect(result.totalOpenPRs).toBe(1);
    // pr_old was outside window, so only 1 merged PR counted
    expect(result.totalMergedPRs).toBe(1);
    expect(result.totalAssignedPRs).toBe(1);
    expect(result.weeks).toHaveLength(2);

    expect(result.weeks[0].total).toBe(5);
    expect(result.weeks[0].openPRs).toBe(1);
    expect(result.weeks[0].assignedPRs).toBe(1);
    expect(result.weeks[0].mergedPRs).toBe(0);

    expect(result.weeks[1].total).toBe(5);
    expect(result.weeks[1].openPRs).toBe(0);
    expect(result.weeks[1].mergedPRs).toBe(1);
  });

  it("throws on HTTP errors", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 401,
      statusText: "Unauthorized",
    });

    await expect(fetchContributions("bad_token", "testuser", 30)).rejects.toThrow(
      "GitHub GraphQL request failed: 401 Unauthorized"
    );
  });

  it("throws on GraphQL errors", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        errors: [{ message: "Field not found" }],
      }),
    });

    await expect(fetchContributions("fake_token", "testuser", 30)).rejects.toThrow(
      "GitHub GraphQL errors"
    );
  });
});
