import { ContributionWeek, calculateStreak } from "./github";
import { WeatherCondition } from "./weather";

export const BLOCK_PIXELS = 16;
export const PIXEL_SCALE = 3.0;
export const BLOCK_SIZE = BLOCK_PIXELS * PIXEL_SCALE; // 48px
export const MAX_FLOWERS = 4;
export const MAX_APPLES = 4;
export const MAX_GOLDEN_APPLES = 4;

export type TreeType =
  | "oak"
  | "sakura"
  | "spruce"
  | "birch"
  | "jungle"
  | "dark_oak"
  | "acacia"
  | "mangrove"
  | "crimson"
  | "warped";

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
}

const CANOPY_SLOTS: { gridX: number; gridY: number }[] = [
  // Tier 0 (Bottom tier)
  { gridX: -2, gridY: 0 },
  { gridX: -1, gridY: 0 },
  { gridX: 0, gridY: 0 },
  { gridX: 1, gridY: 0 },
  { gridX: 2, gridY: 0 },
  // Tier -1 (Lower mid)
  { gridX: -2, gridY: -1 },
  { gridX: -1, gridY: -1 },
  { gridX: 0, gridY: -1 },
  { gridX: 1, gridY: -1 },
  { gridX: 2, gridY: -1 },
  // Tier -2 (Upper mid)
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
  totalCommitsArg?: number,
  opts: {
    width?: number;
    height?: number;
    weather?: WeatherCondition;
    treeType?: TreeType;
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
  } = {}
): TreeLayout {
  const width = opts.width ?? 460;
  const height = opts.height ?? 420;
  const weather = opts.weather ?? { type: "sunny", description: "Clear sky" };
  const treeType = opts.treeType ?? "oak";
  const bs = BLOCK_SIZE; // 48px

  let computedCommits = 0;
  let computedOpenPRs = 0;
  let computedMergedPRs = 0;
  let computedAssignedPRs = 0;

  for (const w of weeks) {
    computedCommits += w.total || 0;
    computedOpenPRs += w.openPRs || 0;
    computedMergedPRs += w.mergedPRs || 0;
    computedAssignedPRs += w.assignedPRs || 0;
  }

  const totalCommits = totalCommitsArg !== undefined ? totalCommitsArg : computedCommits;
  const totalOpenPRs = opts.openPRs !== undefined ? opts.openPRs : computedOpenPRs;
  const totalMergedPRs = opts.mergedPRs !== undefined ? opts.mergedPRs : computedMergedPRs;
  const totalAssignedPRs = opts.assignedPRs !== undefined ? opts.assignedPRs : computedAssignedPRs;
  const currentStreak = opts.streak !== undefined ? opts.streak : calculateStreak(weeks);

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

  // 3. Red Apples 🍎 for Merged PRs: Hanging under canopy leaves (Max 4)
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

  // 5. Underground Ore Blocks 💎 (Embedded in dirt layer: 6 slots across width 460)
  const oreBlocks: OreBlockPos[] = [];
  
  if (opts.isOwner === true) {
    oreBlocks.push({ x: 20, y: groundY + 24, type: "netherite" });
  }
  if (currentStreak >= 7 || totalCommits >= 50) {
    oreBlocks.push({ x: 76, y: groundY + 24, type: "gold" });
  }
  if (totalCommits >= 25 || totalMergedPRs >= 1) {
    oreBlocks.push({ x: 132, y: groundY + 24, type: "diamond" });
  }
  if (totalCommits >= 100 || leafBlocks.some((b) => b.commitLevel === 4)) {
    oreBlocks.push({ x: 280, y: groundY + 24, type: "emerald" });
  }
  if (opts.isContributor === true) {
    oreBlocks.push({ x: 336, y: groundY + 24, type: "lapis" });
  }
  if (totalMergedPRs >= 2 || (totalOpenPRs + totalMergedPRs + totalAssignedPRs) >= 3 || currentStreak >= 14) {
    oreBlocks.push({ x: 392, y: groundY + 24, type: "redstone" });
  }

  // 6. Wooden Stat Signpost 🪧 (Placed at x: 62 with comfortable spacing)
  const signpost: SignpostPos | undefined =
    opts.showSignpost !== false ? { x: 62, y: groundY - 22, streak: currentStreak } : undefined;

  // 7. Minecraft Beehive 🍯 & Bee 🐝
  let beehive: BeehivePos | undefined;
  if (currentStreak >= 3 || totalCommits >= 25) {
    beehive = { x: trunkX + bs - 2, y: trunkStartY + bs + 28, side: "right" };
  }

  let bee: BeePos | undefined;
  if (opts.showBee !== false && (currentStreak >= 1 || totalCommits > 0)) {
    bee = { x: trunkX - 44, y: canopyBottomY + 28 };
  }

  // 8. Minecraft Companion Pet 🐾 (Wolf 🐺, Fox 🦊, Cat 🐱, Parrot 🦜 on Left Side)
  let pet: PetPos | undefined;
  const rawPetOpt = opts.pet ?? "auto";
  const isNight = weather.type === "night" || weather.isDay === false;

  if (rawPetOpt !== "none") {
    let chosenType: PetType | undefined;
    if (rawPetOpt === "wolf" || rawPetOpt === "fox" || rawPetOpt === "cat" || rawPetOpt === "parrot") {
      chosenType = rawPetOpt;
    } else if (rawPetOpt === "auto") {
      if (treeType === "jungle") {
        chosenType = "parrot";
      } else if (currentStreak >= 14) {
        chosenType = "wolf";
      } else if (currentStreak >= 7) {
        chosenType = "fox";
      } else if (currentStreak >= 3 || totalCommits >= 25) {
        chosenType = "cat";
      } else if (totalCommits > 0) {
        chosenType = "fox";
      }
    }

    if (chosenType) {
      const petState =
        chosenType === "fox"
          ? isNight
            ? "standing"
            : "sleeping"
          : "sitting";
      pet = {
        x: 176, // Sits comfortably in Slot L3 next to trunk
        y: groundY - (chosenType === "fox" && petState === "sleeping" ? 12 : chosenType === "parrot" ? 16 : 18),
        type: chosenType,
        state: petState,
      };
    }
  }

  // 9. Minecraft Farmer Under Tree 👨‍🌾 (Default on right side of trunk)
  let farmer: FarmerPos | undefined;
  const recent2WeeksCommits = recentWeeks.slice(-2).reduce((acc, w) => acc + (w ? w.total : 0), 0);
  const showFarmerOpt = opts.showFarmer ?? true;

  if (showFarmerOpt !== false) {
    let mood: FarmerMood = "watering";
    const rawMoodOpt = opts.farmerMood ?? "auto";

    if (rawMoodOpt === "sad" || rawMoodOpt === "dancing" || rawMoodOpt === "watering") {
      mood = rawMoodOpt;
    } else {
      // Auto mood based on tree health and commits:
      // If tree is dry / dormant (0 commits or all dormant leaves) -> sad
      // If tree is flourishing / cherish (>= 30 commits, streak >= 7, or active sprint >= 10) -> dancing
      // If tree is neutral / steady growth -> watering
      const isDry = totalCommits === 0 || leafBlocks.every((l) => l.commitLevel === 0);
      const isFlourishing = totalCommits >= 30 || currentStreak >= 7 || recent2WeeksCommits >= 10;

      if (isDry) {
        mood = "sad";
      } else if (isFlourishing) {
        mood = "dancing";
      } else {
        mood = "watering";
      }
    }

    farmer = {
      x: 266, // Stands on right side of trunk (trunk is 206..254)
      y: groundY - 24, // Feet resting flush on grass surface (370)
      mood,
    };
  }

  // 10. Milestone Treasure Chest 📦
  let chest: ChestPos | undefined;
  const showChestOpt = opts.showChest ?? "auto";
  if (showChestOpt !== false) {
    let chestType: ChestType | undefined;
    if (totalCommits >= 500) {
      chestType = "ender";
    } else if (totalCommits >= 300) {
      chestType = "diamond";
    } else if (totalCommits >= 150) {
      chestType = "gold";
    } else if (totalCommits >= 50) {
      chestType = "iron";
    } else if (totalCommits >= 15 || showChestOpt === true) {
      chestType = "wood";
    }

    if (chestType) {
      const chestX = farmer ? 308 : 274;
      chest = { x: chestX, y: groundY - 16, type: chestType };
    }
  }

  // 11. Roasting Campfire 🔥 (Active sprint mode)
  let campfire: CampfirePos | undefined;
  const showCampfireOpt = opts.showCampfire ?? "auto";
  const shouldShowCampfire =
    showCampfireOpt === true ||
    (showCampfireOpt === "auto" && (recent2WeeksCommits >= 12 || currentStreak >= 10 || totalCommits >= 60));

  if (shouldShowCampfire) {
    const campfireX = farmer && chest ? 356 : farmer || chest ? 346 : 310;
    campfire = { x: campfireX, y: groundY - 16 };
  }

  // 12. Seasonal Holiday / Event Modes 🎃🎄🎆
  const curDate = opts.currentDate ?? new Date();
  const curMonth = curDate.getMonth(); // 0 = Jan, 9 = Oct, 11 = Dec
  const eventOpt = opts.event ?? "auto";

  let seasonalEvent: SeasonalEvent = "none";
  if (eventOpt === "halloween" || eventOpt === "holiday" || eventOpt === "fireworks" || eventOpt === "none") {
    seasonalEvent = eventOpt;
  } else if (eventOpt === "auto") {
    if (curMonth === 9) {
      seasonalEvent = "halloween";
    } else if (curMonth === 11) {
      seasonalEvent = "holiday";
    } else if (curMonth === 0) {
      seasonalEvent = "fireworks";
    }
  }

  let jackOLantern: JackOLanternPos | undefined;
  let holidayGifts: HolidayGiftPos[] | undefined;

  if (seasonalEvent === "halloween") {
    jackOLantern = { x: campfire ? 112 : 382, y: groundY - 16 };
  } else if (seasonalEvent === "holiday") {
    const giftBaseX = chest ? 336 : farmer ? 308 : 274;
    holidayGifts = [
      { x: giftBaseX, y: groundY - 12, size: 12, boxColor: "#d32f2f", ribbonColor: "#388e3c" },
      { x: giftBaseX + 13, y: groundY - 10, size: 10, boxColor: "#fbc02d", ribbonColor: "#d32f2f" },
    ];
  }

  // 13. Dynamic Non-Overlapping Flower Placement 🌸
  const occupiedRanges: [number, number][] = [];
  if (signpost) occupiedRanges.push([38, 104]); // Protects signpost area and ensures only one clean far-left slot at x: 18
  if (jackOLantern) occupiedRanges.push([jackOLantern.x - 14, jackOLantern.x + 20]);
  if (pet) occupiedRanges.push([pet.x - 14, pet.x + 20]);
  if (farmer) occupiedRanges.push([farmer.x - 14, farmer.x + 20]);
  if (chest) occupiedRanges.push([chest.x - 14, chest.x + 20]);
  if (holidayGifts) {
    for (const g of holidayGifts) {
      occupiedRanges.push([g.x - 8, g.x + g.size + 8]);
    }
  }
  if (campfire) occupiedRanges.push([campfire.x - 14, campfire.x + 22]);

  const isSlotAvailable = (x: number): boolean => {
    return !occupiedRanges.some(([minX, maxX]) => x >= minX && x <= maxX);
  };

  const flowerLeftCandidates = [116, 146, 18, 176];
  const flowerRightCandidates = [344, 376, 408, 438, 312, 276];

  const flowers: FlowerPos[] = [];
  const flowerTypes: ("poppy" | "dandelion" | "tulip" | "sakura")[] =
    treeType === "sakura"
      ? ["sakura", "poppy", "dandelion", "tulip"]
      : ["poppy", "dandelion", "tulip", "poppy"];

  const flowerCount = Math.min(4, totalOpenPRs);
  for (let i = 0; i < flowerCount; i++) {
    const isLeft = i % 2 === 0;
    const targetCandidates = isLeft ? flowerLeftCandidates : flowerRightCandidates;
    const fallbackCandidates = isLeft ? flowerRightCandidates : flowerLeftCandidates;

    let slotX = targetCandidates.find(isSlotAvailable);
    if (slotX === undefined) {
      slotX = fallbackCandidates.find(isSlotAvailable);
    }

    if (slotX !== undefined) {
      occupiedRanges.push([slotX - 14, slotX + 16]);
      flowers.push({
        x: slotX,
        y: groundY - 21,
        width: 18,
        height: 24,
        type: flowerTypes[i % flowerTypes.length],
        side: slotX < trunkX ? "left" : "right",
      });
    }
  }

  // 14. Golden Apples on Grass Lawn (Assigned PRs / Reviews) 🍏✨
  const goldenAppleLeftCandidates = [18, 146, 116, 176];
  const goldenAppleRightCandidates = [408, 438, 344, 376, 312, 276];

  const goldenApples: GoldenApplePos[] = [];
  const goldenAppleCount = Math.min(4, totalAssignedPRs);

  for (let i = 0; i < goldenAppleCount; i++) {
    const isLeft = i % 2 === 0;
    const targetCandidates = isLeft ? goldenAppleLeftCandidates : goldenAppleRightCandidates;
    const fallbackCandidates = isLeft ? goldenAppleRightCandidates : goldenAppleLeftCandidates;

    let slotX = targetCandidates.find(isSlotAvailable);
    if (slotX === undefined) {
      slotX = fallbackCandidates.find(isSlotAvailable);
    }

    if (slotX !== undefined) {
      occupiedRanges.push([slotX - 14, slotX + 16]);
      goldenApples.push({
        x: slotX,
        y: groundY - 18,
        size: 18,
        side: slotX < trunkX ? "left" : "right",
      });
    }
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
    pet,
    farmer,
    campfire,
    chest,
    seasonalEvent,
    holidayGifts,
    jackOLantern,
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

export type TreeOptions = {
  width?: number;
  height?: number;
  weather?: WeatherCondition;
  treeType?: TreeType;
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

export function calculateTree(
  contributions: {
    weeks: ContributionWeek[];
    totalCommits?: number;
    currentStreak?: number;
    totalOpenPRs?: number;
    totalMergedPRs?: number;
    totalAssignedPRs?: number;
  },
  opts: TreeOptions = {}
): TreeLayout {
  return buildTreeLayout(contributions.weeks, contributions.totalCommits, {
    streak: contributions.currentStreak,
    openPRs: contributions.totalOpenPRs,
    mergedPRs: contributions.totalMergedPRs,
    assignedPRs: contributions.totalAssignedPRs,
    ...opts,
  });
}
