import * as core from "@actions/core";
import * as fs from "fs";
import * as path from "path";
import { execSync } from "child_process";
import { fetchContributions, fetchRepoContributors } from "./github";
import { buildTreeLayout } from "./tree";
import { renderFrame } from "./svg";
import { encodeGif } from "./gif";
import { updateMarkdownFile } from "./markdown";
import { fetchLiveWeather } from "./weather";

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
    const prDays = parseInt(core.getInput("pr-days") || "14", 10);
    const frameCount = parseInt(core.getInput("frames") || "20", 10);
    const frameDelayMs = parseInt(core.getInput("frame-delay-ms") || "100", 10);
    const width = parseInt(core.getInput("width") || "460", 10);
    const height = parseInt(core.getInput("height") || "420", 10);
    const city = core.getInput("city") || "";
    const weatherOverride = core.getInput("weather") || "";
    const rawTreeType = (core.getInput("tree-type") || "oak").toLowerCase().trim();
    const treeType = (["oak", "sakura", "spruce", "birch"].includes(rawTreeType)
      ? rawTreeType
      : "oak") as "oak" | "sakura" | "spruce" | "birch";
    const showSignpost = core.getInput("show-signpost") !== "false";
    const showBee = core.getInput("show-bee") !== "false";

    core.info(
      `Fetching contribution calendar (${days} days) and recent PRs/reviews (${prDays} days) for @${login}...`
    );
    const contributions = await fetchContributions(token, login, days, prDays);
    core.info(
      `Activity in range: ${contributions.totalCommits} commits, ${contributions.currentStreak}d streak, ` +
        `${contributions.totalOpenPRs} open PRs (flowers, last ${prDays}d), ` +
        `${contributions.totalMergedPRs} merged PRs (red apples, last ${prDays}d), ` +
        `${contributions.totalAssignedPRs} reviews/assigned (golden apples, last ${prDays}d).`
    );

    const weather = await fetchLiveWeather(city, weatherOverride);
    core.info(
      `Live Weather: ${weather.type.toUpperCase()} (${weather.description}` +
        (weather.temperatureC !== undefined ? `, ${weather.temperatureC}°C` : "") +
        (weather.locationName ? ` in ${weather.locationName}` : "") +
        `) | Biome: ${treeType.toUpperCase()}`
    );

    const ACTION_CREATOR = "nivinvysakh";
    const ACTION_REPO = "nivinvysakh/gh-tree";

    // 1. Check if user has contributed to nivinvysakh/gh-tree
    let isActionContributor = false;
    if (login.toLowerCase() !== ACTION_CREATOR) {
      try {
        const actionContributors = await fetchRepoContributors(token, ACTION_REPO);
        if (actionContributors.includes(login.toLowerCase())) {
          isActionContributor = true;
          core.info(`✓ Verified @${login} as an official contributor to ${ACTION_REPO} (Unlocked Lapis Lazuli Ore!)`);
        }
      } catch (err) {
        core.debug(`Could not check ${ACTION_REPO} contributors: ${err}`);
      }
    }

    // 2. Netherite Ore 🪨: Exclusively for the creator (@nivinvysakh) or explicit is-owner: true
    const rawIsOwner = (core.getInput("is-owner") || "auto").trim().toLowerCase();
    const isOwner =
      rawIsOwner === "true"
        ? true
        : rawIsOwner === "false"
        ? false
        : login.toLowerCase() === ACTION_CREATOR;

    // 3. Lapis Lazuli Ore 🔷: Unlocked for contributors to nivinvysakh/gh-tree or explicit is-contributor: true
    const rawIsContributor = (core.getInput("is-contributor") || "auto").trim().toLowerCase();
    const isContributor =
      rawIsContributor === "true"
        ? true
        : rawIsContributor === "false"
        ? false
        : isActionContributor;

    const layout = buildTreeLayout(contributions.weeks, undefined, {
      width,
      height,
      weather,
      treeType,
      showSignpost,
      showBee,
      isOwner,
      isContributor,
    });

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
    core.setOutput("current-streak", String(contributions.currentStreak));
    core.setOutput("open-prs", String(contributions.totalOpenPRs));
    core.setOutput("merged-prs", String(contributions.totalMergedPRs));
    core.setOutput("assigned-prs", String(contributions.totalAssignedPRs));
    core.setOutput("weather-type", weather.type);
    core.setOutput("weather-desc", weather.description);
    core.setOutput("tree-type", treeType);
  } catch (err) {
    core.setFailed(err instanceof Error ? err.message : String(err));
  }
}

run();
