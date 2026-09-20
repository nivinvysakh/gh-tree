"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeGifInfo = exports.updateMarkdownFile = exports.updateMarkdownContent = exports.renderSeasonalFairyLights = exports.renderSeasonalHolidayGifts = exports.renderHalloweenGhosts = exports.renderSeasonalJackOLantern = exports.renderMinecraftChest = exports.renderMinecraftCampfire = exports.renderMinecraftParrot = exports.renderMinecraftCat = exports.renderMinecraftFox = exports.renderMinecraftWolf = exports.renderMinecraftFarmer = exports.renderMinecraftSignpost = exports.renderMinecraftBeehive = exports.renderMinecraftBee = exports.renderGoldenAppleOnGrass = exports.renderApple = exports.renderFlowerOnGrass = exports.renderMinecraftLeaf = exports.renderMinecraftLog = exports.renderMinecraftGround = exports.renderSeasonalFireworks = exports.renderSakuraPetals = exports.renderSnowflakes = exports.renderRainStreaks = exports.renderMinecraftCloud = exports.renderBioluminescentParticles = exports.renderMinecraftStars = exports.renderMinecraftMoon = exports.renderMinecraftSun = exports.mapWmoCodeToWeatherType = exports.fetchLiveWeather = exports.calculateStreak = exports.fetchContributions = exports.encodeGif = exports.generateSvg = exports.renderFrame = exports.CANOPY_SLOTS = exports.EXPANDED_CANOPY_SLOTS = exports.STANDARD_CANOPY_SLOTS = exports.MAX_GOLDEN_APPLES = exports.MAX_APPLES = exports.MAX_FLOWERS = exports.PIXEL_SCALE = exports.BLOCK_PIXELS = exports.BLOCK_SIZE = exports.getCommitLevel = exports.buildTreeLayout = void 0;
exports.parseWeatherString = parseWeatherString;
exports.resolveTreeContext = resolveTreeContext;
exports.createTreeLayout = createTreeLayout;
exports.generateTreeFrames = generateTreeFrames;
exports.generateTreeSvg = generateTreeSvg;
exports.generateTreeGif = generateTreeGif;
exports.inspectTreeLayout = inspectTreeLayout;
exports.extractTreeSummary = extractTreeSummary;
const tree_1 = require("../../src/tree");
Object.defineProperty(exports, "buildTreeLayout", { enumerable: true, get: function () { return tree_1.buildTreeLayout; } });
Object.defineProperty(exports, "BLOCK_SIZE", { enumerable: true, get: function () { return tree_1.BLOCK_SIZE; } });
Object.defineProperty(exports, "BLOCK_PIXELS", { enumerable: true, get: function () { return tree_1.BLOCK_PIXELS; } });
Object.defineProperty(exports, "PIXEL_SCALE", { enumerable: true, get: function () { return tree_1.PIXEL_SCALE; } });
Object.defineProperty(exports, "MAX_FLOWERS", { enumerable: true, get: function () { return tree_1.MAX_FLOWERS; } });
Object.defineProperty(exports, "MAX_APPLES", { enumerable: true, get: function () { return tree_1.MAX_APPLES; } });
Object.defineProperty(exports, "MAX_GOLDEN_APPLES", { enumerable: true, get: function () { return tree_1.MAX_GOLDEN_APPLES; } });
Object.defineProperty(exports, "STANDARD_CANOPY_SLOTS", { enumerable: true, get: function () { return tree_1.STANDARD_CANOPY_SLOTS; } });
Object.defineProperty(exports, "EXPANDED_CANOPY_SLOTS", { enumerable: true, get: function () { return tree_1.EXPANDED_CANOPY_SLOTS; } });
Object.defineProperty(exports, "CANOPY_SLOTS", { enumerable: true, get: function () { return tree_1.CANOPY_SLOTS; } });
Object.defineProperty(exports, "getCommitLevel", { enumerable: true, get: function () { return tree_1.getCommitLevel; } });
const svg_1 = require("../../src/svg");
Object.defineProperty(exports, "renderFrame", { enumerable: true, get: function () { return svg_1.renderFrame; } });
Object.defineProperty(exports, "generateSvg", { enumerable: true, get: function () { return svg_1.generateSvg; } });
const gif_1 = require("../../src/gif");
Object.defineProperty(exports, "encodeGif", { enumerable: true, get: function () { return gif_1.encodeGif; } });
const github_1 = require("../../src/github");
Object.defineProperty(exports, "fetchContributions", { enumerable: true, get: function () { return github_1.fetchContributions; } });
Object.defineProperty(exports, "calculateStreak", { enumerable: true, get: function () { return github_1.calculateStreak; } });
const weather_1 = require("../../src/weather");
Object.defineProperty(exports, "fetchLiveWeather", { enumerable: true, get: function () { return weather_1.fetchLiveWeather; } });
Object.defineProperty(exports, "mapWmoCodeToWeatherType", { enumerable: true, get: function () { return weather_1.mapWmoCodeToWeatherType; } });
const environment_1 = require("../../src/environment");
Object.defineProperty(exports, "renderMinecraftSun", { enumerable: true, get: function () { return environment_1.renderMinecraftSun; } });
Object.defineProperty(exports, "renderMinecraftMoon", { enumerable: true, get: function () { return environment_1.renderMinecraftMoon; } });
Object.defineProperty(exports, "renderMinecraftStars", { enumerable: true, get: function () { return environment_1.renderMinecraftStars; } });
Object.defineProperty(exports, "renderBioluminescentParticles", { enumerable: true, get: function () { return environment_1.renderBioluminescentParticles; } });
Object.defineProperty(exports, "renderMinecraftCloud", { enumerable: true, get: function () { return environment_1.renderMinecraftCloud; } });
Object.defineProperty(exports, "renderRainStreaks", { enumerable: true, get: function () { return environment_1.renderRainStreaks; } });
Object.defineProperty(exports, "renderSnowflakes", { enumerable: true, get: function () { return environment_1.renderSnowflakes; } });
Object.defineProperty(exports, "renderSakuraPetals", { enumerable: true, get: function () { return environment_1.renderSakuraPetals; } });
Object.defineProperty(exports, "renderSeasonalFireworks", { enumerable: true, get: function () { return environment_1.renderSeasonalFireworks; } });
const props_1 = require("../../src/props");
Object.defineProperty(exports, "renderMinecraftGround", { enumerable: true, get: function () { return props_1.renderMinecraftGround; } });
Object.defineProperty(exports, "renderMinecraftLog", { enumerable: true, get: function () { return props_1.renderMinecraftLog; } });
Object.defineProperty(exports, "renderMinecraftLeaf", { enumerable: true, get: function () { return props_1.renderMinecraftLeaf; } });
Object.defineProperty(exports, "renderFlowerOnGrass", { enumerable: true, get: function () { return props_1.renderFlowerOnGrass; } });
Object.defineProperty(exports, "renderApple", { enumerable: true, get: function () { return props_1.renderApple; } });
Object.defineProperty(exports, "renderGoldenAppleOnGrass", { enumerable: true, get: function () { return props_1.renderGoldenAppleOnGrass; } });
Object.defineProperty(exports, "renderMinecraftBee", { enumerable: true, get: function () { return props_1.renderMinecraftBee; } });
Object.defineProperty(exports, "renderMinecraftBeehive", { enumerable: true, get: function () { return props_1.renderMinecraftBeehive; } });
Object.defineProperty(exports, "renderMinecraftSignpost", { enumerable: true, get: function () { return props_1.renderMinecraftSignpost; } });
Object.defineProperty(exports, "renderMinecraftFarmer", { enumerable: true, get: function () { return props_1.renderMinecraftFarmer; } });
Object.defineProperty(exports, "renderMinecraftWolf", { enumerable: true, get: function () { return props_1.renderMinecraftWolf; } });
Object.defineProperty(exports, "renderMinecraftFox", { enumerable: true, get: function () { return props_1.renderMinecraftFox; } });
Object.defineProperty(exports, "renderMinecraftCat", { enumerable: true, get: function () { return props_1.renderMinecraftCat; } });
Object.defineProperty(exports, "renderMinecraftParrot", { enumerable: true, get: function () { return props_1.renderMinecraftParrot; } });
Object.defineProperty(exports, "renderMinecraftCampfire", { enumerable: true, get: function () { return props_1.renderMinecraftCampfire; } });
Object.defineProperty(exports, "renderMinecraftChest", { enumerable: true, get: function () { return props_1.renderMinecraftChest; } });
Object.defineProperty(exports, "renderSeasonalJackOLantern", { enumerable: true, get: function () { return props_1.renderSeasonalJackOLantern; } });
Object.defineProperty(exports, "renderHalloweenGhosts", { enumerable: true, get: function () { return props_1.renderHalloweenGhosts; } });
Object.defineProperty(exports, "renderSeasonalHolidayGifts", { enumerable: true, get: function () { return props_1.renderSeasonalHolidayGifts; } });
Object.defineProperty(exports, "renderSeasonalFairyLights", { enumerable: true, get: function () { return props_1.renderSeasonalFairyLights; } });
const markdown_1 = require("../../src/markdown");
Object.defineProperty(exports, "updateMarkdownContent", { enumerable: true, get: function () { return markdown_1.updateMarkdownContent; } });
Object.defineProperty(exports, "updateMarkdownFile", { enumerable: true, get: function () { return markdown_1.updateMarkdownFile; } });
const decode_1 = require("./decode");
Object.defineProperty(exports, "decodeGifInfo", { enumerable: true, get: function () { return decode_1.decodeGifInfo; } });
/**
 * Parses free-form weather string into a WeatherCondition object.
 */
function parseWeatherString(input) {
    const norm = input.trim().toLowerCase();
    if (norm.includes("rain") || norm.includes("storm") || norm.includes("drizzle")) {
        return { type: "rain", description: "Rain showers", isDay: !norm.includes("night") };
    }
    if (norm.includes("snow") || norm.includes("blizzard") || norm.includes("ice")) {
        return { type: "snow", description: "Snowfall", isDay: !norm.includes("night") };
    }
    if (norm.includes("cloud") || norm.includes("overcast") || norm.includes("fog")) {
        return { type: "cloudy", description: "Cloudy overcast", isDay: !norm.includes("night") };
    }
    if (norm.includes("night")) {
        return { type: "night", description: "Clear starry night", isDay: false };
    }
    return { type: "sunny", description: "Clear daylight sky", isDay: true };
}
/**
 * Resolves full contribution data and weather condition from options.
 */
async function resolveTreeContext(options) {
    let weeks = options.weeks ? [...options.weeks] : [];
    let totalCommits = options.totalCommits ?? 0;
    let openPRs = options.openPRs ?? 0;
    let mergedPRs = options.mergedPRs ?? 0;
    let assignedPRs = options.assignedPRs ?? 0;
    let streak = options.streak ?? 0;
    if (options.username && (!options.weeks || options.weeks.length === 0)) {
        const token = options.token || process.env.GITHUB_TOKEN || process.env.GH_TOKEN || "";
        const data = await (0, github_1.fetchContributions)(token, options.username, 365, 14);
        weeks = data.weeks;
        totalCommits = options.totalCommits ?? data.totalCommits;
        openPRs = options.openPRs ?? data.totalOpenPRs;
        mergedPRs = options.mergedPRs ?? data.totalMergedPRs;
        assignedPRs = options.assignedPRs ?? data.totalAssignedPRs;
        streak = options.streak ?? data.currentStreak;
    }
    let weather = { type: "sunny", description: "Clear sky" };
    if (typeof options.weather === "string") {
        weather = parseWeatherString(options.weather);
    }
    else if (options.weather) {
        weather = options.weather;
    }
    else if (options.city) {
        weather = await (0, weather_1.fetchLiveWeather)(options.city);
    }
    return {
        weeks,
        totalCommits,
        openPRs,
        mergedPRs,
        assignedPRs,
        streak,
        weather,
    };
}
/**
 * Builds the complete TreeLayout from options.
 */
async function createTreeLayout(options) {
    const ctx = await resolveTreeContext(options);
    return (0, tree_1.buildTreeLayout)(ctx.weeks, ctx.totalCommits, {
        width: options.width ?? 920,
        height: options.height ?? 500,
        weather: ctx.weather,
        treeType: options.treeType ?? "oak",
        growth: options.growth ?? "auto",
        showSignpost: options.showSignpost,
        showBee: options.showBee,
        pet: options.pet,
        showFarmer: options.showFarmer,
        farmerMood: options.farmerMood,
        showCampfire: options.showCampfire,
        showChest: options.showChest,
        event: options.event,
        currentDate: options.currentDate,
        streak: ctx.streak,
        openPRs: ctx.openPRs,
        mergedPRs: ctx.mergedPRs,
        assignedPRs: ctx.assignedPRs,
        isOwner: options.isOwner,
        isContributor: options.isContributor,
    });
}
/**
 * Generates an array of animated SVG frame strings.
 */
async function generateTreeFrames(options) {
    const layout = await createTreeLayout(options);
    const totalFrames = Math.max(1, options.frames ?? 20);
    const frames = [];
    for (let i = 0; i < totalFrames; i++) {
        frames.push((0, svg_1.renderFrame)(layout, i, totalFrames));
    }
    return frames;
}
/**
 * Generates a single static SVG string (or specified frame index).
 */
async function generateTreeSvg(options, frameIndex = 0) {
    const layout = await createTreeLayout(options);
    const totalFrames = Math.max(1, options.frames ?? 20);
    return (0, svg_1.renderFrame)(layout, frameIndex % totalFrames, totalFrames);
}
/**
 * Generates a complete looping animated GIF buffer from input options.
 */
async function generateTreeGif(options) {
    const width = options.width ?? 920;
    const height = options.height ?? 500;
    const delayMs = options.frameDelayMs ?? 100;
    const svgFrames = await generateTreeFrames(options);
    const frames = svgFrames.map((svg) => ({ svg }));
    return (0, gif_1.encodeGif)(frames, width, height, delayMs);
}
/**
 * Inspects and extracts a structured analytical summary from a TreeLayout.
 */
function inspectTreeLayout(layout) {
    const activeLeaves = layout.leafBlocks.filter((l) => l.commitCount > 0 || l.commitLevel > 0).length;
    const dormantLeaves = layout.leafBlocks.length - activeLeaves;
    return {
        width: layout.width,
        height: layout.height,
        groundY: layout.groundY,
        treeType: layout.treeType,
        growthStage: layout.growthStage ?? (layout.leafBlocks.length > 14 ? "expanded" : "standard"),
        trunkBlocksCount: layout.trunkBlocks.length,
        leafBlocksCount: layout.leafBlocks.length,
        activeLeafBlocksCount: activeLeaves,
        dormantLeafBlocksCount: dormantLeaves,
        flowersCount: layout.flowers.length,
        applesCount: layout.apples.length,
        goldenApplesCount: layout.goldenApples.length,
        ores: layout.oreBlocks || [],
        streak: layout.currentStreak,
        weather: layout.weather,
        seasonalEvent: layout.seasonalEvent !== "none" ? layout.seasonalEvent : undefined,
        hasPet: !!layout.pet,
        petType: layout.pet?.type,
        hasFarmer: !!layout.farmer,
        farmerMood: layout.farmer?.mood,
        hasBee: !!layout.bee,
        hasBeehive: !!layout.beehive,
        hasCampfire: !!layout.campfire,
        hasChest: !!layout.chest,
        chestType: layout.chest?.type,
    };
}
/**
 * Converts a TreeLayout into a human-readable text summary.
 */
function extractTreeSummary(layout) {
    const summary = inspectTreeLayout(layout);
    return [
        `Tree Species: ${summary.treeType.toUpperCase()}`,
        `Growth Stage: ${summary.growthStage.toUpperCase()} (${summary.trunkBlocksCount} logs, ${summary.leafBlocksCount} leaves)`,
        `Active Foliage: ${summary.activeLeafBlocksCount} active / ${summary.dormantLeafBlocksCount} dormant`,
        `Streak: ${summary.streak} days`,
        `Flowers (Open PRs): ${summary.flowersCount}`,
        `Apples (Merged PRs): ${summary.applesCount}`,
        `Golden Apples (Reviews/Assigned): ${summary.goldenApplesCount}`,
        `Weather: ${summary.weather.type} (${summary.weather.description})`,
        `Ores: ${summary.ores.map((o) => o.type).join(", ") || "none"}`,
        `Companion Pet: ${summary.petType || "none"}`,
        `Farmer Mood: ${summary.farmerMood || "none"}`,
        `Seasonal Event: ${summary.seasonalEvent || "none"}`,
    ].join("\n");
}
//# sourceMappingURL=index.js.map