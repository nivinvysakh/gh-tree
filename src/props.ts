import {
  TreeType,
  LeafBlockPos,
  ApplePos,
  FlowerPos,
  GoldenApplePos,
  PetPos,
  CampfirePos,
  ChestPos,
  JackOLanternPos,
  HolidayGiftPos,
  OreBlockPos,
} from "./tree";
import {
  LOG_16X16,
  LOG_PALETTES,
  LEAF_16X16,
  LEAF_PALETTES,
  BIOME_TERRAINS,
  ORE_PALETTES,
  CHEST_PALETTES,
} from "./palettes";

export function renderMinecraftGround(
  width: number,
  height: number,
  groundY: number,
  isSnow: boolean = false,
  oreBlocks: OreBlockPos[] = [],
  treeType: TreeType = "oak"
): string {
  const terrain = BIOME_TERRAINS[treeType] || BIOME_TERRAINS.oak;
  const grassHeight = 14;
  const grassColor = isSnow ? "#eceff1" : terrain.grassTop;
  const grassHighlight = isSnow ? "#ffffff" : terrain.grassHighlight;
  const grassShadow = isSnow ? "#cfd8dc" : terrain.grassShadow;
  const dirtBase = terrain.dirtBase;
  const dirtDark = terrain.dirtDark;
  const dirtLight = terrain.dirtLight;
  const pebbleColor = terrain.pebbleColor;

  let oresSvg = "";
  for (const ore of oreBlocks) {
    if (ore.type === "netherite") {
      // Ancient Debris / Netherite Block (Dark Obsidian & Metallic Bronze/Gold Veins for Repo Owner)
      oresSvg += `
        <!-- NETHERITE / ANCIENT DEBRIS BLOCK (REPO OWNER) -->
        <g shape-rendering="crispEdges">
          <rect x="${ore.x}" y="${ore.y}" width="24" height="20" fill="#2b2622" />
          <rect x="${ore.x + 2}" y="${ore.y + 2}" width="20" height="16" fill="#3e3630" />
          <!-- Dark obsidian cracks -->
          <rect x="${ore.x + 3}" y="${ore.y + 5}" width="6" height="3" fill="#1c1815" />
          <rect x="${ore.x + 13}" y="${ore.y + 11}" width="7" height="3" fill="#1c1815" />
          <!-- Metallic Ancient Debris / Gold Veins -->
          <rect x="${ore.x + 5}" y="${ore.y + 4}" width="5" height="4" fill="#a08060" />
          <rect x="${ore.x + 6}" y="${ore.y + 5}" width="3" height="2" fill="#d4a373" />
          <rect x="${ore.x + 7}" y="${ore.y + 5}" width="1.5" height="1.5" fill="#ffffff" />
          <rect x="${ore.x + 14}" y="${ore.y + 6}" width="4" height="4" fill="#a08060" />
          <rect x="${ore.x + 15}" y="${ore.y + 7}" width="2" height="2" fill="#d4a373" />
          <rect x="${ore.x + 9}" y="${ore.y + 12}" width="5" height="4" fill="#d4a373" />
          <rect x="${ore.x + 10}" y="${ore.y + 13}" width="2" height="2" fill="#ffd166" />
        </g>
      `;
    } else if (ore.type === "lapis") {
      // Lapis Lazuli Ore (Royal Ultramarine Clusters with embedded Pyrite Flecks)
      oresSvg += `
        <!-- LAPIS ORE BLOCK -->
        <g shape-rendering="crispEdges">
          <rect x="${ore.x}" y="${ore.y}" width="24" height="20" fill="#616161" />
          <rect x="${ore.x + 2}" y="${ore.y + 2}" width="20" height="16" fill="#757575" />
          
          <!-- Top-Left Lapis Cluster with embedded pyrite -->
          <rect x="${ore.x + 4}" y="${ore.y + 4}" width="6" height="5" fill="#103f91" />
          <rect x="${ore.x + 5}" y="${ore.y + 4}" width="4" height="4" fill="#1d57b8" />
          <rect x="${ore.x + 5}" y="${ore.y + 4}" width="2" height="2" fill="#5c95e8" />
          <rect x="${ore.x + 7}" y="${ore.y + 6}" width="2" height="2" fill="#ffd54f" />

          <!-- Right Lapis Cluster -->
          <rect x="${ore.x + 13}" y="${ore.y + 6}" width="5" height="5" fill="#103f91" />
          <rect x="${ore.x + 14}" y="${ore.y + 6}" width="4" height="4" fill="#1d57b8" />
          <rect x="${ore.x + 15}" y="${ore.y + 8}" width="2" height="2" fill="#0a2560" />
          <rect x="${ore.x + 14}" y="${ore.y + 7}" width="2" height="2" fill="#ffd54f" />

          <!-- Bottom Lapis Cluster -->
          <rect x="${ore.x + 7}" y="${ore.y + 12}" width="7" height="5" fill="#103f91" />
          <rect x="${ore.x + 8}" y="${ore.y + 12}" width="5" height="4" fill="#1d57b8" />
          <rect x="${ore.x + 9}" y="${ore.y + 13}" width="2" height="2" fill="#5c95e8" />
          <rect x="${ore.x + 11}" y="${ore.y + 14}" width="2" height="2" fill="#ffd54f" />
        </g>
      `;
    } else {
      const palette = ORE_PALETTES[ore.type] || ORE_PALETTES.diamond;
      const { gemColor, gemShine, gemShadow } = palette;

      oresSvg += `
        <!-- ${ore.type.toUpperCase()} ORE BLOCK -->
        <g shape-rendering="crispEdges">
          <!-- Stone Matrix Core -->
          <rect x="${ore.x}" y="${ore.y}" width="24" height="20" fill="#616161" />
          <rect x="${ore.x + 2}" y="${ore.y + 2}" width="20" height="16" fill="#757575" />
          
          <!-- Top Left Ore Cluster -->
          <rect x="${ore.x + 4}" y="${ore.y + 4}" width="5" height="4" fill="${gemColor}" />
          <rect x="${ore.x + 5}" y="${ore.y + 4}" width="2" height="2" fill="${gemShine}" />
          <rect x="${ore.x + 6}" y="${ore.y + 6}" width="3" height="2" fill="${gemShadow}" />
          
          <!-- Middle Right Ore Cluster -->
          <rect x="${ore.x + 13}" y="${ore.y + 6}" width="6" height="5" fill="${gemColor}" />
          <rect x="${ore.x + 14}" y="${ore.y + 6}" width="3" height="2" fill="${gemShine}" />
          <rect x="${ore.x + 15}" y="${ore.y + 9}" width="4" height="2" fill="${gemShadow}" />

          <!-- Bottom Center Ore Cluster -->
          <rect x="${ore.x + 7}" y="${ore.y + 12}" width="6" height="4" fill="${gemColor}" />
          <rect x="${ore.x + 8}" y="${ore.y + 12}" width="2.5" height="2" fill="${gemShine}" />
          <rect x="${ore.x + 10}" y="${ore.y + 14}" width="3" height="2" fill="${gemShadow}" />
          
          <!-- Embedded Stone Texture Specks -->
          <rect x="${ore.x + 3}" y="${ore.y + 10}" width="2" height="2" fill="#424242" />
          <rect x="${ore.x + 11}" y="${ore.y + 3}" width="2" height="2" fill="#424242" />
          <rect x="${ore.x + 18}" y="${ore.y + 13}" width="2" height="2" fill="#9e9e9e" />
        </g>
      `;
    }
  }

  // Authentic jagged Minecraft grass fringe hanging down onto the dirt
  let grassFringesSvg = "";
  const fringeBlockWidth = 8;
  const numFringes = Math.ceil(width / fringeBlockWidth);
  for (let i = 0; i < numFringes; i++) {
    const fx = i * fringeBlockWidth;
    const pat = (i * 7 + 3) % 5;
    let fringeH = 3;
    if (pat === 0) fringeH = 5;
    else if (pat === 1) fringeH = 2;
    else if (pat === 2) fringeH = 4;
    else if (pat === 3) fringeH = 3;
    else fringeH = 6;

    grassFringesSvg += `<rect x="${fx}" y="${groundY + grassHeight}" width="${fringeBlockWidth}" height="${fringeH}" fill="${grassColor}" />`;
    if (fringeH >= 4) {
      grassFringesSvg += `<rect x="${fx + 2}" y="${groundY + grassHeight + fringeH - 2}" width="${fringeBlockWidth - 4}" height="2" fill="${grassShadow}" />`;
    }
  }

  return `
    <!-- Ground Layer (Grass + Dirt + Jagged Fringes + Biome Terrain) -->
    <g shape-rendering="crispEdges">
      <!-- Dirt Base -->
      <rect x="0" y="${groundY + grassHeight}" width="${width}" height="${height - (groundY + grassHeight)}" fill="${dirtBase}" />
      
      <!-- Dirt Texture Flecks & Strata -->
      <!-- Top Dirt Shadow Layer beneath grass -->
      <rect x="0" y="${groundY + grassHeight}" width="${width}" height="6" fill="${dirtDark}" opacity="0.6" />
      
      <!-- Dirt flecks level 1 -->
      <rect x="18" y="${groundY + 22}" width="8" height="6" fill="${dirtDark}" />
      <rect x="74" y="${groundY + 28}" width="10" height="5" fill="${dirtLight}" />
      <rect x="135" y="${groundY + 20}" width="6" height="8" fill="${dirtDark}" />
      <rect x="190" y="${groundY + 26}" width="12" height="4" fill="${dirtLight}" />
      <rect x="250" y="${groundY + 22}" width="7" height="6" fill="${dirtDark}" />
      <rect x="310" y="${groundY + 25}" width="9" height="7" fill="${dirtLight}" />
      <rect x="380" y="${groundY + 21}" width="8" height="5" fill="${dirtDark}" />
      <rect x="425" y="${groundY + 27}" width="10" height="6" fill="${dirtLight}" />

      <!-- Dirt flecks level 2 (deeper) -->
      <rect x="35" y="${groundY + 34}" width="12" height="5" fill="${dirtLight}" />
      <rect x="95" y="${groundY + 38}" width="8" height="6" fill="${dirtDark}" />
      <rect x="160" y="${groundY + 32}" width="10" height="7" fill="${dirtLight}" />
      <rect x="220" y="${groundY + 36}" width="6" height="5" fill="${dirtDark}" />
      <rect x="280" y="${groundY + 34}" width="11" height="6" fill="${dirtDark}" />
      <rect x="345" y="${groundY + 37}" width="8" height="5" fill="${dirtLight}" />
      <rect x="400" y="${groundY + 33}" width="14" height="6" fill="${dirtDark}" />

      <!-- Pebbles/Stones in soil -->
      <rect x="52" y="${groundY + 24}" width="4" height="3" fill="${pebbleColor}" />
      <rect x="175" y="${groundY + 38}" width="5" height="3" fill="${pebbleColor}" />
      <rect x="295" y="${groundY + 26}" width="4" height="4" fill="${pebbleColor}" />
      <rect x="365" y="${groundY + 35}" width="5" height="3" fill="${pebbleColor}" />

      <!-- Embedded Ore Blocks -->
      ${oresSvg}

      <!-- Hanging Jagged Grass Fringes -->
      ${grassFringesSvg}

      <!-- Top Grass Layer with 3D Bevel -->
      <rect x="0" y="${groundY}" width="${width}" height="${grassHeight}" fill="${grassColor}" />
      <rect x="0" y="${groundY}" width="${width}" height="3" fill="${grassHighlight}" />
      <rect x="0" y="${groundY + grassHeight - 3}" width="${width}" height="3" fill="${grassShadow}" />
      
      <!-- Grass Tufts/Blades -->
      <rect x="24" y="${groundY - 3}" width="4" height="3" fill="${grassHighlight}" />
      <rect x="28" y="${groundY - 5}" width="3" height="5" fill="${grassColor}" />
      <rect x="85" y="${groundY - 4}" width="3" height="4" fill="${grassHighlight}" />
      <rect x="145" y="${groundY - 3}" width="4" height="3" fill="${grassColor}" />
      <rect x="149" y="${groundY - 6}" width="3" height="6" fill="${grassHighlight}" />
      <rect x="210" y="${groundY - 4}" width="3" height="4" fill="${grassHighlight}" />
      <rect x="270" y="${groundY - 5}" width="4" height="5" fill="${grassColor}" />
      <rect x="330" y="${groundY - 3}" width="3" height="3" fill="${grassHighlight}" />
      <rect x="390" y="${groundY - 5}" width="4" height="5" fill="${grassHighlight}" />
      <rect x="435" y="${groundY - 4}" width="3" height="4" fill="${grassColor}" />
    </g>
  `;
}

export function renderMinecraftLog(
  x: number,
  y: number,
  size: number,
  treeType: TreeType = "oak"
): string {
  const pixelSize = size / 16;
  const palette = LOG_PALETTES[treeType] || LOG_PALETTES.oak;
  let rects = "";

  for (let r = 0; r < 16; r++) {
    const row = LOG_16X16[r];
    for (let c = 0; c < 16; c++) {
      const colorIndex = parseInt(row[c], 10);
      const color = palette[colorIndex];
      const px = x + c * pixelSize;
      const py = y + r * pixelSize;
      rects += `<rect x="${px.toFixed(1)}" y="${py.toFixed(1)}" width="${pixelSize.toFixed(1)}" height="${pixelSize.toFixed(1)}" fill="${color}" />`;
    }
  }

  return `<g shape-rendering="crispEdges">${rects}</g>`;
}

export function renderMinecraftLeaf(
  leaf: LeafBlockPos,
  frameIndex: number,
  totalFrames: number,
  isSnow: boolean = false,
  treeType: TreeType = "oak"
): string {
  const { x, y, size, commitLevel, gridY } = leaf;
  const pixelSize = size / 16;
  const biomePalettes = LEAF_PALETTES[treeType] || LEAF_PALETTES.oak;
  const palette = biomePalettes[Math.min(4, Math.max(0, commitLevel))];

  const shimmer = (frameIndex + leaf.weekIndex) % Math.max(1, totalFrames) < totalFrames / 2 ? 0 : 1;

  let rects = "";
  for (let r = 0; r < 16; r++) {
    const row = LEAF_16X16[r];
    for (let c = 0; c < 16; c++) {
      let colorIndex = parseInt(row[c], 10);
      if (colorIndex === 3 && shimmer === 1 && (r + c) % 2 === 0) {
        colorIndex = 0;
      }
      const color = palette[colorIndex];
      const px = x + c * pixelSize;
      const py = y + r * pixelSize;
      rects += `<rect x="${px.toFixed(1)}" y="${py.toFixed(1)}" width="${pixelSize.toFixed(1)}" height="${pixelSize.toFixed(1)}" fill="${color}" />`;
    }
  }

  let snowCap = "";
  if (isSnow && (gridY === -3 || gridY === -2 || (gridY === -1 && (leaf.gridX === -2 || leaf.gridX === 2)))) {
    snowCap = `
      <rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${size.toFixed(1)}" height="4" fill="#ffffff" />
      <rect x="${(x + 2).toFixed(1)}" y="${(y + 4).toFixed(1)}" width="${(size - 4).toFixed(1)}" height="2" fill="#eceff1" />
    `;
  }

  return `<g shape-rendering="crispEdges">${rects}${snowCap}</g>`;
}

export function renderFlowerOnGrass(flower: FlowerPos, frameIndex: number): string {
  const { x, y, type } = flower;
  const ps = 2.0;
  const cx = x;
  const cy = y;

  let petalColor = "#e63946";
  let centerColor = "#2b2b2b";

  if (type === "sakura") {
    petalColor = "#ff85a2";
  } else if (type === "dandelion") {
    petalColor = "#ffd166";
    centerColor = "#e76f51";
  } else if (type === "tulip") {
    petalColor = "#f77f00";
    centerColor = "#d62828";
  }

  const pulse = (frameIndex + Math.floor(cx / 10)) % 4 === 0 ? ps * 0.5 : 0;

  return `
    <g shape-rendering="crispEdges">
      <rect x="${cx + 4 * ps}" y="${cy + 5 * ps}" width="${2 * ps}" height="${7 * ps}" fill="#2e7d32" />
      <rect x="${cx + 2 * ps}" y="${cy + 8 * ps}" width="${2 * ps}" height="${2 * ps}" fill="#4caf50" />
      <rect x="${cx + 6 * ps}" y="${cy + 7 * ps}" width="${2 * ps}" height="${2 * ps}" fill="#4caf50" />
      
      <rect x="${cx + 1 * ps - pulse}" y="${cy + 1 * ps - pulse}" width="${8 * ps + pulse * 2}" height="${6 * ps + pulse * 2}" fill="${petalColor}" />
      <rect x="${cx + 2 * ps - pulse}" y="${cy - pulse}" width="${6 * ps + pulse * 2}" height="${8 * ps + pulse * 2}" fill="${petalColor}" />
      
      <rect x="${cx + 3.5 * ps}" y="${cy + 2.5 * ps}" width="${3 * ps}" height="${3 * ps}" fill="${centerColor}" />
      <rect x="${cx + 2.5 * ps}" y="${cy + 1.5 * ps}" width="${1.5 * ps}" height="${1.5 * ps}" fill="#ffffff" opacity="0.8" />
    </g>
  `;
}

export function renderApple(apple: ApplePos, frameIndex: number): string {
  const { x, y, size } = apple;
  const ps = size / 12;
  const cx = x;
  const cy = y;

  const sway = (frameIndex + (apple.gridX || 0)) % 6 < 3 ? 0 : ps * 0.6;

  return `
    <g shape-rendering="crispEdges">
      <rect x="${cx + 5 * ps + sway}" y="${cy}" width="${2 * ps}" height="${4 * ps}" fill="#4e342e" />
      <rect x="${cx + 7 * ps + sway}" y="${cy + 1 * ps}" width="${2.5 * ps}" height="${2 * ps}" fill="#4caf50" />
      
      <rect x="${cx + 2 * ps + sway}" y="${cy + 4 * ps}" width="${8 * ps}" height="${8 * ps}" fill="#d90429" />
      <rect x="${cx + 1 * ps + sway}" y="${cy + 5 * ps}" width="${10 * ps}" height="${6 * ps}" fill="#d90429" />
      
      <rect x="${cx + 3 * ps + sway}" y="${cy + 11 * ps}" width="${6 * ps}" height="${1.5 * ps}" fill="#780016" />
      <rect x="${cx + 3 * ps + sway}" y="${cy + 5 * ps}" width="${2 * ps}" height="${2 * ps}" fill="#ffffff" />
    </g>
  `;
}

export function renderGoldenAppleOnGrass(apple: GoldenApplePos, frameIndex: number): string {
  const { x, y, size } = apple;
  const ps = size / 12;
  const cx = x;
  const cy = y;

  const shimmer = (frameIndex + Math.floor(cx / 10)) % 4 === 0;
  const pulse = shimmer ? ps * 0.4 : 0;

  return `
    <g shape-rendering="crispEdges">
      <rect x="${cx + 5 * ps}" y="${cy}" width="${2 * ps}" height="${4 * ps}" fill="#4e342e" />
      <rect x="${cx + 7 * ps}" y="${cy + 1 * ps}" width="${2.5 * ps}" height="${2 * ps}" fill="#ffd700" />
      
      <rect x="${cx + 2 * ps - pulse}" y="${cy + 4 * ps - pulse}" width="${8 * ps + pulse * 2}" height="${8 * ps + pulse * 2}" fill="#ffb703" />
      <rect x="${cx + 1 * ps - pulse}" y="${cy + 5 * ps - pulse}" width="${10 * ps + pulse * 2}" height="${6 * ps + pulse * 2}" fill="#ffc300" />
      
      <rect x="${cx + 3 * ps}" y="${cy + 11 * ps}" width="${6 * ps}" height="${1.5 * ps}" fill="#cc8800" />
      <rect x="${cx + 3 * ps}" y="${cy + 5 * ps}" width="${2 * ps}" height="${2 * ps}" fill="#ffffff" />
      <rect x="${cx + 7 * ps}" y="${cy + 3 * ps}" width="${1.5 * ps}" height="${1.5 * ps}" fill="#fff9c4" opacity="${shimmer ? 1 : 0.4}" />
    </g>
  `;
}

export function renderMinecraftBee(
  baseX: number,
  baseY: number,
  frameIndex: number,
  totalFrames: number
): string {
  const t = totalFrames > 0 ? (frameIndex % totalFrames) / totalFrames : 0;
  // Sinusoidal flight path hovering around canopy & flowers
  const bx = baseX + Math.sin(t * Math.PI * 2) * 16;
  const by = baseY + Math.cos(t * Math.PI * 4) * 4;
  const wingFlap = frameIndex % 2 === 0;

  return `
    <!-- Minecraft Bee -->
    <g shape-rendering="crispEdges">
      <!-- Bee Body: Yellow & Black stripes -->
      <rect x="${bx.toFixed(1)}" y="${(by + 3).toFixed(1)}" width="14" height="10" fill="#fbc02d" />
      <rect x="${(bx + 4).toFixed(1)}" y="${(by + 3).toFixed(1)}" width="3" height="10" fill="#212121" />
      <rect x="${(bx + 10).toFixed(1)}" y="${(by + 3).toFixed(1)}" width="3" height="10" fill="#212121" />
      <!-- Stinger -->
      <rect x="${(bx + 13).toFixed(1)}" y="${(by + 7).toFixed(1)}" width="2" height="2" fill="#212121" />
      <!-- Cute Cyan Eyes & Antennae -->
      <rect x="${bx.toFixed(1)}" y="${(by + 5).toFixed(1)}" width="2" height="3" fill="#40c4ff" />
      <rect x="${(bx + 2).toFixed(1)}" y="${(by + 1).toFixed(1)}" width="1.5" height="2" fill="#212121" />
      <rect x="${(bx + 5).toFixed(1)}" y="${(by + 1).toFixed(1)}" width="1.5" height="2" fill="#212121" />
      <!-- Little legs -->
      <rect x="${(bx + 3).toFixed(1)}" y="${(by + 13).toFixed(1)}" width="2" height="2" fill="#212121" />
      <rect x="${(bx + 8).toFixed(1)}" y="${(by + 13).toFixed(1)}" width="2" height="2" fill="#212121" />
      <!-- Fluttering translucent wings -->
      <rect x="${(bx + 3).toFixed(1)}" y="${(by - (wingFlap ? 3 : 1)).toFixed(1)}" width="6" height="${wingFlap ? 3 : 2}" fill="#ffffff" opacity="0.8" />
      <rect x="${(bx + 7).toFixed(1)}" y="${(by - (wingFlap ? 2 : 0)).toFixed(1)}" width="5" height="${wingFlap ? 2 : 1}" fill="#e1f5fe" opacity="0.7" />
    </g>
  `;
}

export function renderMinecraftBeehive(
  x: number,
  y: number,
  _side: "left" | "right" = "right"
): string {
  return `
    <!-- Minecraft Beehive -->
    <g shape-rendering="crispEdges">
      <rect x="${x}" y="${y}" width="22" height="18" fill="#d7a15c" />
      <rect x="${x}" y="${y}" width="22" height="3" fill="#bf8640" />
      <rect x="${x}" y="${y + 7}" width="22" height="2" fill="#946328" />
      <rect x="${x}" y="${y + 14}" width="22" height="2" fill="#946328" />
      <!-- Hive entrance slit -->
      <rect x="${x + 4}" y="${y + 10}" width="14" height="3" fill="#2b180a" />
      <!-- Dripping honey -->
      <rect x="${x + 6}" y="${y + 13}" width="3" height="3" fill="#ffb300" />
      <rect x="${x + 13}" y="${y + 13}" width="2" height="4" fill="#ffd54f" />
    </g>
  `;
}

// 3x5 Pixel Font for Minecraft Signpost digits, 'd', 'k', and '.'
const PIXEL_FONT_3X5: Record<string, string[]> = {
  "0": ["111", "101", "101", "101", "111"],
  "1": ["010", "110", "010", "010", "111"],
  "2": ["111", "001", "111", "100", "111"],
  "3": ["111", "001", "111", "001", "111"],
  "4": ["101", "101", "111", "001", "001"],
  "5": ["111", "100", "111", "001", "111"],
  "6": ["111", "100", "111", "101", "111"],
  "7": ["111", "001", "010", "010", "010"],
  "8": ["111", "101", "111", "101", "111"],
  "9": ["111", "101", "111", "001", "111"],
  "D": ["110", "101", "101", "101", "110"],
  "d": ["110", "101", "101", "101", "110"],
  "K": ["101", "110", "100", "110", "101"],
  "k": ["101", "110", "100", "110", "101"],
  ".": ["000", "000", "000", "000", "010"],
  "+": ["000", "010", "111", "010", "000"],
};

// 5x5 Star with vibrant gold arms and sparkling white core
const STAR_5X5 = [
  "00200",
  "02320",
  "23332",
  "02320",
  "00200",
];
const STAR_PALETTE = [
  "",
  "#2d1b0d", // 1: Dark outline
  "#ffd600", // 2: Vibrant gold
  "#ffffff", // 3: Bright white sparkle
];

// 5x5 Royal Crown for 100+ and 365+ Day Streak Milestones
const CROWN_5X5 = [
  "30303", // 3 Sparkling jewel tips
  "20202", // 3 distinct peaks
  "22222", // Solid crown body band
  "23232", // Band with 2 embedded diamond jewels
  "12221", // Contoured base
];

export function renderMinecraftSignpost(
  x: number,
  y: number,
  streak: number
): string {
  // Option 2: Smart Compact Streak Notation
  let streakText = "0D";
  if (streak >= 10000) {
    streakText = `${Math.floor(streak / 1000)}K`;
  } else if (streak >= 1000) {
    streakText = `${(streak / 1000).toFixed(1).replace(/\.0$/, "")}K`;
  } else if (streak > 0) {
    streakText = `${streak}D`;
  }

  const boardWidth = 46;
  const boardHeight = 18;

  // Crisp integer pixel sizes & gaps
  let ps = 2;
  let charGap = 2;
  let iconGap = 3;

  if (streakText.length >= 5) {
    ps = 1.2;
    charGap = 1;
    iconGap = 2;
  } else if (streakText.length === 4) {
    ps = 1.6;
    charGap = 1.5;
    iconGap = 2.5;
  }

  const isDiamond = streak >= 365;
  const isGold = streak >= 100 && !isDiamond;

  // Milestone Signpost Themes & Glyphs
  const iconMatrix = isDiamond || isGold ? CROWN_5X5 : STAR_5X5;
  const iconPalette = isDiamond
    ? ["", "#0091ea", "#00e5ff", "#ffffff"]
    : isGold
    ? ["", "#ff8f00", "#ffd600", "#ffffff"]
    : STAR_PALETTE;

  const textColor = isDiamond ? "#e0f7fa" : isGold ? "#fff9c4" : "#2d1b0d";

  const iconWidth = 5 * ps;
  const textWidth = streakText.length * (3 * ps + charGap) - charGap;
  const totalContentWidth = iconWidth + iconGap + textWidth;
  const startX = Math.round(x + (boardWidth - totalContentWidth) / 2);
  const textY = Math.round(y + (boardHeight - 5 * ps) / 2);

  let glyphsSvg = "";

  // 1. Render Icon (Star or Royal Crown)
  let curX = startX;
  for (let r = 0; r < 5; r++) {
    const row = iconMatrix[r];
    for (let c = 0; c < 5; c++) {
      const val = parseInt(row[c], 10);
      if (val > 0) {
        const color = iconPalette[val];
        const px = Math.round(curX + c * ps);
        const py = Math.round(textY + r * ps);
        const pw = Math.round(ps);
        glyphsSvg += `<rect x="${px}" y="${py}" width="${pw}" height="${pw}" fill="${color}" />`;
      }
    }
  }

  curX += iconWidth + iconGap;

  // 2. Render Digits & Suffix
  for (let i = 0; i < streakText.length; i++) {
    const char = streakText[i];
    const matrix = PIXEL_FONT_3X5[char] || PIXEL_FONT_3X5["0"];
    for (let r = 0; r < 5; r++) {
      const row = matrix[r];
      for (let c = 0; c < 3; c++) {
        if (row[c] === "1") {
          const px = Math.round(curX + c * ps);
          const py = Math.round(textY + r * ps);
          const pw = Math.round(ps);
          glyphsSvg += `<rect x="${px}" y="${py}" width="${pw}" height="${pw}" fill="${textColor}" />`;
        }
      }
    }
    curX += 3 * ps + charGap;
  }

  // Board frames
  let boardSvg = "";
  if (isDiamond) {
    // 365+ Days: Diamond Prismatic Milestone Signboard
    boardSvg = `
      <!-- Diamond Post -->
      <rect x="${x + 20}" y="${y + boardHeight}" width="4" height="8" fill="#004d40" />
      <!-- Diamond Frame -->
      <rect x="${x}" y="${y}" width="${boardWidth}" height="${boardHeight}" fill="#00251a" />
      <rect x="${x + 1.5}" y="${y + 1.5}" width="${boardWidth - 3}" height="${boardHeight - 3}" fill="#004d40" />
      <rect x="${x + 2.5}" y="${y + 2.5}" width="${boardWidth - 5}" height="1.5" fill="#00e5ff" />
      <rect x="${x + 2.5}" y="${y + boardHeight - 3.5}" width="${boardWidth - 5}" height="1.5" fill="#0091ea" />
    `;
  } else if (isGold) {
    // 100+ Days: Golden Inlay Milestone Signboard
    boardSvg = `
      <!-- Golden Inlay Post -->
      <rect x="${x + 20}" y="${y + boardHeight}" width="4" height="8" fill="#5d4037" />
      <!-- Golden Frame -->
      <rect x="${x}" y="${y}" width="${boardWidth}" height="${boardHeight}" fill="#3e2723" />
      <rect x="${x + 1.5}" y="${y + 1.5}" width="${boardWidth - 3}" height="${boardHeight - 3}" fill="#c68642" />
      <rect x="${x + 2.5}" y="${y + 2.5}" width="${boardWidth - 5}" height="1.5" fill="#ffd54f" />
      <rect x="${x + 2.5}" y="${y + boardHeight - 3.5}" width="${boardWidth - 5}" height="1.5" fill="#ff8f00" />
    `;
  } else {
    // Standard Classic Oak Wooden Signboard
    boardSvg = `
      <!-- Wooden Post -->
      <rect x="${x + 20}" y="${y + boardHeight}" width="4" height="8" fill="#6d4934" />
      <!-- Wooden Signboard Frame -->
      <rect x="${x}" y="${y}" width="${boardWidth}" height="${boardHeight}" fill="#4a3020" />
      <rect x="${x + 1.5}" y="${y + 1.5}" width="${boardWidth - 3}" height="${boardHeight - 3}" fill="#c8963e" />
      <rect x="${x + 2.5}" y="${y + 2.5}" width="${boardWidth - 5}" height="1.5" fill="#dfad58" />
      <rect x="${x + 2.5}" y="${y + boardHeight - 3.5}" width="${boardWidth - 5}" height="1.5" fill="#9e6e22" />
    `;
  }

  const signTitle = isDiamond
    ? "Minecraft Diamond Milestone Signpost (365+ Streak)"
    : isGold
    ? "Minecraft Golden Milestone Signpost (100+ Streak)"
    : "Minecraft Wooden Stat Signpost";

  return `
    <!-- ${signTitle} -->
    <g shape-rendering="crispEdges">
      ${boardSvg}
      <!-- Carved & Glowing Pixel Art Glyphs -->
      ${glyphsSvg}
    </g>
  `;
}

export function renderMinecraftWolf(pet: PetPos, frameIndex: number): string {
  const { x, y } = pet;
  const ps = 1.3;
  const wag = frameIndex % 4 < 2;
  const tailX = wag ? x - 3 * ps : x - 1.5 * ps;
  const tailY = wag ? y + 4 * ps : y + 6 * ps;

  return `
    <!-- Minecraft Tamed Wolf -->
    <g shape-rendering="crispEdges">
      <!-- Tail wagging -->
      <rect x="${tailX.toFixed(1)}" y="${tailY.toFixed(1)}" width="${2.5 * ps}" height="${6 * ps}" fill="#b0bec5" />
      <rect x="${tailX.toFixed(1)}" y="${(tailY + 4 * ps).toFixed(1)}" width="${2.5 * ps}" height="${2 * ps}" fill="#78909c" />

      <!-- Back haunches (sitting) -->
      <rect x="${x}" y="${y + 5 * ps}" width="${6 * ps}" height="${8 * ps}" fill="#b0bec5" />
      <rect x="${x + 1 * ps}" y="${y + 11 * ps}" width="${4 * ps}" height="${2 * ps}" fill="#90a4ae" />

      <!-- Body -->
      <rect x="${x + 4 * ps}" y="${y + 3 * ps}" width="${7 * ps}" height="${9 * ps}" fill="#cfd8dc" />
      <rect x="${x + 4 * ps}" y="${y + 7 * ps}" width="${7 * ps}" height="${4 * ps}" fill="#eceff1" />

      <!-- Front sitting legs & paws -->
      <rect x="${x + 7 * ps}" y="${y + 8 * ps}" width="${2.5 * ps}" height="${5 * ps}" fill="#cfd8dc" />
      <rect x="${x + 10 * ps}" y="${y + 8 * ps}" width="${2.5 * ps}" height="${5 * ps}" fill="#b0bec5" />
      <rect x="${x + 7 * ps}" y="${y + 12 * ps}" width="${2.5 * ps}" height="${1 * ps}" fill="#90a4ae" />
      <rect x="${x + 10 * ps}" y="${y + 12 * ps}" width="${2.5 * ps}" height="${1 * ps}" fill="#78909c" />

      <!-- Tamed Red Collar + Gold Tag -->
      <rect x="${x + 6 * ps}" y="${y + 2 * ps}" width="${6 * ps}" height="${1.5 * ps}" fill="#d32f2f" />
      <rect x="${x + 8.5 * ps}" y="${y + 3 * ps}" width="${1.5 * ps}" height="${1.5 * ps}" fill="#ffd54f" />

      <!-- Wolf Head & Ears -->
      <rect x="${x + 5 * ps}" y="${y - 4 * ps}" width="${8 * ps}" height="${6 * ps}" fill="#cfd8dc" />
      <!-- Left & Right Ears -->
      <rect x="${x + 5 * ps}" y="${y - 7 * ps}" width="${2.5 * ps}" height="${3 * ps}" fill="#90a4ae" />
      <rect x="${x + 10.5 * ps}" y="${y - 7 * ps}" width="${2.5 * ps}" height="${3 * ps}" fill="#90a4ae" />
      <rect x="${x + 5.5 * ps}" y="${y - 6 * ps}" width="${1.5 * ps}" height="${1.5 * ps}" fill="#cfd8dc" />
      <rect x="${x + 11 * ps}" y="${y - 6 * ps}" width="${1.5 * ps}" height="${1.5 * ps}" fill="#cfd8dc" />

      <!-- Cute Snout & Nose -->
      <rect x="${x + 10 * ps}" y="${y - 1 * ps}" width="${4 * ps}" height="${3 * ps}" fill="#ffffff" />
      <rect x="${x + 12.5 * ps}" y="${y - 1 * ps}" width="${1.5 * ps}" height="${1.5 * ps}" fill="#212121" />

      <!-- Eyes (Black with specular white dot) -->
      <rect x="${x + 7.5 * ps}" y="${y - 3 * ps}" width="${1.5 * ps}" height="${1.5 * ps}" fill="#212121" />
      <rect x="${x + 7.5 * ps}" y="${y - 3 * ps}" width="${0.8 * ps}" height="${0.8 * ps}" fill="#ffffff" />
    </g>
  `;
}

export function renderMinecraftFox(pet: PetPos, frameIndex: number, isNight: boolean): string {
  const { x, y, state } = pet;
  const ps = 1.3;

  if (state === "sleeping" && !isNight) {
    // Curled round sleeping fox on lawn
    const breath = frameIndex % 6 < 3 ? 0 : 0.6;
    return `
      <!-- Minecraft Sleeping Fox -->
      <g shape-rendering="crispEdges">
        <!-- Curled Body -->
        <rect x="${x + 2 * ps}" y="${y + (2 * ps - breath)}" width="${11 * ps}" height="${7 * ps + breath}" fill="#e65100" />
        <rect x="${x + 3 * ps}" y="${y + (1 * ps - breath)}" width="${9 * ps}" height="${2 * ps}" fill="#ff9800" />
        
        <!-- White belly patch -->
        <rect x="${x + 5 * ps}" y="${y + 4 * ps}" width="${5 * ps}" height="${4 * ps}" fill="#ffffff" />
        
        <!-- Curled fluffy tail with white tip -->
        <rect x="${x}" y="${y + 3 * ps}" width="${4 * ps}" height="${5 * ps}" fill="#e65100" />
        <rect x="${x}" y="${y + 1 * ps}" width="${3 * ps}" height="${3 * ps}" fill="#ffffff" />
        <rect x="${x + 2.5 * ps}" y="${y + 2 * ps}" width="${1 * ps}" height="${2 * ps}" fill="#212121" />

        <!-- Sleeping Head tucked in -->
        <rect x="${x + 8 * ps}" y="${y + (3 * ps - breath)}" width="${6 * ps}" height="${5 * ps}" fill="#e65100" />
        <rect x="${x + 11 * ps}" y="${y + (5 * ps - breath)}" width="${3 * ps}" height="${3 * ps}" fill="#ffffff" />
        <rect x="${x + 13 * ps}" y="${y + (5 * ps - breath)}" width="${1 * ps}" height="${1 * ps}" fill="#212121" />

        <!-- Closed sleeping eyes (slit) -->
        <rect x="${x + 9.5 * ps}" y="${y + (4 * ps - breath)}" width="${2 * ps}" height="${0.8 * ps}" fill="#5d4037" />

        <!-- Fox ears -->
        <rect x="${x + 8 * ps}" y="${y + (1 * ps - breath)}" width="${2 * ps}" height="${2 * ps}" fill="#212121" />
        <rect x="${x + 12 * ps}" y="${y + (1 * ps - breath)}" width="${2 * ps}" height="${2 * ps}" fill="#212121" />
        <rect x="${x + 8.5 * ps}" y="${y + (1.5 * ps - breath)}" width="${1 * ps}" height="${1 * ps}" fill="#ffffff" />
      </g>
    `;
  }

  // Alert awake fox (night / active)
  const tailSway = frameIndex % 4 < 2 ? 0 : 1;
  return `
    <!-- Minecraft Alert Fox -->
    <g shape-rendering="crispEdges">
      <!-- Tail with white tip -->
      <rect x="${x - (2 + tailSway) * ps}" y="${y + 2 * ps}" width="${4 * ps}" height="${7 * ps}" fill="#e65100" />
      <rect x="${x - (3 + tailSway) * ps}" y="${y + 6 * ps}" width="${3 * ps}" height="${4 * ps}" fill="#ffffff" />
      <rect x="${x - (1 + tailSway) * ps}" y="${y + 5 * ps}" width="${2 * ps}" height="${2 * ps}" fill="#212121" />

      <!-- Fox Body -->
      <rect x="${x + 2 * ps}" y="${y + 3 * ps}" width="${8 * ps}" height="${6 * ps}" fill="#e65100" />
      <rect x="${x + 3 * ps}" y="${y + 2 * ps}" width="${6 * ps}" height="${2 * ps}" fill="#ff9800" />
      <rect x="${x + 4 * ps}" y="${y + 6 * ps}" width="${4 * ps}" height="${3 * ps}" fill="#ffffff" />

      <!-- Legs & dark paws -->
      <rect x="${x + 2 * ps}" y="${y + 8 * ps}" width="${2 * ps}" height="${4 * ps}" fill="#e65100" />
      <rect x="${x + 7 * ps}" y="${y + 8 * ps}" width="${2 * ps}" height="${4 * ps}" fill="#e65100" />
      <rect x="${x + 2 * ps}" y="${y + 11 * ps}" width="${2 * ps}" height="${1 * ps}" fill="#212121" />
      <rect x="${x + 7 * ps}" y="${y + 11 * ps}" width="${2 * ps}" height="${1 * ps}" fill="#212121" />

      <!-- Fox Head & Big Ears -->
      <rect x="${x + 7 * ps}" y="${y - 3 * ps}" width="${6 * ps}" height="${6 * ps}" fill="#e65100" />
      <rect x="${x + 7 * ps}" y="${y - 6 * ps}" width="${2 * ps}" height="${3 * ps}" fill="#212121" />
      <rect x="${x + 11 * ps}" y="${y - 6 * ps}" width="${2 * ps}" height="${3 * ps}" fill="#212121" />
      <rect x="${x + 7.5 * ps}" y="${y - 5 * ps}" width="${1 * ps}" height="${1.5 * ps}" fill="#ffffff" />
      <rect x="${x + 11.5 * ps}" y="${y - 5 * ps}" width="${1.5 * ps}" height="${1.5 * ps}" fill="#ffffff" />

      <!-- Snout & Nose -->
      <rect x="${x + 11 * ps}" y="${y}" width="${3 * ps}" height="${3 * ps}" fill="#ffffff" />
      <rect x="${x + 13 * ps}" y="${y}" width="${1 * ps}" height="${1 * ps}" fill="#212121" />

      <!-- Eyes -->
      <rect x="${x + 9 * ps}" y="${y - 1 * ps}" width="${1.5 * ps}" height="${1.5 * ps}" fill="#212121" />
      <rect x="${x + 9 * ps}" y="${y - 1 * ps}" width="${0.8 * ps}" height="${0.8 * ps}" fill="#ffffff" />
    </g>
  `;
}

export function renderMinecraftCat(pet: PetPos, frameIndex: number): string {
  const { x, y } = pet;
  const ps = 1.2;
  const swish = frameIndex % 4 < 2;
  const tailX = swish ? x - 2 * ps : x - 1 * ps;

  return `
    <!-- Minecraft Tuxedo Cat -->
    <g shape-rendering="crispEdges">
      <!-- Tail swishing -->
      <rect x="${tailX.toFixed(1)}" y="${(y + 4 * ps).toFixed(1)}" width="${2 * ps}" height="${7 * ps}" fill="#212121" />
      <rect x="${tailX.toFixed(1)}" y="${(y + 2 * ps).toFixed(1)}" width="${2 * ps}" height="${3 * ps}" fill="#ffffff" />

      <!-- Sitting body -->
      <rect x="${x + 2 * ps}" y="${y + 4 * ps}" width="${7 * ps}" height="${9 * ps}" fill="#212121" />
      <rect x="${x + 3 * ps}" y="${y + 5 * ps}" width="${4 * ps}" height="${7 * ps}" fill="#ffffff" />

      <!-- Sitting front paws -->
      <rect x="${x + 3 * ps}" y="${y + 12 * ps}" width="${2.5 * ps}" height="${3 * ps}" fill="#ffffff" />
      <rect x="${x + 6.5 * ps}" y="${y + 12 * ps}" width="${2.5 * ps}" height="${3 * ps}" fill="#ffffff" />

      <!-- Cyan Collar -->
      <rect x="${x + 2.5 * ps}" y="${y + 3 * ps}" width="${6 * ps}" height="${1.5 * ps}" fill="#00e5ff" />

      <!-- Head & Pointy Ears -->
      <rect x="${x + 2 * ps}" y="${y - 4 * ps}" width="${7 * ps}" height="${7 * ps}" fill="#212121" />
      <rect x="${x + 2 * ps}" y="${y - 7 * ps}" width="${2.5 * ps}" height="${3 * ps}" fill="#212121" />
      <rect x="${x + 6.5 * ps}" y="${y - 7 * ps}" width="${2.5 * ps}" height="${3 * ps}" fill="#212121" />
      <rect x="${x + 2.5 * ps}" y="${y - 6 * ps}" width="${1.5 * ps}" height="${2 * ps}" fill="#ff80ab" />
      <rect x="${x + 7 * ps}" y="${y - 6 * ps}" width="${1.5 * ps}" height="${2 * ps}" fill="#ff80ab" />

      <!-- White Muzzle & Pink Nose -->
      <rect x="${x + 3.5 * ps}" y="${y}" width="${4 * ps}" height="${3 * ps}" fill="#ffffff" />
      <rect x="${x + 5 * ps}" y="${y}" width="${1 * ps}" height="${1 * ps}" fill="#ff80ab" />

      <!-- Emerald Green Eyes with Vertical Slits -->
      <rect x="${x + 3 * ps}" y="${y - 2 * ps}" width="${2 * ps}" height="${2 * ps}" fill="#00e676" />
      <rect x="${x + 6 * ps}" y="${y - 2 * ps}" width="${2 * ps}" height="${2 * ps}" fill="#00e676" />
      <rect x="${x + 3.5 * ps}" y="${y - 2 * ps}" width="${1 * ps}" height="${2 * ps}" fill="#1b5e20" />
      <rect x="${x + 6.5 * ps}" y="${y - 2 * ps}" width="${1 * ps}" height="${2 * ps}" fill="#1b5e20" />
    </g>
  `;
}

export function renderMinecraftParrot(pet: PetPos, frameIndex: number): string {
  const { x, y } = pet;
  // Dancing head bob / tail flutter
  const dance = (frameIndex % 4 === 0 || frameIndex % 4 === 1);
  const headBob = dance ? 1 : 0;
  const wingFlutter = frameIndex % 4 === 2;

  return `
    <!-- Minecraft Red Macaw Parrot -->
    <g shape-rendering="crispEdges">
      <!-- Tail Feathers (Long royal blue & dark blue trailing to grass) -->
      <rect x="${x + 2}" y="${y + 10}" width="3" height="6" fill="#1565c0" />
      <rect x="${x + 3}" y="${y + 12}" width="2" height="4" fill="#0d47a1" />

      <!-- Scarlet Red Main Body -->
      <rect x="${x + 4}" y="${y + 5}" width="7" height="9" fill="#d32f2f" />
      <rect x="${x + 5}" y="${y + 6}" width="5" height="7" fill="#f44336" />

      <!-- Tri-color Wing (Red -> Yellow -> Blue) -->
      <rect x="${x + 2}" y="${y + 5}" width="4" height="${wingFlutter ? 7 : 8}" fill="#d32f2f" />
      <rect x="${x + 2}" y="${y + 7}" width="4" height="3" fill="#ffd600" />
      <rect x="${x + 2}" y="${y + 10}" width="4" height="3" fill="#1e88e5" />
      <rect x="${x + 3}" y="${y + 11}" width="2" height="2" fill="#0d47a1" />

      <!-- Head & Crown Crest -->
      <rect x="${x + 5}" y="${y - 3 + headBob}" width="2" height="3" fill="#b71c1c" />
      <rect x="${x + 6}" y="${y - 4 + headBob}" width="2" height="3" fill="#d32f2f" />
      <!-- Main Head block -->
      <rect x="${x + 5}" y="${y - 1 + headBob}" width="6" height="6" fill="#d32f2f" />

      <!-- White Eye Patch & Black Pupil with Catchlight -->
      <rect x="${x + 6}" y="${y + headBob}" width="3" height="3" fill="#ffffff" />
      <rect x="${x + 7}" y="${y + 1 + headBob}" width="1.5" height="1.5" fill="#212121" />
      <rect x="${x + 7}" y="${y + 1 + headBob}" width="0.8" height="0.8" fill="#ffffff" />

      <!-- Curved Gray/Black Beak -->
      <rect x="${x + 10}" y="${y + 1 + headBob}" width="3" height="3" fill="#616161" />
      <rect x="${x + 11}" y="${y + 2 + headBob}" width="2" height="3" fill="#212121" />
      <rect x="${x + 11}" y="${y + 4 + headBob}" width="1" height="1" fill="#212121" />

      <!-- Claws perching on lawn -->
      <rect x="${x + 6}" y="${y + 14}" width="2" height="2" fill="#424242" />
      <rect x="${x + 9}" y="${y + 14}" width="2" height="2" fill="#424242" />
    </g>
  `;
}

export function renderMinecraftCampfire(
  campfire: CampfirePos,
  frameIndex: number,
  totalFrames: number
): string {
  const { x, y } = campfire;

  // Staggered animated flickering flame heights
  const fMod = frameIndex % 4;
  const leftH = fMod === 0 ? 7 : fMod === 1 ? 5 : fMod === 2 ? 8 : 6;
  const midH = fMod === 0 ? 11 : fMod === 1 ? 13 : fMod === 2 ? 10 : 12;
  const rightH = fMod === 0 ? 6 : fMod === 1 ? 8 : fMod === 2 ? 5 : 7;

  // Rising organic smoke puffs
  let smokeSvg = "";
  for (let s = 0; s < 3; s++) {
    const cycle = totalFrames > 0 ? (frameIndex + s * 5) % totalFrames : 0;
    const progress = cycle / Math.max(1, totalFrames);
    const sY = y - 4 - progress * 28;
    const sX = x + 10 + Math.sin(progress * Math.PI * 2 + s * 1.5) * 4;
    const sSize = 2 + progress * 3;
    const sOpacity = (1 - progress) * 0.6;
    const sColor = s % 2 === 0 ? "#cfd8dc" : "#eceff1";

    smokeSvg += `<rect x="${sX.toFixed(1)}" y="${sY.toFixed(1)}" width="${sSize.toFixed(1)}" height="${sSize.toFixed(1)}" fill="${sColor}" opacity="${sOpacity.toFixed(2)}" />`;
  }

  // Floating spark embers
  const spark1Y = y - 4 - ((frameIndex * 2.5) % 16);
  const spark1X = x + 8 + ((frameIndex * 1.5) % 8);
  const spark2Y = y - 6 - (((frameIndex + 3) * 2) % 14);
  const spark2X = x + 13 - ((frameIndex * 1.2) % 6);

  return `
    <!-- Minecraft Roasting Campfire -->
    <g shape-rendering="crispEdges">
      <!-- Smoke Puffs -->
      ${smokeSvg}

      <!-- Crossed Oak Base Logs -->
      <!-- Bottom horizontal log -->
      <rect x="${x + 2}" y="${y + 12}" width="18" height="4" fill="#3e2723" />
      <rect x="${x + 3}" y="${y + 12}" width="16" height="2" fill="#5d4037" />
      <rect x="${x + 4}" y="${y + 12}" width="14" height="1" fill="#795548" />

      <!-- Cross angle logs -->
      <rect x="${x + 1}" y="${y + 8}" width="4" height="7" fill="#4e342e" />
      <rect x="${x + 17}" y="${y + 8}" width="4" height="7" fill="#4e342e" />
      <rect x="${x + 2}" y="${y + 9}" width="2" height="5" fill="#6d4934" />
      <rect x="${x + 18}" y="${y + 9}" width="2" height="5" fill="#6d4934" />

      <!-- Glowing Coals & Ash Core -->
      <rect x="${x + 5}" y="${y + 11}" width="12" height="4" fill="#1b120c" />
      <rect x="${x + 6}" y="${y + 11}" width="10" height="3" fill="#bf360c" />
      <rect x="${x + 8}" y="${y + 12}" width="6" height="2" fill="#ff3d00" />

      <!-- Left Flame Tongue -->
      <rect x="${x + 5}" y="${y + 12 - leftH}" width="3" height="${leftH}" fill="#ff3d00" />
      <rect x="${x + 5.5}" y="${y + 13 - leftH}" width="2" height="${leftH - 2}" fill="#ff9100" />
      <rect x="${x + 6}" y="${y + 14 - leftH}" width="1" height="${Math.max(1, leftH - 4)}" fill="#ffd600" />

      <!-- Center Main Flame Tongue (Tallest) -->
      <rect x="${x + 9}" y="${y + 12 - midH}" width="4" height="${midH}" fill="#ff3d00" />
      <rect x="${x + 9.5}" y="${y + 13 - midH}" width="3" height="${midH - 2}" fill="#ff9100" />
      <rect x="${x + 10}" y="${y + 14 - midH}" width="2" height="${midH - 4}" fill="#ffd600" />
      <rect x="${x + 10.5}" y="${y + 16 - midH}" width="1" height="${Math.max(1, midH - 7)}" fill="#ffffff" />

      <!-- Right Flame Tongue -->
      <rect x="${x + 14}" y="${y + 12 - rightH}" width="3" height="${rightH}" fill="#ff3d00" />
      <rect x="${x + 14.5}" y="${y + 13 - rightH}" width="2" height="${rightH - 2}" fill="#ff9100" />
      <rect x="${x + 15}" y="${y + 14 - rightH}" width="1" height="${Math.max(1, rightH - 4)}" fill="#ffd600" />

      <!-- Flying Spark Embers -->
      <rect x="${spark1X.toFixed(1)}" y="${spark1Y.toFixed(1)}" width="1.5" height="1.5" fill="#ffd600" opacity="0.85" />
      <rect x="${spark2X.toFixed(1)}" y="${spark2Y.toFixed(1)}" width="1.5" height="1.5" fill="#ffab00" opacity="0.75" />
    </g>
  `;
}

export function renderMinecraftChest(chest: ChestPos, frameIndex: number): string {
  const { x, y, type } = chest;
  const isEnder = type === "ender";
  const isDiamond = type === "diamond";
  const isGold = type === "gold";

  const p = CHEST_PALETTES[type] || CHEST_PALETTES.wood;

  // Latch rendering
  let latchSvg = "";
  if (isEnder) {
    // Authentic Eye of Ender center latch with turquoise/cyan iris and purple pupil slit
    latchSvg = `
      <!-- Eye of Ender Center Latch -->
      <rect x="${x + 6}" y="${y + 4}" width="6" height="5" fill="#060d0e" />
      <rect x="${x + 7}" y="${y + 4}" width="4" height="4" fill="#00e5ff" />
      <rect x="${x + 8}" y="${y + 4}" width="2" height="4" fill="#7c4dff" />
      <rect x="${x + 8.5}" y="${y + 5}" width="1" height="2" fill="#311b92" />
      <rect x="${x + 7}" y="${y + 4}" width="1" height="1" fill="#ffffff" />
    `;
  } else {
    latchSvg = `
      <!-- Center Lock Latch -->
      <rect x="${x + 7}" y="${y + 4}" width="4" height="5" fill="${p.latchBorder}" />
      <rect x="${x + 8}" y="${y + 5}" width="2" height="3" fill="${p.latchCore}" />
      <rect x="${x + 8}" y="${y + 5}" width="1" height="1" fill="${p.latchShine}" />
    `;
  }

  // Floating mystical portal particles for Ender Chest (amethyst purple & cyan embers)
  let particlesSvg = "";
  if (isEnder) {
    const p1Y = y - 2 - ((frameIndex * 2) % 12);
    const p1X = x + 4 + ((frameIndex * 1.5) % 10);
    const p2Y = y - 4 - (((frameIndex + 2) * 2) % 14);
    const p2X = x + 12 - ((frameIndex * 1.2) % 8);
    particlesSvg = `
      <!-- Ender Portal Particles -->
      <rect x="${p1X.toFixed(1)}" y="${p1Y.toFixed(1)}" width="2" height="2" fill="#b388ff" opacity="0.85" />
      <rect x="${p2X.toFixed(1)}" y="${p2Y.toFixed(1)}" width="2" height="2" fill="#00e5ff" opacity="0.75" />
    `;
  } else if ((isDiamond || isGold) && frameIndex % 4 === 0) {
    // Subtle specular glint dot on the metal corner for gold/diamond chests
    particlesSvg = `
      <rect x="${x + 14}" y="${y + 2}" width="1.5" height="1.5" fill="#ffffff" opacity="0.9" />
    `;
  }

  return `
    <!-- Minecraft ${type.toUpperCase()} Milestone Chest -->
    <g shape-rendering="crispEdges">
      ${particlesSvg}
      <!-- Chest Outer Shadow/Dark Border (Flush with ground: y to y+16) -->
      <rect x="${x}" y="${y}" width="18" height="16" fill="${p.shadow}" />
      
      <!-- Lid -->
      <rect x="${x + 2}" y="${y + 2}" width="14" height="4" fill="${p.body}" />
      <rect x="${x + 2}" y="${y + 2}" width="14" height="1" fill="${p.highlight}" />
      <!-- Lid Seam -->
      <rect x="${x + 1}" y="${y + 6}" width="16" height="1" fill="${p.seam}" />
      
      <!-- Body -->
      <rect x="${x + 2}" y="${y + 7}" width="14" height="7" fill="${p.body}" />
      <rect x="${x + 2}" y="${y + 7}" width="14" height="1" fill="${p.highlight}" />
      <rect x="${x + 2}" y="${y + 13}" width="14" height="1" fill="${p.shadow}" />
      
      <!-- Reinforced Metal Corner Brackets -->
      <rect x="${x}" y="${y}" width="3" height="3" fill="${p.shadow}" />
      <rect x="${x + 15}" y="${y}" width="3" height="3" fill="${p.shadow}" />
      <rect x="${x}" y="${y + 13}" width="3" height="3" fill="${p.shadow}" />
      <rect x="${x + 15}" y="${y + 13}" width="3" height="3" fill="${p.shadow}" />

      ${latchSvg}
    </g>
  `;
}

export function renderSeasonalJackOLantern(jack: JackOLanternPos, frameIndex: number): string {
  const { x, y } = jack;
  const flicker = frameIndex % 3 === 0;
  const flameColor = flicker ? "#fff176" : "#ffd54f";

  return `
    <!-- Seasonal Halloween Jack-o'-Lantern -->
    <g shape-rendering="crispEdges">
      <!-- Green Stem -->
      <rect x="${x + 8}" y="${y - 3}" width="3" height="4" fill="#558b2f" />

      <!-- Pumpkin Body (Flush with ground: y to y+16) -->
      <rect x="${x}" y="${y}" width="18" height="16" fill="#e65100" />
      <rect x="${x + 1}" y="${y + 1}" width="16" height="14" fill="#f57c00" />
      <!-- Ribs -->
      <rect x="${x + 5}" y="${y}" width="1" height="16" fill="#e65100" />
      <rect x="${x + 12}" y="${y}" width="1" height="16" fill="#e65100" />

      <!-- Carved Glowing Eyes -->
      <rect x="${x + 3}" y="${y + 4}" width="3" height="3" fill="#212121" />
      <rect x="${x + 4}" y="${y + 5}" width="2" height="2" fill="${flameColor}" />

      <rect x="${x + 12}" y="${y + 4}" width="3" height="3" fill="#212121" />
      <rect x="${x + 12}" y="${y + 5}" width="2" height="2" fill="${flameColor}" />

      <!-- Carved Nose -->
      <rect x="${x + 8}" y="${y + 7}" width="2" height="2" fill="${flameColor}" />

      <!-- Carved Grinning Tooth Mouth -->
      <rect x="${x + 4}" y="${y + 10}" width="10" height="3" fill="#212121" />
      <rect x="${x + 5}" y="${y + 11}" width="8" height="2" fill="${flameColor}" />
      <rect x="${x + 7}" y="${y + 10}" width="1" height="1" fill="#f57c00" />
      <rect x="${x + 10}" y="${y + 12}" width="1" height="1" fill="#f57c00" />
    </g>
  `;
}

export function renderHalloweenGhosts(
  jackX: number,
  jackY: number,
  frameIndex: number,
  totalFrames: number
): string {
  let ghostsSvg = "";
  const ghostCount = 3;

  for (let g = 0; g < ghostCount; g++) {
    const cycle = totalFrames > 0 ? (frameIndex + g * 5) % totalFrames : 0;
    const progress = cycle / Math.max(1, totalFrames);
    
    // Ghosts emerge and ascend from the jack-o'-lantern into the night sky
    const startX = jackX + 4 + g * 3;
    const startY = jackY - 6;
    const endY = startY - 80 - g * 30;
    
    const gy = startY - progress * (startY - endY);
    const sway = Math.sin(progress * Math.PI * 2 + g * 1.8) * (12 + g * 6);
    const gx = startX + sway;
    
    // Fade in as they emerge, fade out as they ascend
    const opacity = progress < 0.2 ? (progress / 0.2) * 0.85 : progress > 0.75 ? ((1 - progress) / 0.25) * 0.85 : 0.85;
    
    // Tail animation waving
    const tailWiggle = (frameIndex + g) % 2 === 0;

    ghostsSvg += `
      <!-- Floating Spooky Spirit Ghost -->
      <g shape-rendering="crispEdges">
        <!-- Ghost Aura Glow -->
        <rect x="${(gx - 1).toFixed(1)}" y="${(gy - 1).toFixed(1)}" width="10" height="11" fill="#e0f7fa" opacity="${(opacity * 0.25).toFixed(2)}" />
        
        <!-- Ghost Head & Body -->
        <rect x="${(gx + 2).toFixed(1)}" y="${gy.toFixed(1)}" width="4" height="2" fill="#ffffff" opacity="${opacity.toFixed(2)}" />
        <rect x="${gx.toFixed(1)}" y="${(gy + 2).toFixed(1)}" width="8" height="5" fill="#ffffff" opacity="${opacity.toFixed(2)}" />
        
        <!-- Waving Wispy Ghost Tails -->
        <rect x="${(gx + (tailWiggle ? 1 : 0)).toFixed(1)}" y="${(gy + 7).toFixed(1)}" width="2" height="${tailWiggle ? 2 : 3}" fill="#ffffff" opacity="${(opacity * 0.8).toFixed(2)}" />
        <rect x="${(gx + 3).toFixed(1)}" y="${(gy + 7).toFixed(1)}" width="2" height="${tailWiggle ? 3 : 2}" fill="#ffffff" opacity="${(opacity * 0.8).toFixed(2)}" />
        <rect x="${(gx + (tailWiggle ? 5 : 6)).toFixed(1)}" y="${(gy + 7).toFixed(1)}" width="2" height="${tailWiggle ? 2 : 3}" fill="#ffffff" opacity="${(opacity * 0.8).toFixed(2)}" />
        
        <!-- Cute Spooky Eyes with Cyan Pupil Glow -->
        <rect x="${(gx + 1.5).toFixed(1)}" y="${(gy + 3).toFixed(1)}" width="2" height="2" fill="#1a237e" opacity="${opacity.toFixed(2)}" />
        <rect x="${(gx + 4.5).toFixed(1)}" y="${(gy + 3).toFixed(1)}" width="2" height="2" fill="#1a237e" opacity="${opacity.toFixed(2)}" />
        <rect x="${(gx + 2).toFixed(1)}" y="${(gy + 3.5).toFixed(1)}" width="1" height="1" fill="#00e5ff" opacity="${opacity.toFixed(2)}" />
        <rect x="${(gx + 5).toFixed(1)}" y="${(gy + 3.5).toFixed(1)}" width="1" height="1" fill="#00e5ff" opacity="${opacity.toFixed(2)}" />
      </g>
    `;
  }

  return `<g shape-rendering="crispEdges"><!-- Flying Halloween Ghosts -->${ghostsSvg}</g>`;
}

export function renderSeasonalHolidayGifts(gifts: HolidayGiftPos[], _frameIndex: number): string {
  let res = "";
  for (const gift of gifts) {
    const { x, y, size, boxColor, ribbonColor } = gift;
    res += `
      <!-- Wrapped Gift Box -->
      <g shape-rendering="crispEdges">
        <rect x="${x}" y="${y}" width="${size}" height="${size}" fill="${boxColor}" />
        <!-- Vertical Ribbon -->
        <rect x="${x + Math.floor(size / 2) - 1}" y="${y}" width="2" height="${size}" fill="${ribbonColor}" />
        <!-- Horizontal Ribbon -->
        <rect x="${x}" y="${y + Math.floor(size / 2) - 1}" width="${size}" height="2" fill="${ribbonColor}" />
        <!-- Bow on top -->
        <rect x="${x + Math.floor(size / 2) - 2}" y="${y - 2}" width="4" height="2" fill="${ribbonColor}" />
      </g>
    `;
  }
  return res;
}

export function renderSeasonalFairyLights(leafBlocks: LeafBlockPos[], frameIndex: number): string {
  const lightColors = ["#f44336", "#4caf50", "#ffd600", "#00e5ff", "#e91e63", "#ff9800"];
  let res = "";

  leafBlocks.forEach((leaf, idx) => {
    // Place lights on outer edges of leaves
    if (leaf.gridY === -3 || leaf.gridX === -2 || leaf.gridX === 2 || leaf.gridY === 0) {
      const color = lightColors[(idx + frameIndex) % lightColors.length];
      const isLit = (frameIndex + idx) % 3 !== 0;
      if (isLit) {
        const lx = leaf.x + ((idx * 13) % (leaf.size - 6)) + 2;
        const ly = leaf.y + leaf.size - 4;
        res += `<rect x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" width="4" height="4" fill="${color}" opacity="0.95" />`;
        res += `<rect x="${(lx + 1).toFixed(1)}" y="${(ly + 1).toFixed(1)}" width="2" height="2" fill="#ffffff" />`;
      }
    }
  });

  return `<!-- Holiday Fairy String Lights --><g shape-rendering="crispEdges">${res}</g>`;
}
