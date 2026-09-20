"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const child_process_1 = require("child_process");
const github_1 = require("./github");
const tree_1 = require("./tree");
const svg_1 = require("./svg");
const gif_1 = require("./gif");
const markdown_1 = require("./markdown");
const weather_1 = require("./weather");
function tryAutoCommit(files, message) {
    try {
        // Check if inside a git repository
        (0, child_process_1.execSync)("git rev-parse --is-inside-work-tree", { stdio: "ignore" });
        // Ensure git user identity is configured
        try {
            (0, child_process_1.execSync)("git config user.name", { stdio: "ignore" });
        }
        catch {
            (0, child_process_1.execSync)('git config user.name "github-actions[bot]"');
            (0, child_process_1.execSync)('git config user.email "41898282+github-actions[bot]@users.noreply.github.com"');
        }
        const filesToAdd = [];
        for (const file of files) {
            if (fs.existsSync(file)) {
                (0, child_process_1.execSync)(`git add -f "${file}"`);
                filesToAdd.push(file);
            }
        }
        const diff = (0, child_process_1.execSync)("git diff --staged --name-only", { encoding: "utf-8" }).trim();
        if (diff.length > 0) {
            (0, child_process_1.execSync)(`git commit -m "${message}"`);
            (0, child_process_1.execSync)("git push");
            core.info(`✓ Committed and pushed updated files: ${diff.split("\n").join(", ")}`);
        }
        else {
            core.info("No file changes to commit.");
        }
    }
    catch (err) {
        core.info(`Auto-commit info: ${err instanceof Error ? err.message : String(err)}`);
    }
}
async function run() {
    try {
        const token = core.getInput("github-token") ||
            process.env.GITHUB_TOKEN ||
            process.env.TREE_PAT ||
            "";
        if (!token) {
            throw new Error("Missing required input: 'github-token' (e.g. ${{ secrets.GITHUB_TOKEN }} or ${{ secrets.TREE_PAT }})");
        }
        const login = core.getInput("github-login") ||
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
        const width = parseInt(core.getInput("width") || "920", 10);
        const height = parseInt(core.getInput("height") || "500", 10);
        const city = core.getInput("city") || "";
        const weatherOverride = core.getInput("weather") || "";
        const rawTreeType = (core.getInput("tree-type") || "oak").toLowerCase().trim();
        const validTreeTypes = [
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
        ];
        const treeType = (validTreeTypes.includes(rawTreeType)
            ? rawTreeType
            : "oak");
        const showSignpost = core.getInput("show-signpost") !== "false";
        const showBee = core.getInput("show-bee") !== "false";
        core.info(`Fetching contribution calendar (${days} days) and recent PRs/reviews (${prDays} days) for @${login}...`);
        const contributions = await (0, github_1.fetchContributions)(token, login, days, prDays);
        core.info(`Activity in range: ${contributions.totalCommits} commits, ${contributions.currentStreak}d streak, ` +
            `${contributions.totalOpenPRs} open PRs (flowers, last ${prDays}d), ` +
            `${contributions.totalMergedPRs} merged PRs (red apples, last ${prDays}d), ` +
            `${contributions.totalAssignedPRs} reviews/assigned (golden apples, last ${prDays}d).`);
        const weather = await (0, weather_1.fetchLiveWeather)(city, weatherOverride);
        core.info(`Live Weather: ${weather.type.toUpperCase()} (${weather.description}` +
            (weather.temperatureC !== undefined ? `, ${weather.temperatureC}°C` : "") +
            (weather.locationName ? ` in ${weather.locationName}` : "") +
            `) | Biome: ${treeType.toUpperCase()}`);
        const ACTION_CREATOR = "nivinvysakh";
        const ACTION_REPO = "nivinvysakh/gh-tree";
        // 1. Check if user has contributed to nivinvysakh/gh-tree
        let isActionContributor = false;
        if (login.toLowerCase() !== ACTION_CREATOR) {
            try {
                const actionContributors = await (0, github_1.fetchRepoContributors)(token, ACTION_REPO);
                if (actionContributors.includes(login.toLowerCase())) {
                    isActionContributor = true;
                    core.info(`✓ Verified @${login} as an official contributor to ${ACTION_REPO} (Unlocked Lapis Lazuli Ore!)`);
                }
            }
            catch (err) {
                core.debug(`Could not check ${ACTION_REPO} contributors: ${err}`);
            }
        }
        // 2. Netherite Ore 🪨: Exclusively for the creator (@nivinvysakh) or explicit is-owner: true
        const rawIsOwner = (core.getInput("is-owner") || "auto").trim().toLowerCase();
        const isOwner = rawIsOwner === "true"
            ? true
            : rawIsOwner === "false"
                ? false
                : login.toLowerCase() === ACTION_CREATOR;
        // 3. Lapis Lazuli Ore 🔷: Unlocked for contributors to nivinvysakh/gh-tree or explicit is-contributor: true
        const rawIsContributor = (core.getInput("is-contributor") || "auto").trim().toLowerCase();
        const isContributor = rawIsContributor === "true"
            ? true
            : rawIsContributor === "false"
                ? false
                : isActionContributor;
        const rawPet = (core.getInput("pet") || "auto").trim().toLowerCase();
        const pet = (["auto", "wolf", "fox", "cat", "parrot", "none"].includes(rawPet)
            ? rawPet
            : "auto");
        const parseAutoBool = (val) => {
            const v = (val || "auto").trim().toLowerCase();
            if (v === "true")
                return true;
            if (v === "false")
                return false;
            return "auto";
        };
        const showFarmer = parseAutoBool(core.getInput("show-farmer"));
        const rawFarmerMood = (core.getInput("farmer-mood") || "auto").trim().toLowerCase();
        const farmerMood = (["auto", "sad", "dancing", "watering"].includes(rawFarmerMood)
            ? rawFarmerMood
            : "auto");
        const showCampfire = parseAutoBool(core.getInput("show-campfire"));
        const showChest = parseAutoBool(core.getInput("show-chest"));
        const rawEvent = (core.getInput("event") || "auto").trim().toLowerCase();
        const event = (["auto", "halloween", "holiday", "fireworks", "none"].includes(rawEvent)
            ? rawEvent
            : "auto");
        const rawGrowth = (core.getInput("growth") || "auto").trim().toLowerCase();
        const growth = (["auto", "standard", "expanded"].includes(rawGrowth)
            ? rawGrowth
            : "auto");
        const layout = (0, tree_1.buildTreeLayout)(contributions.weeks, undefined, {
            width,
            height,
            weather,
            treeType,
            growth,
            showSignpost,
            showBee,
            isOwner,
            isContributor,
            pet,
            showFarmer,
            farmerMood,
            showCampfire,
            showChest,
            event,
        });
        core.info(`Rendering ${frameCount} frames...`);
        const frames = Array.from({ length: frameCount }, (_, i) => ({
            svg: (0, svg_1.renderFrame)(layout, i, frameCount),
        }));
        core.info("Encoding animated GIF...");
        const gifBytes = await (0, gif_1.encodeGif)(frames, width, height, frameDelayMs);
        const resolvedPath = path.resolve(outputPath);
        fs.mkdirSync(path.dirname(resolvedPath), { recursive: true });
        fs.writeFileSync(resolvedPath, gifBytes);
        core.info(`Wrote tree GIF to ${resolvedPath}`);
        const filesToCommit = [resolvedPath];
        if (markdownPath && markdownPath.trim().length > 0) {
            (0, markdown_1.updateMarkdownFile)(markdownPath, resolvedPath, "tree");
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
    }
    catch (err) {
        core.setFailed(err instanceof Error ? err.message : String(err));
    }
}
run();
//# sourceMappingURL=main.js.map