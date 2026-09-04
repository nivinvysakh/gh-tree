import { ContributionWeek, calculateStreak } from "./github";
import { WeatherCondition } from "./weather";

export const BLOCK_PIXELS = 16;
export const PIXEL_SCALE = 3.0;
export const BLOCK_SIZE = BLOCK_PIXELS * PIXEL_SCALE; // 48px
export const MAX_FLOWERS = 4;
export const MAX_APPLES = 4;
export const MAX_GOLDEN_APPLES = 4;

export type TreeType = "oak" | "sakura" | "spruce" | "birch";

export interface LeafBlockPos {
  gridX: number; // relative to trunk (-2, -1, 0, 1, 2)
  gridY: number; // -3 (top peak), -2, -1, 0 (bottom tier)
  x: number;
  y: number;
  size: number;
  commitCount: number;
  commitLevel: number; // 0 (dry/dormant), 1 (light), 2 (medium), 3 (lush), 4 (max emerald)
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

export interface TreeLayout {
  width: number;
  height: number;
  groundY: number;
  trunkX: number;
  treeType: TreeType;
  trunkBlocks: { x: number; y: number; size: number }[];
  leafBlocks: LeafBlockPos[];
  flowers: FlowerPos[];
  apples: ApplePos[];
  goldenApples: GoldenApplePos[];
  oreBlocks: OreBlockPos[];
  bee?: BeePos;
  beehive?: BeehivePos;
  signpost?: SignpostPos;
  totalCommits: number;
  openPRs: number;
  mergedPRs: number;
  assignedPRs: number;
  currentStreak: number;
  weather: WeatherCondition;
  isOwner?: boolean;
  isContributor?: boolean;
}

const CANOPY_SLOTS: { gridX: number; gridY: number }[] = [
  // Tier 0 (Bottom tier)
  { gridX: -2, gridY: 0 },
  { gridX: -1, gridY: 0 },
  { gridX: 0, gridY: 0 },
  { gridX: 1, gridY: 0 },
  { gridX: 2, gridY: 0 },
  // Tier -1 (Middle tier)
  { gridX: -2, gridY: -1 },
  { gridX: -1, gridY: -1 },
  { gridX: 0, gridY: -1 },
  { gridX: 1, gridY: -1 },
  { gridX: 2, gridY: -1 },
  // Tier -2 (Upper tier)
  { gridX: -1, gridY: -2 },
  { gridX: 0, gridY: -2 },
  { gridX: 1, gridY: -2 },
  // Tier -3 (Top peak)
  { gridX: 0, gridY: -3 },
];

/**
 * Maps commit counts to GitHub contribution intensity level (0 to 4)
 */
export function getCommitLevel(commits: number): number {
  if (commits <= 0) return 0;
  if (commits <= 4) return 1;
  if (commits <= 14) return 2;
  if (commits <= 29) return 3;
  return 4;
}

export function buildTreeLayout(
  weeks: ContributionWeek[],
  _todayLabel?: string,
  opts: {
    width?: number;
    height?: number;
    weather?: WeatherCondition;
    treeType?: TreeType;
    showSignpost?: boolean;
    showBee?: boolean;
    isOwner?: boolean;
    isContributor?: boolean;
  } = {}
): TreeLayout {
  const width = opts.width ?? 460;
  const height = opts.height ?? 420;
  const weather = opts.weather ?? { type: "sunny", description: "Clear sky" };
  const treeType = opts.treeType ?? "oak";
  const bs = BLOCK_SIZE; // 48px

  let totalCommits = 0;
  let totalOpenPRs = 0;
  let totalMergedPRs = 0;
  let totalAssignedPRs = 0;

  for (const w of weeks) {
    totalCommits += w.total || 0;
    totalOpenPRs += w.openPRs || 0;
    totalMergedPRs += w.mergedPRs || 0;
    totalAssignedPRs += w.assignedPRs || 0;
  }

  const currentStreak = calculateStreak(weeks);

  const groundY = height - 50; // 370px
  const trunkX = Math.floor((width - bs) / 2); // 206px
  const trunkHeightBlocks = 3; // 3 log blocks high (144px)

  const canopyBottomY = groundY - trunkHeightBlocks * bs; // 226px
  const trunkStartY = canopyBottomY;

  // 1. Oak Trunk (3 stacked log blocks directly on grass)
  const trunkBlocks: { x: number; y: number; size: number }[] = [];
  for (let i = 0; i < trunkHeightBlocks; i++) {
    trunkBlocks.push({
      x: trunkX,
      y: trunkStartY + i * bs,
      size: bs,
    });
  }

  // 2. Canopy Leaf Blocks (14 blocks with commit-driven green levels)
  const recentWeeks = weeks.slice(-14);
  const avgCommits = totalCommits / Math.max(1, weeks.length);
  
  // Baseline greenness level derived from overall developer activity
  const baselineLevel =
    totalCommits >= 300 ? 3 : totalCommits >= 100 ? 2 : totalCommits >= 25 ? 1 : 0;

  const leafBlocks: LeafBlockPos[] = CANOPY_SLOTS.map((slot, idx) => {
    const x = trunkX + slot.gridX * bs;
    const y = canopyBottomY + slot.gridY * bs;

    const week = recentWeeks[idx];
    const rawCommitCount = week ? week.total : Math.round(avgCommits);
    const directLevel = getCommitLevel(rawCommitCount);

    // If developer is highly active, blend weekly spikes with active baseline
    const commitLevel = Math.min(4, Math.max(baselineLevel, directLevel));

    return {
      gridX: slot.gridX,
      gridY: slot.gridY,
      x,
      y,
      size: bs,
      commitCount: rawCommitCount,
      commitLevel,
      weekIndex: idx,
    };
  });

  // 3. Flowers 🌸 for Open PRs: Planted on Grass Ground (Max 4: up to 2 left, 2 right)
  const flowers: FlowerPos[] = [];
  if (totalOpenPRs > 0) {
    const flowerTypes: ("poppy" | "dandelion" | "tulip" | "sakura")[] = [
      "poppy",
      "dandelion",
      "tulip",
      "sakura",
    ];

    // Perfectly spaced lawn positions preventing collision with signpost, apples, and trunk
    const flowerSlots: { x: number; side: "left" | "right" }[] = [
      { x: 120, side: "left" },
      { x: 160, side: "left" },
      { x: 280, side: "right" },
      { x: 330, side: "right" },
    ];

    const flowerWidth = 18;
    const flowerHeight = 24;
    const count = Math.min(totalOpenPRs, MAX_FLOWERS);

    for (let f = 0; f < count; f++) {
      const slot = flowerSlots[f];
      flowers.push({
        x: slot.x,
        y: groundY - flowerHeight + 3,
        width: flowerWidth,
        height: flowerHeight,
        type: flowerTypes[f % flowerTypes.length],
        side: slot.side,
      });
    }
  }

  // 4. Red Apples 🍎 for Merged PRs: Hanging under canopy leaves (Max 4)
  const apples: ApplePos[] = [];
  if (totalMergedPRs > 0) {
    const appleSlots = [
      { gridX: -1, offsetX: 10 },
      { gridX: 1, offsetX: 20 },
      { gridX: -2, offsetX: 14 },
      { gridX: 2, offsetX: 14 },
    ];

    const count = Math.min(totalMergedPRs, MAX_APPLES);
    for (let a = 0; a < count; a++) {
      const slot = appleSlots[a];
      const targetBlock =
        leafBlocks.find((b) => b.gridY === 0 && b.gridX === slot.gridX) || leafBlocks[0];
      apples.push({
        x: targetBlock.x + slot.offsetX,
        y: targetBlock.y + bs - 2,
        size: 20,
        gridX: slot.gridX,
      });
    }
  }

  // 5. Golden Apples 🍏✨ for PR Reviews & Assigned PRs: Separate individual items on grass (Max 4)
  const goldenApples: GoldenApplePos[] = [];
  if (totalAssignedPRs > 0) {
    const goldenAppleSize = 20;

    const separateSlots: { x: number; side: "left" | "right" }[] = [
      { x: 14, side: "left" },   // Far Left 1
      { x: 38, side: "left" },   // Far Left 2
      { x: 402, side: "right" }, // Far Right 2
      { x: 426, side: "right" }, // Far Right 1
    ];

    const count = Math.min(totalAssignedPRs, MAX_GOLDEN_APPLES);
    for (let g = 0; g < count; g++) {
      const slot = separateSlots[g];
      goldenApples.push({
        x: slot.x,
        y: groundY - goldenAppleSize + 2, // All sitting directly on grass
        size: goldenAppleSize,
        side: slot.side,
      });
    }
  }

  // 6. Ore Blocks 💎 (Embedded in underground dirt layer: 6 slots across width 460)
  const oreBlocks: OreBlockPos[] = [];
  
  // [Slot 0 - x:20] Netherite Ore 🪨 (Special Repo Owner Ore)
  if (opts.isOwner === true) {
    oreBlocks.push({ x: 20, y: groundY + 16, type: "netherite" });
  }

  // [Slot 1 - x:76] Gold Ore 🪙 (Streak Dedication: streak >= 7 or totalCommits >= 50)
  if (currentStreak >= 7 || totalCommits >= 50) {
    oreBlocks.push({ x: 76, y: groundY + 16, type: "gold" });
  }

  // [Slot 2 - x:132] Diamond Ore 💎 (Active Contributor: totalCommits >= 25 or mergedPRs >= 1)
  if (totalCommits >= 25 || totalMergedPRs >= 1) {
    oreBlocks.push({ x: 132, y: groundY + 16, type: "diamond" });
  }

  // [Slot 3 - x:280] Emerald Ore ❇️ (Power Contributor: totalCommits >= 100 or level 4 leaves)
  if (totalCommits >= 100 || leafBlocks.some((b) => b.commitLevel === 4)) {
    oreBlocks.push({ x: 280, y: groundY + 16, type: "emerald" });
  }

  // [Slot 4 - x:336] Lapis Lazuli Ore 🔷 (Special gh-tree Action Contributor Ore)
  if (opts.isContributor === true) {
    oreBlocks.push({ x: 336, y: groundY + 16, type: "lapis" });
  }

  // [Slot 5 - x:392] Redstone Ore 🔴 (Engineering & Automation: mergedPRs >= 2 or total PRs >= 3 or streak >= 14)
  if (totalMergedPRs >= 2 || (totalOpenPRs + totalMergedPRs + totalAssignedPRs) >= 3 || currentStreak >= 14) {
    oreBlocks.push({ x: 392, y: groundY + 16, type: "redstone" });
  }

  // 7. Wooden Stat Signpost 🪧 (Placed at x: 68 with comfortable spacing)
  const signpost: SignpostPos | undefined =
    opts.showSignpost !== false ? { x: 68, y: groundY - 22, streak: currentStreak } : undefined;

  // 8. Minecraft Beehive 🍯 & Bee 🐝 (Positioned on the trunk lower down with zero apple overlap)
  let beehive: BeehivePos | undefined;
  if (currentStreak >= 3 || totalCommits >= 25) {
    beehive = { x: trunkX + bs - 2, y: trunkStartY + bs + 28, side: "right" };
  }

  let bee: BeePos | undefined;
  if (opts.showBee !== false && (currentStreak >= 1 || totalCommits > 0)) {
    bee = { x: trunkX - 44, y: canopyBottomY + 28 };
  }

  return {
    width,
    height,
    groundY,
    trunkX,
    treeType,
    trunkBlocks,
    leafBlocks,
    flowers,
    apples,
    goldenApples,
    oreBlocks,
    bee,
    beehive,
    signpost,
    totalCommits,
    openPRs: totalOpenPRs,
    mergedPRs: totalMergedPRs,
    assignedPRs: totalAssignedPRs,
    currentStreak,
    weather,
    isOwner: opts.isOwner,
    isContributor: opts.isContributor,
  };
}
