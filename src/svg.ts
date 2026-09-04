import {
  TreeLayout,
  TreeType,
  LeafBlockPos,
  FlowerPos,
  ApplePos,
  GoldenApplePos,
  OreBlockPos,
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
    } else {
      const palette = ORE_PALETTES[ore.type] || ORE_PALETTES.diamond;
      const { gemColor, gemShine, gemShadow } = palette;
      const isLapis = ore.type === "lapis";

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
          ${isLapis ? `<rect x="${ore.x + 6}" y="${ore.y + 8}" width="2" height="2" fill="#ffd54f" />` : ""}
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

// 3x5 Pixel Font for Minecraft Signpost digits and 'd'
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
  "d": ["001", "001", "111", "101", "111"],
};

// 5x5 Star with dark outline and bright gold/white core (visible from far)
const STAR_5X5 = [
  "00100",
  "01210",
  "12321",
  "01210",
  "00100",
];
const STAR_PALETTE = [
  "",
  "#2d1b0d", // 1: Dark carved outline
  "#ffd600", // 2: Vibrant gold
  "#ffffff", // 3: Bright white sparkle
];

function renderMinecraftSignpost(
  x: number,
  y: number,
  streak: number
): string {
  const streakText = streak > 0 ? `${streak}d` : "0d";
  const boardWidth = 44;
  const boardHeight = 18;
  const ps = 1.6; // pixel size for glyphs

  // Compute total content width to center perfectly on the signboard
  const starWidth = 5 * ps;
  const gap = 3;
  const textWidth = streakText.length * (3 * ps + 1.5) - 1.5;
  const totalContentWidth = starWidth + gap + textWidth;
  const startX = Math.floor(x + (boardWidth - totalContentWidth) / 2);
  const textY = y + 5;

  let glyphsSvg = "";

  // 1. Render High-Contrast Star Icon
  let curX = startX;
  for (let r = 0; r < 5; r++) {
    const row = STAR_5X5[r];
    for (let c = 0; c < 5; c++) {
      const val = parseInt(row[c], 10);
      if (val > 0) {
        const color = STAR_PALETTE[val];
        glyphsSvg += `<rect x="${(curX + c * ps).toFixed(1)}" y="${(textY + r * ps).toFixed(1)}" width="${ps.toFixed(1)}" height="${ps.toFixed(1)}" fill="${color}" />`;
      }
    }
  }

  curX += starWidth + gap;

  // 2. Render digits + 'd' in dark carved wood brown
  for (let i = 0; i < streakText.length; i++) {
    const char = streakText[i];
    const matrix = PIXEL_FONT_3X5[char] || PIXEL_FONT_3X5["0"];
    for (let r = 0; r < 5; r++) {
      const row = matrix[r];
      for (let c = 0; c < 3; c++) {
        if (row[c] === "1") {
          glyphsSvg += `<rect x="${(curX + c * ps).toFixed(1)}" y="${(textY + r * ps).toFixed(1)}" width="${ps.toFixed(1)}" height="${ps.toFixed(1)}" fill="#2d1b0d" />`;
        }
      }
    }
    curX += 3 * ps + 1.5; // character spacing
  }

  return `
    <!-- Minecraft Wooden Stat Signpost -->
    <g shape-rendering="crispEdges">
      <!-- Wooden Post -->
      <rect x="${x + 20}" y="${y + boardHeight}" width="4" height="8" fill="#6d4934" />
      <!-- Wooden Signboard Frame -->
      <rect x="${x}" y="${y}" width="${boardWidth}" height="${boardHeight}" fill="#4a3020" />
      <rect x="${x + 1.5}" y="${y + 1.5}" width="${boardWidth - 3}" height="${boardHeight - 3}" fill="#c8963e" />
      <rect x="${x + 2.5}" y="${y + 2.5}" width="${boardWidth - 5}" height="1.5" fill="#dfad58" />
      <rect x="${x + 2.5}" y="${y + boardHeight - 3.5}" width="${boardWidth - 5}" height="1.5" fill="#9e6e22" />
      <!-- Carved Pixel Art Glyphs -->
      ${glyphsSvg}
    </g>
  `;
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

  // 2. Grass & Dirt Ground Layer (with embedded Diamond & Emerald Ore)
  const groundSvg = renderMinecraftGround(width, height, groundY, isSnow, oreBlocks || []);

  // 3. Wooden Stat Signpost
  let signpostSvg = "";
  if (signpost) {
    signpostSvg = renderMinecraftSignpost(signpost.x, signpost.y, signpost.streak);
  }

  // 4. Trunk
  const trunkSvg = trunkBlocks.map((b) => renderMinecraftLog(b.x, b.y, b.size, treeType)).join("\n");

  // 5. Beehive on Trunk
  let beehiveSvg = "";
  if (beehive) {
    beehiveSvg = renderMinecraftBeehive(beehive.x, beehive.y, beehive.side);
  }

  // 6. 14 Canopy Leaf Blocks
  const leavesSvg = leafBlocks
    .map((l) => renderMinecraftLeaf(l, frameIndex, totalFrames, isSnow, treeType))
    .join("\n");

  // 7. Red Apples
  const applesSvg = apples.map((a) => renderApple(a, frameIndex)).join("\n");

  // 8. Flowers on Grass
  const flowersSvg = flowers.map((f) => renderFlowerOnGrass(f, frameIndex)).join("\n");

  // 9. Golden Apples on Grass
  const goldenApplesSvg = (goldenApples || []).map((g) => renderGoldenAppleOnGrass(g, frameIndex)).join("\n");

  // 10. Flying Minecraft Bee (flies outside during fair weather, rests in hive during rain/snow)
  let beeSvg = "";
  if (bee && !isRain && !isSnow) {
    beeSvg = renderMinecraftBee(bee.x, bee.y, frameIndex, totalFrames);
  }

  // 11. Foreground Weather Precipitation or Sakura Petals (mutually exclusive to prevent particle overlap)
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
  ${trunkSvg}
  ${beehiveSvg}
  ${leavesSvg}
  ${applesSvg}
  ${goldenApplesSvg}
  ${flowersSvg}
  ${beeSvg}
  ${precipSvg}
</svg>`;
}
