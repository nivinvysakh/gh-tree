import {
  TreeLayout,
  TreeType,
  LeafBlockPos,
  FlowerPos,
  ApplePos,
  GoldenApplePos,
  OreBlockPos,
  PetPos,
  CampfirePos,
  ChestPos,
  HolidayGiftPos,
  JackOLanternPos,
} from "./tree";

// Seamless 16x16 Minecraft Log texture
const LOG_16X16 = [
  "2011003011003002",
  "2001103001103002",
  "2000103300103302",
  "2010003001003002",
  "2110033011003302",
  "2100330010033002",
  "2003300100330012",
  "2033001103300112",
  "2030011003001102",
  "2000110030011002",
  "2001100330011002",
  "2011003300110032",
  "2110033001100332",
  "2100330011003302",
  "2003300110033002",
  "2011003011003002",
];

const LOG_PALETTES: Record<TreeType, string[]> = {
  oak: [
    "#6d4934", // 0: Base wood brown
    "#4a3020", // 1: Dark bark fissure
    "#352015", // 2: Outer side bark edge
    "#8a5f43", // 3: Light bark vertical highlight
  ],
  sakura: [
    "#422927", // 0: Dark cherry wood
    "#2e1a19", // 1: Dark fissure
    "#201211", // 2: Bark edge
    "#593936", // 3: Cherry bark highlight
  ],
  spruce: [
    "#3b2716", // 0: Dark taiga wood
    "#26180c", // 1: Dark taiga fissure
    "#180f07", // 2: Outer edge
    "#4e3520", // 3: Light highlight
  ],
  birch: [
    "#e5e5e5", // 0: White birch bark
    "#303030", // 1: Dark horizontal notch
    "#1e1e1e", // 2: Dark notch edge
    "#ffffff", // 3: Bright white highlight
  ],
};

// Authentic 16x16 Minecraft Leaf texture
const LEAF_16X16 = [
  "2222222222222222",
  "2001100330011002",
  "2012210300122102",
  "2122221001222212",
  "2120021001200212",
  "2010010330100102",
  "2003300300033002",
  "2303001103030012",
  "2300012210000122",
  "2001122221011222",
  "2012220022122202",
  "2122000302220002",
  "2120033300200332",
  "2010330010103302",
  "2001100120011002",
  "2222222222222222",
];

const LEAF_PALETTES: Record<TreeType, string[][]> = {
  oak: [
    // Level 0: 0 commits (pale / dry dormant foliage)
    ["#8d7b68", "#6e5d4d", "#524437", "#a69581"],
    // Level 1: 1-4 commits (light lime yellow-green)
    ["#7ea349", "#648434", "#486221", "#9ec75a"],
    // Level 2: 5-14 commits (vibrant medium green)
    ["#489e3b", "#357e2b", "#235f1c", "#60ba52"],
    // Level 3: 15-29 commits (deep forest green)
    ["#2e7d32", "#1e5c22", "#134216", "#43a047"],
    // Level 4: 30+ commits (rich dark emerald green)
    ["#1a6b24", "#0f4e17", "#08350e", "#35b349"],
  ],
  sakura: [
    // Level 0: pale blossom bud
    ["#cbb5b0", "#a8908b", "#86706c", "#ded0cc"],
    // Level 1: soft pastel pink
    ["#ffb7c5", "#e598a8", "#b86b7c", "#ffd1dc"],
    // Level 2: vibrant cherry pink
    ["#ff758f", "#e6506d", "#b8304d", "#ff9ebb"],
    // Level 3: rich magenta sakura
    ["#ff4d6d", "#d92b4d", "#a81333", "#ff758f"],
    // Level 4: deep radiant blossom
    ["#c9184a", "#a00f36", "#700522", "#ff4d6d"],
  ],
  spruce: [
    // Level 0: dry taiga foliage
    ["#5e6856", "#454d3e", "#2f3629", "#788570"],
    // Level 1: spruce pine green
    ["#4f6e3c", "#3a542a", "#263c19", "#688c52"],
    // Level 2: deep evergreen
    ["#3d5e2e", "#2c461f", "#1b3012", "#527a3f"],
    // Level 3: dense taiga needles
    ["#2d4a22", "#1e3814", "#13260c", "#3f6331"],
    // Level 4: dark emerald taiga
    ["#1c3813", "#11260a", "#091705", "#2a4d1d"],
  ],
  birch: [
    // Level 0: dry birch
    ["#8f8668", "#6e664c", "#524b35", "#a89e80"],
    // Level 1: bright birch lime
    ["#9ec75a", "#7ea340", "#5b7a2b", "#b8de76"],
    // Level 2: lush birch yellow-green
    ["#7ca836", "#5d8225", "#425e17", "#97c449"],
    // Level 3: dense birch foliage
    ["#618a28", "#45661b", "#2d470e", "#7ca836"],
    // Level 4: rich emerald birch
    ["#476b1c", "#324f11", "#1e3308", "#5e8a26"],
  ],
};

function renderMinecraftSun(
  x: number,
  y: number,
  size: number,
  frameIndex: number,
  totalFrames: number
): string {
  const ps = size / 10;
  const shimmer = (frameIndex % Math.max(1, totalFrames)) < totalFrames / 2;
  const glow = shimmer ? 1.0 : 0.0;

  return `
    <!-- Minecraft Sun -->
    <g shape-rendering="crispEdges">
      <rect x="${(x - glow * 2).toFixed(1)}" y="${(y - glow * 2).toFixed(1)}" width="${(size + glow * 4).toFixed(1)}" height="${(size + glow * 4).toFixed(1)}" fill="#ffe082" opacity="${shimmer ? 0.35 : 0.2}" />
      <rect x="${(x + ps).toFixed(1)}" y="${(y + ps).toFixed(1)}" width="${(size - 2 * ps).toFixed(1)}" height="${(size - 2 * ps).toFixed(1)}" fill="#fbc02d" />
      <rect x="${(x + 2 * ps).toFixed(1)}" y="${(y + 2 * ps).toFixed(1)}" width="${(size - 4 * ps).toFixed(1)}" height="${(size - 4 * ps).toFixed(1)}" fill="#fff176" />
      <rect x="${(x + 3 * ps).toFixed(1)}" y="${(y + 3 * ps).toFixed(1)}" width="${(size - 6 * ps).toFixed(1)}" height="${(size - 6 * ps).toFixed(1)}" fill="#ffffff" />
    </g>
  `;
}

function renderMinecraftMoon(
  x: number,
  y: number,
  size: number,
  frameIndex: number,
  totalFrames: number
): string {
  const ps = size / 10;
  const shimmer = (frameIndex % Math.max(1, totalFrames)) < totalFrames / 2;
  const glow = shimmer ? 1.0 : 0.0;

  return `
    <!-- Minecraft Moon -->
    <g shape-rendering="crispEdges">
      <!-- Outer Soft Lunar Glow -->
      <rect x="${(x - glow * 2).toFixed(1)}" y="${(y - glow * 2).toFixed(1)}" width="${(size + glow * 4).toFixed(1)}" height="${(size + glow * 4).toFixed(1)}" fill="#e0f7fa" opacity="${shimmer ? 0.3 : 0.18}" />
      <!-- Outer Lunar Square Frame -->
      <rect x="${(x + ps).toFixed(1)}" y="${(y + ps).toFixed(1)}" width="${(size - 2 * ps).toFixed(1)}" height="${(size - 2 * ps).toFixed(1)}" fill="#cfd8dc" />
      <!-- Inner Bright Moon Face -->
      <rect x="${(x + 2 * ps).toFixed(1)}" y="${(y + 2 * ps).toFixed(1)}" width="${(size - 4 * ps).toFixed(1)}" height="${(size - 4 * ps).toFixed(1)}" fill="#ffffff" />
      <!-- Minecraft Lunar Craters / Maria -->
      <rect x="${(x + 3 * ps).toFixed(1)}" y="${(y + 3 * ps).toFixed(1)}" width="${(2 * ps).toFixed(1)}" height="${(2 * ps).toFixed(1)}" fill="#b0bec5" />
      <rect x="${(x + 6 * ps).toFixed(1)}" y="${(y + 5 * ps).toFixed(1)}" width="${(2 * ps).toFixed(1)}" height="${(2 * ps).toFixed(1)}" fill="#90a4ae" />
      <rect x="${(x + 4 * ps).toFixed(1)}" y="${(y + 6 * ps).toFixed(1)}" width="${(1.5 * ps).toFixed(1)}" height="${(1.5 * ps).toFixed(1)}" fill="#b0bec5" />
    </g>
  `;
}

function renderMinecraftStars(
  width: number,
  frameIndex: number
): string {
  const starCoords = [
    { x: 30, y: 15 },
    { x: 75, y: 42 },
    { x: 135, y: 20 },
    { x: 175, y: 48 },
    { x: 280, y: 18 },
    { x: 320, y: 38 },
    { x: 415, y: 12 },
    { x: 430, y: 55 },
  ];

  let rects = "";
  for (let i = 0; i < starCoords.length; i++) {
    const star = starCoords[i];
    const twinkle = (frameIndex + i * 2) % 4 === 0;
    const opacity = twinkle ? 0.95 : 0.4;
    const color = i % 3 === 0 ? "#fff9c4" : "#ffffff";
    const size = (i % 2 === 0 && twinkle) ? 2.5 : 2.0;

    rects += `<rect x="${star.x}" y="${star.y}" width="${size}" height="${size}" fill="${color}" opacity="${opacity}" />`;
  }

  return `<g shape-rendering="crispEdges">${rects}</g>`;
}

function renderMinecraftCloud(
  x: number,
  y: number,
  scale: number = 1.0,
  opacity: number = 0.85,
  isStorm: boolean = false
): string {
  const ps = 2.4 * scale;
  const bodyColor = isStorm ? "#90a4ae" : "#ffffff";
  const shadowColor = isStorm ? "#607d8b" : "#cfd8dc";
  const deepShadow = isStorm ? "#455a64" : "#b0bec5";

  return `
    <g shape-rendering="crispEdges" opacity="${opacity}">
      <rect x="${(x + 8 * ps).toFixed(1)}" y="${(y - 2 * ps).toFixed(1)}" width="${(8 * ps).toFixed(1)}" height="${(2 * ps).toFixed(1)}" fill="${bodyColor}" />
      <rect x="${(x + 4 * ps).toFixed(1)}" y="${y.toFixed(1)}" width="${(16 * ps).toFixed(1)}" height="${(3 * ps).toFixed(1)}" fill="${bodyColor}" />
      
      <rect x="${x.toFixed(1)}" y="${(y + 3 * ps).toFixed(1)}" width="${(24 * ps).toFixed(1)}" height="${(4 * ps).toFixed(1)}" fill="${bodyColor}" />
      <rect x="${(x + 2 * ps).toFixed(1)}" y="${(y + 1 * ps).toFixed(1)}" width="${(20 * ps).toFixed(1)}" height="${(2 * ps).toFixed(1)}" fill="${bodyColor}" />
      
      <rect x="${(x + 1 * ps).toFixed(1)}" y="${(y + 7 * ps).toFixed(1)}" width="${(22 * ps).toFixed(1)}" height="${(2 * ps).toFixed(1)}" fill="${shadowColor}" />
      <rect x="${(x + 3 * ps).toFixed(1)}" y="${(y + 9 * ps).toFixed(1)}" width="${(18 * ps).toFixed(1)}" height="${(1.5 * ps).toFixed(1)}" fill="${deepShadow}" />
    </g>
  `;
}

function renderSakuraPetals(
  width: number,
  groundY: number,
  frameIndex: number,
  totalFrames: number
): string {
  let rects = "";
  const petalCount = 18;
  const speed = 7;

  for (let i = 0; i < petalCount; i++) {
    const seedX = (i * 47 + 19) % width;
    const initialY = (i * 27) % (groundY - 15);
    const petalY = (initialY + frameIndex * speed) % (groundY - 5);
    const flutter = Math.sin((frameIndex + i) * 0.5) * 6;
    const petalX = (seedX + flutter + width) % width;
    const size = (i % 2 === 0) ? 3 : 2;
    const color = (i % 3 === 0) ? "#ff758f" : "#ffb7c5";

    rects += `<rect x="${petalX.toFixed(1)}" y="${petalY.toFixed(1)}" width="${size}" height="${size}" fill="${color}" opacity="0.85" />`;
  }

  return `<g shape-rendering="crispEdges">${rects}</g>`;
}

function renderRainStreaks(
  width: number,
  groundY: number,
  frameIndex: number,
  totalFrames: number
): string {
  let rects = "";
  const dropCount = 28;
  const speed = 26;

  for (let i = 0; i < dropCount; i++) {
    const seedX = (i * 37 + 13) % width;
    const initialY = (i * 23) % (groundY - 30);
    const dropY = (initialY + frameIndex * speed) % (groundY - 10);
    const dropX = (seedX - (dropY * 0.18) + width) % width; // Slanted fall

    const dropHeight = (i % 3 === 0) ? 10 : 7;
    const dropColor = (i % 2 === 0) ? "#64b5f6" : "#90caf9";

    rects += `<rect x="${dropX.toFixed(1)}" y="${dropY.toFixed(1)}" width="2" height="${dropHeight}" fill="${dropColor}" opacity="0.75" />`;

    // Splash on ground
    if (dropY > groundY - 18) {
      rects += `<rect x="${(dropX - 2).toFixed(1)}" y="${(groundY - 1).toFixed(1)}" width="4" height="1.5" fill="#e1f5fe" opacity="0.6" />`;
    }
  }

  return `<g shape-rendering="crispEdges">${rects}</g>`;
}

function renderSnowflakes(
  width: number,
  groundY: number,
  frameIndex: number,
  totalFrames: number
): string {
  let rects = "";
  const flakeCount = 32;
  const speed = 10;

  for (let i = 0; i < flakeCount; i++) {
    const seedX = (i * 41 + 17) % width;
    const initialY = (i * 29) % (groundY - 20);
    const flakeY = (initialY + frameIndex * speed) % (groundY - 5);
    
    // Fluttering horizontal wave
    const flutter = Math.sin((frameIndex + i) * 0.6) * 4;
    const flakeX = (seedX + flutter + width) % width;
    const size = (i % 3 === 0) ? 3 : 2;

    rects += `<rect x="${flakeX.toFixed(1)}" y="${flakeY.toFixed(1)}" width="${size}" height="${size}" fill="#ffffff" opacity="${(i % 2 === 0) ? 0.9 : 0.7}" />`;
  }

  return `<g shape-rendering="crispEdges">${rects}</g>`;
}

function renderMinecraftGround(
  width: number,
  height: number,
  groundY: number,
  isSnow: boolean = false,
  oreBlocks: OreBlockPos[] = []
): string {
  const grassHeight = 14;
  const grassColor = isSnow ? "#eceff1" : "#7cb342";
  const grassHighlight = isSnow ? "#ffffff" : "#8bc34a";
  const grassShadow = isSnow ? "#cfd8dc" : "#558b2f";

  const ORE_PALETTES: Record<string, { gemColor: string; gemShine: string; gemShadow: string }> = {
    diamond: { gemColor: "#00e5ff", gemShine: "#e0f7fa", gemShadow: "#0091ea" },
    emerald: { gemColor: "#00e676", gemShine: "#e8f5e9", gemShadow: "#00a152" },
    gold: { gemColor: "#ffd600", gemShine: "#fff9c4", gemShadow: "#ff8f00" },
    redstone: { gemColor: "#ff1744", gemShine: "#ff8a80", gemShadow: "#b71c1c" },
    lapis: { gemColor: "#1565c0", gemShine: "#42a5f5", gemShadow: "#0d47a1" },
  };

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
          <rect x="${ore.x}" y="${ore.y}" width="24" height="20" fill="#616161" />
          <rect x="${ore.x + 2}" y="${ore.y + 2}" width="20" height="16" fill="#757575" />
          <rect x="${ore.x + 4}" y="${ore.y + 4}" width="4" height="4" fill="${gemColor}" />
          <rect x="${ore.x + 5}" y="${ore.y + 5}" width="2" height="2" fill="${gemShine}" />
          <rect x="${ore.x + 14}" y="${ore.y + 6}" width="4" height="4" fill="${gemColor}" />
          <rect x="${ore.x + 15}" y="${ore.y + 7}" width="2" height="2" fill="${gemShadow}" />
          <rect x="${ore.x + 8}" y="${ore.y + 12}" width="5" height="4" fill="${gemColor}" />
          <rect x="${ore.x + 9}" y="${ore.y + 13}" width="2" height="2" fill="${gemShine}" />
        </g>
      `;
    }
  }

  return `
    <g shape-rendering="crispEdges">
      <rect x="0" y="${groundY}" width="${width}" height="${grassHeight}" fill="${grassColor}" />
      <rect x="0" y="${groundY}" width="${width}" height="3" fill="${grassHighlight}" />
      <rect x="0" y="${groundY + grassHeight - 2}" width="${width}" height="2" fill="${grassShadow}" />
      
      <rect x="0" y="${groundY + grassHeight}" width="${width}" height="${height - groundY - grassHeight}" fill="#5d4037" />
      <rect x="0" y="${groundY + grassHeight}" width="${width}" height="2" fill="#4e342e" />
      ${oresSvg}
    </g>
  `;
}

function renderMinecraftLog(
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

function renderMinecraftLeaf(
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

function renderFlowerOnGrass(flower: FlowerPos, frameIndex: number): string {
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

function renderApple(apple: ApplePos, frameIndex: number): string {
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

function renderGoldenAppleOnGrass(apple: GoldenApplePos, frameIndex: number): string {
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

function renderMinecraftBee(
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

function renderMinecraftBeehive(
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

function renderMinecraftSignpost(
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

  const boardWidth = 44;
  const boardHeight = 18;

  // Auto-scale pixel size and gaps so any text length fits centered with generous margin
  let ps = 1.6;
  let charGap = 1.5;
  let iconGap = 3;

  if (streakText.length >= 5) {
    ps = 1.15;
    charGap = 1.0;
    iconGap = 2;
  } else if (streakText.length === 4) {
    ps = 1.35;
    charGap = 1.2;
    iconGap = 2.5;
  }

  const isDiamond = streak >= 365;
  const isGold = streak >= 100 && !isDiamond;

  // Option 1: Upgraded Milestone Signpost Themes & Glyphs
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
  const startX = Math.floor(x + (boardWidth - totalContentWidth) / 2);
  const textY = y + (boardHeight - 5 * ps) / 2;

  let glyphsSvg = "";

  // 1. Render Icon (Star or Royal Crown)
  let curX = startX;
  for (let r = 0; r < 5; r++) {
    const row = iconMatrix[r];
    for (let c = 0; c < 5; c++) {
      const val = parseInt(row[c], 10);
      if (val > 0) {
        const color = iconPalette[val];
        glyphsSvg += `<rect x="${(curX + c * ps).toFixed(1)}" y="${(textY + r * ps).toFixed(1)}" width="${ps.toFixed(1)}" height="${ps.toFixed(1)}" fill="${color}" />`;
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
          glyphsSvg += `<rect x="${(curX + c * ps).toFixed(1)}" y="${(textY + r * ps).toFixed(1)}" width="${ps.toFixed(1)}" height="${ps.toFixed(1)}" fill="${textColor}" />`;
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

function renderMinecraftWolf(pet: PetPos, frameIndex: number): string {
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

function renderMinecraftFox(pet: PetPos, frameIndex: number, isNight: boolean): string {
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

function renderMinecraftCat(pet: PetPos, frameIndex: number): string {
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

function renderMinecraftCampfire(
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

function renderMinecraftChest(chest: ChestPos, frameIndex: number): string {
  const { x, y, type } = chest;
  const ps = 1.35;

  const CHEST_PALETTES: Record<string, { body: string; shadow: string; highlight: string; latch: string; latchH: string }> = {
    wood: { body: "#a66a38", shadow: "#422814", highlight: "#c68642", latch: "#ffd54f", latchH: "#ffffff" },
    iron: { body: "#b0bec5", shadow: "#37474f", highlight: "#eceff1", latch: "#78909c", latchH: "#ffffff" },
    gold: { body: "#ffd54f", shadow: "#ff8f00", highlight: "#fff9c4", latch: "#ff6f00", latchH: "#ffffff" },
    diamond: { body: "#00e5ff", shadow: "#0091ea", highlight: "#e0f7fa", latch: "#00b0ff", latchH: "#ffffff" },
    ender: { body: "#1a3636", shadow: "#091c1c", highlight: "#2d5a5a", latch: "#00e5ff", latchH: "#b388ff" },
  };

  const p = CHEST_PALETTES[type] || CHEST_PALETTES.wood;
  const glint = (type === "diamond" || type === "gold" || type === "ender") && frameIndex % 4 === 0;

  return `
    <!-- Minecraft ${type.toUpperCase()} Milestone Chest -->
    <g shape-rendering="crispEdges">
      <!-- Chest Outer Shadow/Dark Iron Border -->
      <rect x="${x}" y="${y}" width="${14 * ps}" height="${12 * ps}" fill="${p.shadow}" />
      
      <!-- Lid -->
      <rect x="${x + 1 * ps}" y="${y + 1 * ps}" width="${12 * ps}" height="${4 * ps}" fill="${p.body}" />
      <rect x="${x + 1 * ps}" y="${y + 1 * ps}" width="${12 * ps}" height="${1 * ps}" fill="${p.highlight}" />
      <!-- Lid Seam -->
      <rect x="${x}" y="${y + 5 * ps}" width="${14 * ps}" height="${1 * ps}" fill="${p.shadow}" />
      
      <!-- Body -->
      <rect x="${x + 1 * ps}" y="${y + 6 * ps}" width="${12 * ps}" height="${5 * ps}" fill="${p.body}" />
      <rect x="${x + 1 * ps}" y="${y + 6 * ps}" width="${12 * ps}" height="${1 * ps}" fill="${p.highlight}" />
      
      <!-- Metal Corner Brackets -->
      <rect x="${x}" y="${y}" width="${2 * ps}" height="${2 * ps}" fill="${p.shadow}" />
      <rect x="${x + 12 * ps}" y="${y}" width="${2 * ps}" height="${2 * ps}" fill="${p.shadow}" />
      <rect x="${x}" y="${y + 10 * ps}" width="${2 * ps}" height="${2 * ps}" fill="${p.shadow}" />
      <rect x="${x + 12 * ps}" y="${y + 10 * ps}" width="${2 * ps}" height="${2 * ps}" fill="${p.shadow}" />

      <!-- Center Lock Latch -->
      <rect x="${x + 5.5 * ps}" y="${y + 3.5 * ps}" width="${3 * ps}" height="${4 * ps}" fill="${p.latch}" />
      <rect x="${x + 6 * ps}" y="${y + 4.5 * ps}" width="${2 * ps}" height="${2 * ps}" fill="${p.latchH}" />

      ${glint ? `<rect x="${x + 2 * ps}" y="${y + 2 * ps}" width="${2 * ps}" height="${2 * ps}" fill="#ffffff" opacity="0.95" />` : ""}
    </g>
  `;
}

function renderSeasonalJackOLantern(jack: JackOLanternPos, frameIndex: number): string {
  const { x, y } = jack;
  const ps = 1.3;
  const flicker = frameIndex % 3 === 0;
  const flameColor = flicker ? "#fff176" : "#ffd54f";

  return `
    <!-- Seasonal Halloween Jack-o'-Lantern -->
    <g shape-rendering="crispEdges">
      <!-- Green Stem -->
      <rect x="${x + 6 * ps}" y="${y - 2 * ps}" width="${2 * ps}" height="${3 * ps}" fill="#558b2f" />

      <!-- Pumpkin Body -->
      <rect x="${x}" y="${y}" width="${14 * ps}" height="${12 * ps}" fill="#e65100" />
      <rect x="${x + 1 * ps}" y="${y + 1 * ps}" width="${12 * ps}" height="${10 * ps}" fill="#f57c00" />
      <!-- Ribs -->
      <rect x="${x + 4 * ps}" y="${y}" width="${1 * ps}" height="${12 * ps}" fill="#e65100" />
      <rect x="${x + 9 * ps}" y="${y}" width="${1 * ps}" height="${12 * ps}" fill="#e65100" />

      <!-- Carved Glowing Eyes -->
      <rect x="${x + 2.5 * ps}" y="${y + 3 * ps}" width="${2.5 * ps}" height="${2.5 * ps}" fill="#212121" />
      <rect x="${x + 3 * ps}" y="${y + 3.5 * ps}" width="${1.5 * ps}" height="${1.5 * ps}" fill="${flameColor}" />

      <rect x="${x + 9 * ps}" y="${y + 3 * ps}" width="${2.5 * ps}" height="${2.5 * ps}" fill="#212121" />
      <rect x="${x + 9.5 * ps}" y="${y + 3.5 * ps}" width="${1.5 * ps}" height="${1.5 * ps}" fill="${flameColor}" />

      <!-- Carved Nose -->
      <rect x="${x + 6 * ps}" y="${y + 5.5 * ps}" width="${2 * ps}" height="${1.5 * ps}" fill="${flameColor}" />

      <!-- Carved Grinning Tooth Mouth -->
      <rect x="${x + 3 * ps}" y="${y + 8 * ps}" width="${8 * ps}" height="${2.5 * ps}" fill="#212121" />
      <rect x="${x + 3.5 * ps}" y="${y + 8.5 * ps}" width="${7 * ps}" height="${1.5 * ps}" fill="${flameColor}" />
      <rect x="${x + 5 * ps}" y="${y + 8 * ps}" width="${1 * ps}" height="${1 * ps}" fill="#f57c00" />
      <rect x="${x + 8 * ps}" y="${y + 9 * ps}" width="${1 * ps}" height="${1 * ps}" fill="#f57c00" />
    </g>
  `;
}

function renderSeasonalHolidayGifts(gifts: HolidayGiftPos[], _frameIndex: number): string {
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

function renderSeasonalFairyLights(leafBlocks: LeafBlockPos[], frameIndex: number): string {
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

function renderSeasonalFireworks(
  width: number,
  height: number,
  frameIndex: number,
  totalFrames: number
): string {
  const bursts = [
    { cx: 85, cy: 55, color: "#00e5ff", core: "#ffffff", phase: 0 },
    { cx: 230, cy: 38, color: "#ffd600", core: "#fff9c4", phase: 6 },
    { cx: 375, cy: 62, color: "#ff4081", core: "#ffffff", phase: 12 },
  ];

  let res = "";
  for (const b of bursts) {
    const cycle = totalFrames > 0 ? (frameIndex + b.phase) % totalFrames : 0;
    const progress = cycle / Math.max(1, totalFrames);

    if (progress < 0.7) {
      const radius = progress * 24;
      const opacity = 1 - progress / 0.7;

      // Starburst sparks in 8 directions
      const sparkDirs = [
        { dx: 0, dy: -1 },
        { dx: 1, dy: -1 },
        { dx: 1, dy: 0 },
        { dx: 1, dy: 1 },
        { dx: 0, dy: 1 },
        { dx: -1, dy: 1 },
        { dx: -1, dy: 0 },
        { dx: -1, dy: -1 },
      ];

      for (const d of sparkDirs) {
        const sx = b.cx + d.dx * radius;
        const sy = b.cy + d.dy * radius + progress * progress * 6; // slight gravity drop
        res += `<rect x="${sx.toFixed(1)}" y="${sy.toFixed(1)}" width="2.5" height="2.5" fill="${b.color}" opacity="${opacity.toFixed(2)}" />`;
      }
      res += `<rect x="${b.cx - 1}" y="${b.cy - 1}" width="3" height="3" fill="${b.core}" opacity="${opacity.toFixed(2)}" />`;
    }
  }

  return `<!-- New Year Fireworks --><g shape-rendering="crispEdges">${res}</g>`;
}

export function renderFrame(
  layout: TreeLayout,
  frameIndex: number,
  totalFrames: number
): string {
  const {
    width,
    height,
    groundY,
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
    campfire,
    chest,
    seasonalEvent,
    holidayGifts,
    jackOLantern,
    weather,
  } = layout;

  const weatherType = weather?.type || "sunny";
  const isNight = weatherType === "night" || weather?.isDay === false;
  const isRain = weatherType === "rain";
  const isSnow = weatherType === "snow";
  const isCloudy = weatherType === "cloudy";
  const isSunny = weatherType === "sunny" && !isNight;

  const driftRatio = totalFrames > 0 ? frameIndex / totalFrames : 0;

  // 1. Sky & Atmosphere
  let skySvg = "";

  if (isNight) {
    // Night: Minecraft Moon + Twinkling Stars + Night Clouds
    const moonX = width - 82;
    const moonY = 18;
    const moonSize = 34;
    skySvg += renderMinecraftMoon(moonX, moonY, moonSize, frameIndex, totalFrames);
    skySvg += renderMinecraftStars(width, frameIndex);

    const cloud1X = 18 + Math.sin(driftRatio * Math.PI * 2) * 8;
    skySvg += renderMinecraftCloud(cloud1X, 32, 1.0, 0.65);
  } else if (isSunny) {
    // Day: Minecraft Sun + Daylight Cloud
    const sunX = width - 82;
    const sunY = 18;
    const sunSize = 34;
    skySvg += renderMinecraftSun(sunX, sunY, sunSize, frameIndex, totalFrames);

    const cloud1X = 18 + Math.sin(driftRatio * Math.PI * 2) * 8;
    skySvg += renderMinecraftCloud(cloud1X, 32, 1.0, 0.85);
  } else if (isCloudy) {
    const cloud1X = 14 + Math.sin(driftRatio * Math.PI * 2) * 10;
    const cloud2X = width - 120 - Math.sin(driftRatio * Math.PI * 2) * 8;
    const cloud3X = width / 2 - 30 + Math.cos(driftRatio * Math.PI * 2) * 6;
    skySvg += renderMinecraftCloud(cloud1X, 22, 1.1, 0.9);
    skySvg += renderMinecraftCloud(cloud2X, 38, 0.9, 0.85);
    skySvg += renderMinecraftCloud(cloud3X, 15, 0.8, 0.75);
  } else if (isRain) {
    // Storm clouds
    const stormCloud1X = 10 + Math.sin(driftRatio * Math.PI * 2) * 6;
    const stormCloud2X = width - 130 - Math.sin(driftRatio * Math.PI * 2) * 6;
    skySvg += renderMinecraftCloud(stormCloud1X, 16, 1.3, 0.95, true);
    skySvg += renderMinecraftCloud(stormCloud2X, 24, 1.2, 0.95, true);
  } else if (isSnow) {
    // Winter overcast clouds
    const snowCloud1X = 20 + Math.sin(driftRatio * Math.PI * 2) * 6;
    const snowCloud2X = width - 110 - Math.sin(driftRatio * Math.PI * 2) * 6;
    skySvg += renderMinecraftCloud(snowCloud1X, 22, 1.1, 0.9);
    skySvg += renderMinecraftCloud(snowCloud2X, 30, 0.9, 0.85);
  }

  // Fireworks in Sky (New Year Event)
  if (seasonalEvent === "fireworks") {
    skySvg += renderSeasonalFireworks(width, height, frameIndex, totalFrames);
  }

  // 2. Grass & Dirt Ground Layer (with embedded Diamond & Emerald Ore)
  const groundSvg = renderMinecraftGround(width, height, groundY, isSnow, oreBlocks || []);

  // 3. Wooden Stat Signpost
  let signpostSvg = "";
  if (signpost) {
    signpostSvg = renderMinecraftSignpost(signpost.x, signpost.y, signpost.streak);
  }

  // 4. Milestone Treasure Chest
  let chestSvg = "";
  if (chest) {
    chestSvg = renderMinecraftChest(chest, frameIndex);
  }

  // 5. Trunk
  const trunkSvg = trunkBlocks.map((b) => renderMinecraftLog(b.x, b.y, b.size, treeType)).join("\n");

  // 6. Beehive on Trunk
  let beehiveSvg = "";
  if (beehive) {
    beehiveSvg = renderMinecraftBeehive(beehive.x, beehive.y, beehive.side);
  }

  // 7. 14 Canopy Leaf Blocks
  const leavesSvg = leafBlocks
    .map((l) => renderMinecraftLeaf(l, frameIndex, totalFrames, isSnow, treeType))
    .join("\n");

  // 8. Holiday Fairy Lights (Canopy Overlay)
  let fairyLightsSvg = "";
  if (seasonalEvent === "holiday") {
    fairyLightsSvg = renderSeasonalFairyLights(leafBlocks, frameIndex);
  }

  // 9. Red Apples
  const applesSvg = apples.map((a) => renderApple(a, frameIndex)).join("\n");

  // 10. Flowers on Grass
  const flowersSvg = flowers.map((f) => renderFlowerOnGrass(f, frameIndex)).join("\n");

  // 11. Golden Apples on Grass
  const goldenApplesSvg = (goldenApples || []).map((g) => renderGoldenAppleOnGrass(g, frameIndex)).join("\n");

  // 12. Pet Companion (Wolf / Fox / Cat)
  let petSvg = "";
  if (pet) {
    if (pet.type === "wolf") {
      petSvg = renderMinecraftWolf(pet, frameIndex);
    } else if (pet.type === "fox") {
      petSvg = renderMinecraftFox(pet, frameIndex, isNight);
    } else if (pet.type === "cat") {
      petSvg = renderMinecraftCat(pet, frameIndex);
    }
  }

  // 13. Roasting Campfire
  let campfireSvg = "";
  if (campfire) {
    campfireSvg = renderMinecraftCampfire(campfire, frameIndex, totalFrames);
  }

  // 14. Halloween Jack-o'-Lantern
  let jackOLanternSvg = "";
  if (jackOLantern) {
    jackOLanternSvg = renderSeasonalJackOLantern(jackOLantern, frameIndex);
  }

  // 15. Holiday Gift Boxes
  let holidayGiftsSvg = "";
  if (holidayGifts && holidayGifts.length > 0) {
    holidayGiftsSvg = renderSeasonalHolidayGifts(holidayGifts, frameIndex);
  }

  // 16. Flying Minecraft Bee
  let beeSvg = "";
  if (bee && !isRain && !isSnow) {
    beeSvg = renderMinecraftBee(bee.x, bee.y, frameIndex, totalFrames);
  }

  // 17. Foreground Weather Precipitation or Sakura Petals
  let precipSvg = "";
  if (isRain) {
    precipSvg = renderRainStreaks(width, groundY, frameIndex, totalFrames);
  } else if (isSnow) {
    precipSvg = renderSnowflakes(width, groundY, frameIndex, totalFrames);
  } else if (treeType === "sakura") {
    precipSvg = renderSakuraPetals(width, groundY, frameIndex, totalFrames);
  }

  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  ${skySvg}
  ${groundSvg}
  ${signpostSvg}
  ${chestSvg}
  ${trunkSvg}
  ${beehiveSvg}
  ${leavesSvg}
  ${fairyLightsSvg}
  ${applesSvg}
  ${goldenApplesSvg}
  ${flowersSvg}
  ${petSvg}
  ${campfireSvg}
  ${jackOLanternSvg}
  ${holidayGiftsSvg}
  ${beeSvg}
  ${precipSvg}
</svg>`;
}
