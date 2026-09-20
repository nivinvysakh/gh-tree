import {
  buildTreeLayout,
  TreeLayout,
  TreeType,
  TreeGrowthMode,
  BLOCK_SIZE,
  BLOCK_PIXELS,
  PIXEL_SCALE,
  MAX_FLOWERS,
  MAX_APPLES,
  MAX_GOLDEN_APPLES,
  STANDARD_CANOPY_SLOTS,
  EXPANDED_CANOPY_SLOTS,
  CANOPY_SLOTS,
  getCommitLevel,
  LeafBlockPos,
  FlowerPos,
  ApplePos,
  GoldenApplePos,
  OreBlockPos,
  OreType,
  PetType,
  PetPos,
  FarmerMood,
  FarmerPos,
  CampfirePos,
  ChestType,
  ChestPos,
  SeasonalEvent,
  HolidayGiftPos,
  JackOLanternPos,
} from "../../src/tree";

import { renderFrame, generateSvg } from "../../src/svg";
import { encodeGif, Frame } from "../../src/gif";
import {
  fetchContributions,
  calculateStreak,
  ContributionDay,
  ContributionWeek,
  ContributionData,
} from "../../src/github";
import {
  fetchLiveWeather,
  mapWmoCodeToWeatherType,
  WeatherCondition,
  WeatherType,
} from "../../src/weather";
import {
  renderMinecraftSun,
  renderMinecraftMoon,
  renderMinecraftStars,
  renderBioluminescentParticles,
  renderMinecraftCloud,
  renderRainStreaks,
  renderSnowflakes,
  renderSakuraPetals,
  renderSeasonalFireworks,
} from "../../src/environment";
import {
  renderMinecraftGround,
  renderMinecraftLog,
  renderMinecraftLeaf,
  renderFlowerOnGrass,
  renderApple,
  renderGoldenAppleOnGrass,
  renderMinecraftBee,
  renderMinecraftBeehive,
  renderMinecraftSignpost,
  renderMinecraftFarmer,
  renderMinecraftWolf,
  renderMinecraftFox,
  renderMinecraftCat,
  renderMinecraftParrot,
  renderMinecraftCampfire,
  renderMinecraftChest,
  renderSeasonalJackOLantern,
  renderHalloweenGhosts,
  renderSeasonalHolidayGifts,
  renderSeasonalFairyLights,
} from "../../src/props";
import { updateMarkdownContent, updateMarkdownFile } from "../../src/markdown";
import { decodeGifInfo, GifInfo, GifFrameInfo } from "./decode";

// Re-export all core models and rendering functions
export {
  // Tree Engine
  buildTreeLayout,
  getCommitLevel,
  BLOCK_SIZE,
  BLOCK_PIXELS,
  PIXEL_SCALE,
  MAX_FLOWERS,
  MAX_APPLES,
  MAX_GOLDEN_APPLES,
  STANDARD_CANOPY_SLOTS,
  EXPANDED_CANOPY_SLOTS,
  CANOPY_SLOTS,
  // Types
  TreeLayout,
  TreeType,
  TreeGrowthMode,
  LeafBlockPos,
  FlowerPos,
  ApplePos,
  GoldenApplePos,
  OreBlockPos,
  OreType,
  PetType,
  PetPos,
  FarmerMood,
  FarmerPos,
  CampfirePos,
  ChestType,
  ChestPos,
  SeasonalEvent,
  HolidayGiftPos,
  JackOLanternPos,
  // SVG Engine
  renderFrame,
  generateSvg,
  // GIF Engine
  encodeGif,
  Frame,
  // GitHub & Weather
  fetchContributions,
  calculateStreak,
  ContributionDay,
  ContributionWeek,
  ContributionData,
  fetchLiveWeather,
  mapWmoCodeToWeatherType,
  WeatherCondition,
  WeatherType,
  // Environment & Props
  renderMinecraftSun,
  renderMinecraftMoon,
  renderMinecraftStars,
  renderBioluminescentParticles,
  renderMinecraftCloud,
  renderRainStreaks,
  renderSnowflakes,
  renderSakuraPetals,
  renderSeasonalFireworks,
  renderMinecraftGround,
  renderMinecraftLog,
  renderMinecraftLeaf,
  renderFlowerOnGrass,
  renderApple,
  renderGoldenAppleOnGrass,
  renderMinecraftBee,
  renderMinecraftBeehive,
  renderMinecraftSignpost,
  renderMinecraftFarmer,
  renderMinecraftWolf,
  renderMinecraftFox,
  renderMinecraftCat,
  renderMinecraftParrot,
  renderMinecraftCampfire,
  renderMinecraftChest,
  renderSeasonalJackOLantern,
  renderHalloweenGhosts,
  renderSeasonalHolidayGifts,
  renderSeasonalFairyLights,
  updateMarkdownContent,
  updateMarkdownFile,
  // GIF Decoding
  decodeGifInfo,
  GifInfo,
  GifFrameInfo,
};

export interface GenerateTreeOptions {
  /** GitHub username to fetch live contributions for (if weeks are not directly supplied) */
  username?: string;
  /** Personal Access Token or GitHub Actions Token for GraphQL API access */
  token?: string;
  /** Custom pre-computed contribution weeks array */
  weeks?: ContributionWeek[];
  /** Override total commit count */
  totalCommits?: number;
  /** Override open PRs count (flowers) */
  openPRs?: number;
  /** Override merged PRs count (red apples) */
  mergedPRs?: number;
  /** Override assigned/reviewed PRs count (golden apples) */
  assignedPRs?: number;
  /** Override current active streak in days */
  streak?: number;
  /** Tree biome / species */
  treeType?: TreeType;
  /** Explicit weather condition or weather string (e.g. 'rain', 'snow', 'night', 'sunny') */
  weather?: WeatherCondition | string;
  /** City name for automatic Open-Meteo live weather geocoding */
  city?: string;
  /** Growth mode: 'auto' (dynamic 14 to 21 leaves + +1 log height), 'standard', or 'expanded' */
  growth?: TreeGrowthMode;
  /** Show wooden stat signpost */
  showSignpost?: boolean;
  /** Show animated Minecraft bee and hive */
  showBee?: boolean;
  /** Companion pet: 'auto', 'wolf', 'fox', 'cat', 'parrot', or 'none' */
  pet?: "auto" | "wolf" | "fox" | "cat" | "parrot" | "none";
  /** Show farmer character */
  showFarmer?: boolean | "auto";
  /** Override farmer mood: 'auto', 'sad', 'watering', 'dancing' */
  farmerMood?: "auto" | "sad" | "dancing" | "watering";
  /** Show ambient campfire */
  showCampfire?: boolean | "auto";
  /** Show tier treasure chest */
  showChest?: boolean | "auto";
  /** Seasonal event: 'auto', 'halloween', 'holiday', 'fireworks', or 'none' */
  event?: "auto" | "halloween" | "holiday" | "fireworks" | "none";
  /** Simulation date for seasonal triggers */
  currentDate?: Date;
  /** User is repository owner */
  isOwner?: boolean;
  /** User is outside contributor */
  isContributor?: boolean;
  /** Canvas width in pixels (default: 920) */
  width?: number;
  /** Canvas height in pixels (default: 500) */
  height?: number;
  /** Number of looping animation frames (default: 20) */
  frames?: number;
  /** Delay per frame in milliseconds (default: 100) */
  frameDelayMs?: number;
}

export interface TreeInspectionSummary {
  width: number;
  height: number;
  groundY: number;
  treeType: TreeType;
  growthStage: "standard" | "expanded";
  trunkBlocksCount: number;
  leafBlocksCount: number;
  activeLeafBlocksCount: number;
  dormantLeafBlocksCount: number;
  flowersCount: number;
  applesCount: number;
  goldenApplesCount: number;
  ores: { x: number; y: number; type: OreType }[];
  streak: number;
  weather: WeatherCondition;
  seasonalEvent?: SeasonalEvent;
  hasPet: boolean;
  petType?: PetType;
  hasFarmer: boolean;
  farmerMood?: FarmerMood;
  hasBee: boolean;
  hasBeehive: boolean;
  hasCampfire: boolean;
  hasChest: boolean;
  chestType?: ChestType;
}

/**
 * Parses free-form weather string into a WeatherCondition object.
 */
export function parseWeatherString(input: string): WeatherCondition {
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
export async function resolveTreeContext(options: GenerateTreeOptions): Promise<{
  weeks: ContributionWeek[];
  totalCommits: number;
  openPRs: number;
  mergedPRs: number;
  assignedPRs: number;
  streak: number;
  weather: WeatherCondition;
}> {
  let weeks = options.weeks ? [...options.weeks] : [];
  let totalCommits = options.totalCommits ?? 0;
  let openPRs = options.openPRs ?? 0;
  let mergedPRs = options.mergedPRs ?? 0;
  let assignedPRs = options.assignedPRs ?? 0;
  let streak = options.streak ?? 0;

  if (options.username && (!options.weeks || options.weeks.length === 0)) {
    const token = options.token || process.env.GITHUB_TOKEN || process.env.GH_TOKEN || "";
    const data = await fetchContributions(token, options.username, 365, 14);
    weeks = data.weeks;
    totalCommits = options.totalCommits ?? data.totalCommits;
    openPRs = options.openPRs ?? data.totalOpenPRs;
    mergedPRs = options.mergedPRs ?? data.totalMergedPRs;
    assignedPRs = options.assignedPRs ?? data.totalAssignedPRs;
    streak = options.streak ?? data.currentStreak;
  }

  let weather: WeatherCondition = { type: "sunny", description: "Clear sky" };
  if (typeof options.weather === "string") {
    weather = parseWeatherString(options.weather);
  } else if (options.weather) {
    weather = options.weather;
  } else if (options.city) {
    weather = await fetchLiveWeather(options.city);
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
export async function createTreeLayout(options: GenerateTreeOptions): Promise<TreeLayout> {
  const ctx = await resolveTreeContext(options);
  return buildTreeLayout(ctx.weeks, ctx.totalCommits, {
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
export async function generateTreeFrames(options: GenerateTreeOptions): Promise<string[]> {
  const layout = await createTreeLayout(options);
  const totalFrames = Math.max(1, options.frames ?? 20);
  const frames: string[] = [];

  for (let i = 0; i < totalFrames; i++) {
    frames.push(renderFrame(layout, i, totalFrames));
  }

  return frames;
}

/**
 * Generates a single static SVG string (or specified frame index).
 */
export async function generateTreeSvg(
  options: GenerateTreeOptions,
  frameIndex: number = 0
): Promise<string> {
  const layout = await createTreeLayout(options);
  const totalFrames = Math.max(1, options.frames ?? 20);
  return renderFrame(layout, frameIndex % totalFrames, totalFrames);
}

/**
 * Generates a complete looping animated GIF buffer from input options.
 */
export async function generateTreeGif(options: GenerateTreeOptions): Promise<Uint8Array> {
  const width = options.width ?? 920;
  const height = options.height ?? 500;
  const delayMs = options.frameDelayMs ?? 100;
  const svgFrames = await generateTreeFrames(options);

  const frames: Frame[] = svgFrames.map((svg) => ({ svg }));
  return encodeGif(frames, width, height, delayMs);
}

/**
 * Inspects and extracts a structured analytical summary from a TreeLayout.
 */
export function inspectTreeLayout(layout: TreeLayout): TreeInspectionSummary {
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
export function extractTreeSummary(layout: TreeLayout): string {
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
