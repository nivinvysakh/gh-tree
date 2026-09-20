import { buildTreeLayout, TreeLayout, TreeType, TreeGrowthMode, BLOCK_SIZE, BLOCK_PIXELS, PIXEL_SCALE, MAX_FLOWERS, MAX_APPLES, MAX_GOLDEN_APPLES, STANDARD_CANOPY_SLOTS, EXPANDED_CANOPY_SLOTS, CANOPY_SLOTS, getCommitLevel, LeafBlockPos, FlowerPos, ApplePos, GoldenApplePos, OreBlockPos, OreType, PetType, PetPos, FarmerMood, FarmerPos, CampfirePos, ChestType, ChestPos, SeasonalEvent, HolidayGiftPos, JackOLanternPos } from "../../src/tree";
import { renderFrame, generateSvg } from "../../src/svg";
import { encodeGif, Frame } from "../../src/gif";
import { fetchContributions, calculateStreak, ContributionDay, ContributionWeek, ContributionData } from "../../src/github";
import { fetchLiveWeather, mapWmoCodeToWeatherType, WeatherCondition, WeatherType } from "../../src/weather";
import { renderMinecraftSun, renderMinecraftMoon, renderMinecraftStars, renderBioluminescentParticles, renderMinecraftCloud, renderRainStreaks, renderSnowflakes, renderSakuraPetals, renderSeasonalFireworks } from "../../src/environment";
import { renderMinecraftGround, renderMinecraftLog, renderMinecraftLeaf, renderFlowerOnGrass, renderApple, renderGoldenAppleOnGrass, renderMinecraftBee, renderMinecraftBeehive, renderMinecraftSignpost, renderMinecraftFarmer, renderMinecraftWolf, renderMinecraftFox, renderMinecraftCat, renderMinecraftParrot, renderMinecraftCampfire, renderMinecraftChest, renderSeasonalJackOLantern, renderHalloweenGhosts, renderSeasonalHolidayGifts, renderSeasonalFairyLights } from "../../src/props";
import { updateMarkdownContent, updateMarkdownFile } from "../../src/markdown";
import { decodeGifInfo, GifInfo, GifFrameInfo } from "./decode";
export { buildTreeLayout, getCommitLevel, BLOCK_SIZE, BLOCK_PIXELS, PIXEL_SCALE, MAX_FLOWERS, MAX_APPLES, MAX_GOLDEN_APPLES, STANDARD_CANOPY_SLOTS, EXPANDED_CANOPY_SLOTS, CANOPY_SLOTS, TreeLayout, TreeType, TreeGrowthMode, LeafBlockPos, FlowerPos, ApplePos, GoldenApplePos, OreBlockPos, OreType, PetType, PetPos, FarmerMood, FarmerPos, CampfirePos, ChestType, ChestPos, SeasonalEvent, HolidayGiftPos, JackOLanternPos, renderFrame, generateSvg, encodeGif, Frame, fetchContributions, calculateStreak, ContributionDay, ContributionWeek, ContributionData, fetchLiveWeather, mapWmoCodeToWeatherType, WeatherCondition, WeatherType, renderMinecraftSun, renderMinecraftMoon, renderMinecraftStars, renderBioluminescentParticles, renderMinecraftCloud, renderRainStreaks, renderSnowflakes, renderSakuraPetals, renderSeasonalFireworks, renderMinecraftGround, renderMinecraftLog, renderMinecraftLeaf, renderFlowerOnGrass, renderApple, renderGoldenAppleOnGrass, renderMinecraftBee, renderMinecraftBeehive, renderMinecraftSignpost, renderMinecraftFarmer, renderMinecraftWolf, renderMinecraftFox, renderMinecraftCat, renderMinecraftParrot, renderMinecraftCampfire, renderMinecraftChest, renderSeasonalJackOLantern, renderHalloweenGhosts, renderSeasonalHolidayGifts, renderSeasonalFairyLights, updateMarkdownContent, updateMarkdownFile, decodeGifInfo, GifInfo, GifFrameInfo, };
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
    ores: {
        x: number;
        y: number;
        type: OreType;
    }[];
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
export declare function parseWeatherString(input: string): WeatherCondition;
/**
 * Resolves full contribution data and weather condition from options.
 */
export declare function resolveTreeContext(options: GenerateTreeOptions): Promise<{
    weeks: ContributionWeek[];
    totalCommits: number;
    openPRs: number;
    mergedPRs: number;
    assignedPRs: number;
    streak: number;
    weather: WeatherCondition;
}>;
/**
 * Builds the complete TreeLayout from options.
 */
export declare function createTreeLayout(options: GenerateTreeOptions): Promise<TreeLayout>;
/**
 * Generates an array of animated SVG frame strings.
 */
export declare function generateTreeFrames(options: GenerateTreeOptions): Promise<string[]>;
/**
 * Generates a single static SVG string (or specified frame index).
 */
export declare function generateTreeSvg(options: GenerateTreeOptions, frameIndex?: number): Promise<string>;
/**
 * Generates a complete looping animated GIF buffer from input options.
 */
export declare function generateTreeGif(options: GenerateTreeOptions): Promise<Uint8Array>;
/**
 * Inspects and extracts a structured analytical summary from a TreeLayout.
 */
export declare function inspectTreeLayout(layout: TreeLayout): TreeInspectionSummary;
/**
 * Converts a TreeLayout into a human-readable text summary.
 */
export declare function extractTreeSummary(layout: TreeLayout): string;
//# sourceMappingURL=index.d.ts.map