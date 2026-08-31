import { ContributionWeek } from "./github";

export const BLOCK_PIXELS = 16;
export const PIXEL_SCALE = 3.0;
export const BLOCK_SIZE = BLOCK_PIXELS * PIXEL_SCALE; // 48px
export const MAX_FLOWERS = 4;
export const MAX_APPLES = 4;
export const MAX_GOLDEN_APPLES = 4;

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

export interface TreeLayout {
  width: number;
  height: number;
  groundY: number;
  trunkX: number;
  trunkBlocks: { x: number; y: number; size: number }[];
  leafBlocks: LeafBlockPos[];
  flowers: FlowerPos[];
  apples: ApplePos[];
  goldenApples: GoldenApplePos[];
  totalCommits: number;
  openPRs: number;
  mergedPRs: number;
  assignedPRs: number;
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
  } = {}
): TreeLayout {
  const width = opts.width ?? 460;
  const height = opts.height ?? 420;
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

    // Positioned in the middle lawn between trunk and far-edge golden apples
    const flowerSlots: { x: number; side: "left" | "right" }[] = [
      { x: 156, side: "left" },
      { x: 286, side: "right" },
      { x: 104, side: "left" },
      { x: 338, side: "right" },
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
      { gridX: -1, offsetX: 14 },
      { gridX: 1, offsetX: 14 },
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
      { x: 20, side: "left" },   // Far Left Outer
      { x: 420, side: "right" }, // Far Right Outer
      { x: 48, side: "left" },   // Far Left Inner
      { x: 392, side: "right" }, // Far Right Inner
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

  return {
    width,
    height,
    groundY,
    trunkX,
    trunkBlocks,
    leafBlocks,
    flowers,
    apples,
    goldenApples,
    totalCommits,
    openPRs: totalOpenPRs,
    mergedPRs: totalMergedPRs,
    assignedPRs: totalAssignedPRs,
  };
}
