import * as core from "@actions/core";
import * as fs from "fs";
import * as path from "path";
import { execSync } from "child_process";
import { fetchContributions } from "./github";
import { buildTreeLayout } from "./tree";
import { renderFrame } from "./svg";
import { encodeGif } from "./gif";
import { updateMarkdownFile } from "./markdown";

function tryAutoCommit(files: string[], message: string): void {
  try {
    // Check if inside a git repository
    execSync("git rev-parse --is-inside-work-tree", { stdio: "ignore" });

    // Ensure git user identity is configured
    try {
      execSync("git config user.name", { stdio: "ignore" });
    } catch {
      execSync('git config user.name "github-actions[bot]"');
      execSync('git config user.email "41898282+github-actions[bot]@users.noreply.github.com"');
    }

    const filesToAdd: string[] = [];
    for (const file of files) {
      if (fs.existsSync(file)) {
        execSync(`git add -f "${file}"`);
        filesToAdd.push(file);
      }
    }

    const diff = execSync("git diff --staged --name-only", { encoding: "utf-8" }).trim();
    if (diff.length > 0) {
      execSync(`git commit -m "${message}"`);
      execSync("git push");
      core.info(`✓ Committed and pushed updated files: ${diff.split("\n").join(", ")}`);
    } else {
      core.info("No file changes to commit.");
    }
  } catch (err) {
    core.info(`Auto-commit info: ${err instanceof Error ? err.message : String(err)}`);
  }
}

async function run(): Promise<void> {
  try {
    const token =
      core.getInput("github-token") ||
      process.env.GITHUB_TOKEN ||
      process.env.TREE_PAT ||
      "";
    if (!token) {
      throw new Error("Missing required input: 'github-token' (e.g. ${{ secrets.GITHUB_TOKEN }} or ${{ secrets.TREE_PAT }})");
    }

    const login =
      core.getInput("github-login") ||
      process.env.GITHUB_REPOSITORY_OWNER ||
      (process.env.GITHUB_REPOSITORY ? process.env.GITHUB_REPOSITORY.split("/")[0] : "");
    if (!login) {
      throw new Error("Missing required input: 'github-login' and could not detect repository owner.");
    }

    const outputPath = core.getInput("output-path") || "tree.gif";
    const markdownPath = core.getInput("markdown-path") || "README.md";
    const autoCommit = core.getInput("auto-commit") !== "false";
    const commitMessage = core.getInput("commit-message") || "chore: update commit tree [skip ci]";
    const days = parseInt(core.getInput("days") || "140", 10);
    const frameCount = parseInt(core.getInput("frames") || "20", 10);
    const frameDelayMs = parseInt(core.getInput("frame-delay-ms") || "100", 10);
    const width = parseInt(core.getInput("width") || "460", 10);
    const height = parseInt(core.getInput("height") || "420", 10);

    core.info(`Fetching contribution calendar and PRs for @${login} (last ${days} days)...`);
    const contributions = await fetchContributions(token, login, days);
    core.info(
      `Activity in range: ${contributions.totalCommits} commits (leaves), ` +
        `${contributions.totalOpenPRs} open PRs (flowers), ` +
        `${contributions.totalMergedPRs} merged PRs (red apples), ` +
        `${contributions.totalAssignedPRs} assigned PRs (golden apples).`
    );

    const layout = buildTreeLayout(contributions.weeks, undefined, { width, height });

    core.info(`Rendering ${frameCount} frames...`);
    const frames = Array.from({ length: frameCount }, (_, i) => ({
      svg: renderFrame(layout, i, frameCount),
    }));

    core.info("Encoding animated GIF...");
    const gifBytes = await encodeGif(frames, width, height, frameDelayMs);

    const resolvedPath = path.resolve(outputPath);
    fs.mkdirSync(path.dirname(resolvedPath), { recursive: true });
    fs.writeFileSync(resolvedPath, gifBytes);
    core.info(`Wrote tree GIF to ${resolvedPath}`);

    const filesToCommit: string[] = [resolvedPath];

    if (markdownPath && markdownPath.trim().length > 0) {
      updateMarkdownFile(markdownPath, resolvedPath, "tree");
      core.info(`Updated markdown at ${markdownPath} with ![tree](${path.basename(resolvedPath)})`);
      filesToCommit.push(path.resolve(markdownPath));
    }

    if (autoCommit) {
      tryAutoCommit(filesToCommit, commitMessage);
    }

    core.setOutput("gif-path", resolvedPath);
    core.setOutput("total-commits", String(contributions.totalCommits));
    core.setOutput("open-prs", String(contributions.totalOpenPRs));
    core.setOutput("merged-prs", String(contributions.totalMergedPRs));
    core.setOutput("assigned-prs", String(contributions.totalAssignedPRs));
  } catch (err) {
    core.setFailed(err instanceof Error ? err.message : String(err));
  }
}

run();
