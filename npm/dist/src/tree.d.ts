import { ContributionWeek } from "./github";
import { WeatherCondition } from "./weather";
export declare const BLOCK_PIXELS = 16;
export declare const PIXEL_SCALE = 3;
export declare const BLOCK_SIZE: number;
export declare const MAX_FLOWERS = 4;
export declare const MAX_APPLES = 4;
export declare const MAX_GOLDEN_APPLES = 4;
export type TreeType = "oak" | "sakura" | "spruce" | "birch" | "jungle" | "dark_oak" | "acacia" | "mangrove" | "crimson" | "warped";
export interface LeafBlockPos {
    gridX: number;
    gridY: number;
    x: number;
    y: number;
    size: number;
    commitCount: number;
    commitLevel: number;
    weekIndex: number;
}
export interface FlowerPos {
    x: number;
    y: number;
    width: number;
    height: number;
    type: "poppy" | "dandelion" | "tulip" | "sakura";
    side: "left" | "right";
}
export interface ApplePos {
    x: number;
    y: number;
    size: number;
    gridX: number;
}
export interface GoldenApplePos {
    x: number;
    y: number;
    size: number;
    side: "left" | "right";
}
export type OreType = "diamond" | "emerald" | "gold" | "redstone" | "lapis" | "netherite";
export interface OreBlockPos {
    x: number;
    y: number;
    type: OreType;
}
export type PetType = "wolf" | "fox" | "cat" | "parrot";
export interface PetPos {
    x: number;
    y: number;
    type: PetType;
    state: "sitting" | "sleeping" | "standing";
}
export type FarmerMood = "sad" | "dancing" | "watering";
export interface FarmerPos {
    x: number;
    y: number;
    mood: FarmerMood;
}
export interface CampfirePos {
    x: number;
    y: number;
}
export type ChestType = "wood" | "iron" | "gold" | "diamond" | "ender";
export interface ChestPos {
    x: number;
    y: number;
    type: ChestType;
}
export type SeasonalEvent = "halloween" | "holiday" | "fireworks" | "none";
export interface HolidayGiftPos {
    x: number;
    y: number;
    size: number;
    boxColor: string;
    ribbonColor: string;
}
export interface JackOLanternPos {
    x: number;
    y: number;
}
export interface BeePos {
    x: number;
    y: number;
}
export interface BeehivePos {
    x: number;
    y: number;
    side: "left" | "right";
}
export interface SignpostPos {
    x: number;
    y: number;
    streak: number;
}
export type TreeGrowthMode = "auto" | "standard" | "expanded";
export interface TreeLayout {
    width: number;
    height: number;
    groundY: number;
    trunkX: number;
    treeType: TreeType;
    trunkBlocks: {
        x: number;
        y: number;
        size: number;
    }[];
    leafBlocks: LeafBlockPos[];
    flowers: FlowerPos[];
    apples: ApplePos[];
    goldenApples: GoldenApplePos[];
    oreBlocks: OreBlockPos[];
    bee?: BeePos;
    beehive?: BeehivePos;
    signpost?: SignpostPos;
    pet?: PetPos;
    farmer?: FarmerPos;
    campfire?: CampfirePos;
    chest?: ChestPos;
    seasonalEvent?: SeasonalEvent;
    holidayGifts?: HolidayGiftPos[];
    jackOLantern?: JackOLanternPos;
    totalCommits: number;
    openPRs: number;
    mergedPRs: number;
    assignedPRs: number;
    currentStreak: number;
    weather: WeatherCondition;
    isOwner?: boolean;
    isContributor?: boolean;
    growthStage?: "standard" | "expanded";
    isExpanded?: boolean;
}
export declare const STANDARD_CANOPY_SLOTS: {
    gridX: number;
    gridY: number;
}[];
export declare const EXPANDED_CANOPY_SLOTS: {
    gridX: number;
    gridY: number;
}[];
export declare const CANOPY_SLOTS: {
    gridX: number;
    gridY: number;
}[];
/**
 * Maps commit counts to GitHub contribution intensity level (0 to 4)
 */
export declare function getCommitLevel(commits: number): number;
export declare function buildTreeLayout(weeks: ContributionWeek[], totalCommitsArg?: number, opts?: {
    width?: number;
    height?: number;
    weather?: WeatherCondition;
    treeType?: TreeType;
    growth?: TreeGrowthMode;
    showSignpost?: boolean;
    showBee?: boolean;
    isOwner?: boolean;
    isContributor?: boolean;
    pet?: "auto" | "wolf" | "fox" | "cat" | "parrot" | "none";
    showFarmer?: boolean | "auto";
    farmerMood?: "auto" | "sad" | "dancing" | "watering";
    showCampfire?: boolean | "auto";
    showChest?: boolean | "auto";
    event?: "auto" | "halloween" | "holiday" | "fireworks" | "none";
    currentDate?: Date;
    streak?: number;
    openPRs?: number;
    mergedPRs?: number;
    assignedPRs?: number;
}): TreeLayout;
export type TreeOptions = {
    width?: number;
    height?: number;
    weather?: WeatherCondition;
    treeType?: TreeType;
    growth?: TreeGrowthMode;
    showSignpost?: boolean;
    showBee?: boolean;
    isOwner?: boolean;
    isContributor?: boolean;
    pet?: "auto" | "wolf" | "fox" | "cat" | "parrot" | "none";
    showFarmer?: boolean | "auto";
    farmerMood?: "auto" | "sad" | "dancing" | "watering";
    showCampfire?: boolean | "auto";
    showChest?: boolean | "auto";
    event?: "auto" | "halloween" | "holiday" | "fireworks" | "none";
    currentDate?: Date;
    streak?: number;
    openPRs?: number;
    mergedPRs?: number;
    assignedPRs?: number;
};
export declare function calculateTree(contributions: {
    weeks: ContributionWeek[];
    totalCommits?: number;
    currentStreak?: number;
    totalOpenPRs?: number;
    totalMergedPRs?: number;
    totalAssignedPRs?: number;
}, opts?: TreeOptions): TreeLayout;
//# sourceMappingURL=tree.d.ts.map