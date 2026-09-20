export interface ContributionDay {
    date: string;
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
/**
 * Fetches the authenticated user's contribution calendar (over `days`), and
 * authored PRs, merged PRs, PR reviews, and assigned PRs within the recency window (`prDays`).
 */
export declare function fetchContributions(token: string, login: string, days: number, prDays?: number): Promise<ContributionData>;
/**
 * Computes the consecutive active contribution day streak from weekly contribution data.
 * Checks up to today/yesterday so ongoing days don't prematurely break active streaks.
 */
export declare function calculateStreak(weeks: ContributionWeek[]): number;
/**
 * Fetches the list of contributor logins for a repository (e.g. "owner/repo").
 * Returns an array of lowercase usernames.
 */
export declare function fetchRepoContributors(token: string, repository: string): Promise<string[]>;
//# sourceMappingURL=github.d.ts.map