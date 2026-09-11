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
  jungle: [
    "#564426", // 0: Jungle wood
    "#3d301b", // 1: Dark fissure
    "#271e11", // 2: Bark edge
    "#735a33", // 3: Warm highlight
  ],
  dark_oak: [
    "#302213", // 0: Dark oak chocolate
    "#21160b", // 1: Deep shadow
    "#140c05", // 2: Bark edge
    "#47331e", // 3: Rich brown highlight
  ],
  acacia: [
    "#686660", // 0: Weathered savanna gray
    "#4d4b47", // 1: Gray fissure
    "#33322f", // 2: Dark edge
    "#85827b", // 3: Light silver-gray
  ],
  mangrove: [
    "#542a22", // 0: Muddy red-brown
    "#3b1a14", // 1: Dark root fissure
    "#260e0a", // 2: Outer edge
    "#70392f", // 3: Reddish highlight
  ],
  crimson: [
    "#5c1827", // 0: Crimson hyphae
    "#400f1a", // 1: Dark vein
    "#29070f", // 2: Hyphae edge
    "#7d2437", // 3: Bright crimson highlight
  ],
  warped: [
    "#16615b", // 0: Warped hyphae
    "#0d4540", // 1: Dark teal vein
    "#062b28", // 2: Hyphae edge
    "#228079", // 3: Bright cyan-teal highlight
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
  jungle: [
    // Level 0: dormant jungle
    ["#6f7a59", "#535c43", "#3a412e", "#8b9970"],
    // Level 1: bright rainforest lime
    ["#5bb328", "#438a1b", "#2c6111", "#7ad143"],
    // Level 2: lush rainforest green
    ["#3ea118", "#2c7a10", "#1c5409", "#5ac72e"],
    // Level 3: rich canopy emerald
    ["#2d8a0f", "#1f6608", "#124204", "#43ab1f"],
    // Level 4: vivid jungle crown
    ["#1c7308", "#125204", "#083301", "#329415"],
  ],
  dark_oak: [
    // Level 0: dormant dark oak
    ["#596350", "#3f4738", "#292e24", "#748268"],
    // Level 1: deep roofed forest green
    ["#3f6b28", "#2b4f1b", "#1a360f", "#568f39"],
    // Level 2: dense shaded green
    ["#2d571a", "#1d3d0f", "#102608", "#437829"],
    // Level 3: rich dark canopy
    ["#1e4210", "#122c09", "#081b04", "#30611c"],
    // Level 4: midnight forest emerald
    ["#113008", "#091f04", "#031201", "#204a11"],
  ],
  acacia: [
    // Level 0: dormant savanna
    ["#8f7d63", "#6e5e47", "#4f4230", "#ad9779"],
    // Level 1: savanna yellow-olive
    ["#a39b37", "#807a27", "#5c5719", "#c4bc49"],
    // Level 2: golden savanna leaf
    ["#b5892b", "#8f691d", "#694c12", "#d4a43d"],
    // Level 3: warm amber canopy
    ["#b87428", "#91571b", "#6b3d0f", "#d98f38"],
    // Level 4: fiery sunset acacia
    ["#b35822", "#8c4015", "#632a0b", "#d47131"],
  ],
  mangrove: [
    // Level 0: dormant mangrove
    ["#637059", "#495441", "#313b2a", "#7e8f72"],
    // Level 1: swamp moss green
    ["#6ba83b", "#518529", "#37611a", "#87c752"],
    // Level 2: lush mangrove leaf
    ["#53962b", "#3c751c", "#275411", "#6eb53e"],
    // Level 3: deep swamp canopy
    ["#3d801d", "#296111", "#174209", "#569e2e"],
    // Level 4: vibrant bayou green
    ["#2a6912", "#1a4d0a", "#0d3304", "#3f8220"],
  ],
  crimson: [
    // Level 0: dormant crimson wart
    ["#69222c", "#4d151d", "#330b11", "#87303d"],
    // Level 1: nether crimson red
    ["#9e1b2f", "#781020", "#540714", "#c42d45"],
    // Level 2: vibrant crimson wart
    ["#bd1e37", "#941228", "#6b081a", "#de334f"],
    // Level 3: rich glowing crimson
    ["#db1f3d", "#b0122c", "#85071e", "#f53857"],
    // Level 4: radiant Nether flame
    ["#ff2a4d", "#d11535", "#a10a24", "#ff5c77"],
  ],
  warped: [
    // Level 0: dormant warped wart
    ["#204d4a", "#143634", "#0a2120", "#316663"],
    // Level 1: warped forest teal
    ["#137871", "#0b5752", "#053835", "#209c93"],
    // Level 2: vibrant warped cyan
    ["#129c93", "#0a736c", "#054d48", "#22c4ba"],
    // Level 3: rich glowing warped
    ["#14b8ae", "#0c8c84", "#065e59", "#2de0d4"],
    // Level 4: radiant Nether aurora
    ["#17ded2", "#10aba2", "#08736d", "#4af5ea"],
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
    { x: 25, y: 12, s: 2.0 },
    { x: 55, y: 35, s: 1.5 },
    { x: 80, y: 18, s: 2.5 },
    { x: 120, y: 48, s: 1.5 },
    { x: 145, y: 15, s: 2.0 },
    { x: 185, y: 38, s: 2.5 },
    { x: 220, y: 22, s: 1.5 },
    { x: 260, y: 45, s: 2.0 },
    { x: 295, y: 14, s: 2.5 },
    { x: 330, y: 40, s: 1.5 },
    { x: 365, y: 25, s: 2.0 },
    { x: 400, y: 10, s: 2.5 },
    { x: 425, y: 35, s: 1.5 },
    { x: 445, y: 55, s: 2.0 },
  ];

  let rects = "";
  for (let i = 0; i < starCoords.length; i++) {
    const star = starCoords[i];
    const twinkle = (frameIndex + i * 2) % 4 === 0;
    const opacity = twinkle ? 0.95 : 0.35;
    const color = i % 4 === 0 ? "#fff9c4" : i % 4 === 1 ? "#e0f7fa" : "#ffffff";
    const size = (i % 2 === 0 && twinkle) ? star.s + 0.5 : star.s;

    rects += `<rect x="${star.x}" y="${star.y}" width="${size.toFixed(1)}" height="${size.toFixed(1)}" fill="${color}" opacity="${opacity}" />`;
  }

  return `<g shape-rendering="crispEdges"><!-- Twinkling Star Field -->${rects}</g>`;
}

function renderBioluminescentParticles(
  width: number,
  groundY: number,
  frameIndex: number,
  totalFrames: number,
  treeType: TreeType
): string {
  let rects = "";
  const count = 14;
  const isCrimson = treeType === "crimson";
  const isWarped = treeType === "warped";
  const color1 = isCrimson ? "#ff5252" : isWarped ? "#00e5ff" : "#ffd54f";
  const color2 = isCrimson ? "#ff8a80" : isWarped ? "#80d8ff" : "#fff59d";

  for (let i = 0; i < count; i++) {
    const seedX = (i * 33 + 19) % width;
    const rise = ((frameIndex * 3 + i * 11) % (groundY - 50));
    const py = groundY - 15 - rise;
    const sway = Math.sin((frameIndex + i) * 0.45) * 6;
    const px = (seedX + sway + width) % width;
    const pulse = (frameIndex + i) % 3 === 0;
    const opacity = pulse ? 0.85 : 0.4;
    const color = i % 2 === 0 ? color1 : color2;

    rects += `<rect x="${px.toFixed(1)}" y="${py.toFixed(1)}" width="2" height="2" fill="${color}" opacity="${opacity}" />`;
    if (pulse) {
      rects += `<rect x="${(px - 1).toFixed(1)}" y="${(py - 1).toFixed(1)}" width="4" height="4" fill="${color}" opacity="0.2" />`;
    }
  }

  return `<g shape-rendering="crispEdges"><!-- Spores / Fireflies -->${rects}</g>`;
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

interface BiomeTerrainPalette {
  grassTop: string;
  grassHighlight: string;
  grassShadow: string;
  dirtBase: string;
  dirtDark: string;
  dirtLight: string;
  pebbleColor: string;
}

const BIOME_TERRAINS: Record<TreeType, BiomeTerrainPalette> = {
  oak: {
    grassTop: "#7cb342",
    grassHighlight: "#8bc34a",
    grassShadow: "#558b2f",
    dirtBase: "#5d4037",
    dirtDark: "#3e2723",
    dirtLight: "#6d4c41",
    pebbleColor: "#757575",
  },
  sakura: {
    grassTop: "#8bc34a",
    grassHighlight: "#aed581",
    grassShadow: "#689f38",
    dirtBase: "#4e342e",
    dirtDark: "#3e2723",
    dirtLight: "#5d4037",
    pebbleColor: "#8d6e63",
  },
  spruce: {
    grassTop: "#558b2f",
    grassHighlight: "#689f38",
    grassShadow: "#33691e",
    dirtBase: "#3e2723",
    dirtDark: "#27160c",
    dirtLight: "#4e342e",
    pebbleColor: "#616161",
  },
  birch: {
    grassTop: "#8bc34a",
    grassHighlight: "#9ccc65",
    grassShadow: "#689f38",
    dirtBase: "#5d4037",
    dirtDark: "#3e2723",
    dirtLight: "#6d4c41",
    pebbleColor: "#757575",
  },
  jungle: {
    grassTop: "#43a047",
    grassHighlight: "#66bb6a",
    grassShadow: "#2e7d32",
    dirtBase: "#4e342e",
    dirtDark: "#3e2723",
    dirtLight: "#5d4037",
    pebbleColor: "#757575",
  },
  dark_oak: {
    grassTop: "#33691e",
    grassHighlight: "#438228",
    grassShadow: "#1b430e",
    dirtBase: "#3e2723",
    dirtDark: "#27160c",
    dirtLight: "#4e342e",
    pebbleColor: "#616161",
  },
  acacia: {
    grassTop: "#9e9d24",
    grassHighlight: "#c0ca33",
    grassShadow: "#827717",
    dirtBase: "#5d4037",
    dirtDark: "#3e2723",
    dirtLight: "#6d4c41",
    pebbleColor: "#8d6e63",
  },
  mangrove: {
    grassTop: "#689f38",
    grassHighlight: "#8bc34a",
    grassShadow: "#33691e",
    dirtBase: "#3e2723",
    dirtDark: "#28170d",
    dirtLight: "#4e342e",
    pebbleColor: "#757575",
  },
  crimson: {
    grassTop: "#9e1b2f",
    grassHighlight: "#c42d45",
    grassShadow: "#781020",
    dirtBase: "#4a1018",
    dirtDark: "#30080f",
    dirtLight: "#611621",
    pebbleColor: "#29050b",
  },
  warped: {
    grassTop: "#137871",
    grassHighlight: "#209c93",
    grassShadow: "#0b5752",
    dirtBase: "#0d2b28",
    dirtDark: "#061f1c",
    dirtLight: "#143d39",
    pebbleColor: "#051715",
  },
};

function renderMinecraftGround(
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

  // Authentic Minecraft side grass tuft fringe drops
  let fringeSvg = "";
  const tuftPattern = [3, 6, 2, 5, 2, 7, 3, 5, 2, 6, 3, 4];
  const step = 6;
  for (let fx = 0; fx < width; fx += step) {
    const pIdx = Math.floor(fx / step) % tuftPattern.length;
    const dropH = tuftPattern[pIdx];
    fringeSvg += `<rect x="${fx}" y="${groundY + grassHeight}" width="${step}" height="${dropH}" fill="${grassColor}" />`;
    if (dropH >= 5) {
      fringeSvg += `<rect x="${fx + 1}" y="${groundY + grassHeight + dropH - 2}" width="${step - 2}" height="2" fill="${grassShadow}" />`;
    }
  }

  // Textured dirt specks and root pebbles
  let dirtSpecksSvg = "";
  const dirtSlots = [
    { x: 52, y: groundY + grassHeight + 7, w: 4, h: 3, c: dirtDark },
    { x: 108, y: groundY + grassHeight + 17, w: 5, h: 3, c: pebbleColor },
    { x: 164, y: groundY + grassHeight + 9, w: 4, h: 4, c: dirtLight },
    { x: 208, y: groundY + grassHeight + 20, w: 6, h: 3, c: dirtDark },
    { x: 258, y: groundY + grassHeight + 8, w: 4, h: 3, c: pebbleColor },
    { x: 318, y: groundY + grassHeight + 19, w: 5, h: 4, c: dirtLight },
    { x: 372, y: groundY + grassHeight + 11, w: 4, h: 3, c: dirtDark },
    { x: 422, y: groundY + grassHeight + 22, w: 5, h: 3, c: pebbleColor },
  ];
  for (const s of dirtSlots) {
    dirtSpecksSvg += `<rect x="${s.x}" y="${s.y}" width="${s.w}" height="${s.h}" fill="${s.c}" />`;
  }

  return `
    <g shape-rendering="crispEdges">
      <!-- Main Grass Bed -->
      <rect x="0" y="${groundY}" width="${width}" height="${grassHeight}" fill="${grassColor}" />
      <rect x="0" y="${groundY}" width="${width}" height="3" fill="${grassHighlight}" />
      <rect x="0" y="${groundY + grassHeight - 2}" width="${width}" height="2" fill="${grassShadow}" />
      
      <!-- Dirt Stratum -->
      <rect x="0" y="${groundY + grassHeight}" width="${width}" height="${height - groundY - grassHeight}" fill="${dirtBase}" />
      <rect x="0" y="${groundY + grassHeight}" width="${width}" height="2" fill="${dirtDark}" />
      
      <!-- Minecraft Side Grass Fringe & Dirt Texture -->
      ${fringeSvg}
      ${dirtSpecksSvg}
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

function renderMinecraftParrot(pet: PetPos, frameIndex: number): string {
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
  const isEnder = type === "ender";
  const isDiamond = type === "diamond";
  const isGold = type === "gold";

  const CHEST_PALETTES: Record<string, { body: string; shadow: string; highlight: string; seam: string; latchBorder: string; latchCore: string; latchShine: string }> = {
    wood: { body: "#a66a38", shadow: "#422814", highlight: "#c68642", seam: "#321d0d", latchBorder: "#263238", latchCore: "#ffd54f", latchShine: "#ffffff" },
    iron: { body: "#b0bec5", shadow: "#37474f", highlight: "#eceff1", seam: "#263238", latchBorder: "#263238", latchCore: "#eceff1", latchShine: "#ffffff" },
    gold: { body: "#ffd54f", shadow: "#bf360c", highlight: "#fff9c4", seam: "#e65100", latchBorder: "#bf360c", latchCore: "#fff9c4", latchShine: "#ffffff" },
    diamond: { body: "#00e5ff", shadow: "#006064", highlight: "#e0f7fa", seam: "#00838f", latchBorder: "#006064", latchCore: "#e0f7fa", latchShine: "#ffffff" },
    ender: { body: "#1a3636", shadow: "#091c1c", highlight: "#2d5a5a", seam: "#061313", latchBorder: "#060d0e", latchCore: "#00e5ff", latchShine: "#ffffff" },
  };

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

function renderSeasonalJackOLantern(jack: JackOLanternPos, frameIndex: number): string {
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

function renderHalloweenGhosts(
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

  // 2. Grass & Dirt Ground Layer (with embedded Diamond & Emerald Ore & Biome Styling)
  const groundSvg = renderMinecraftGround(width, height, groundY, isSnow, oreBlocks || [], treeType);

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
    } else if (pet.type === "parrot") {
      petSvg = renderMinecraftParrot(pet, frameIndex);
    }
  }

  // 13. Roasting Campfire
  let campfireSvg = "";
  if (campfire) {
    campfireSvg = renderMinecraftCampfire(campfire, frameIndex, totalFrames);
  }

  // 14. Halloween Jack-o'-Lantern & Flying Ghosts
  let jackOLanternSvg = "";
  let ghostsSvg = "";
  if (jackOLantern) {
    jackOLanternSvg = renderSeasonalJackOLantern(jackOLantern, frameIndex);
    ghostsSvg = renderHalloweenGhosts(jackOLantern.x, jackOLantern.y, frameIndex, totalFrames);
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

  // 17. Ambient Bioluminescent Spores / Particles (Nether & Night Biomes)
  let sporesSvg = "";
  if (treeType === "crimson" || treeType === "warped" || (isNight && !isRain && !isSnow)) {
    sporesSvg = renderBioluminescentParticles(width, groundY, frameIndex, totalFrames, treeType);
  }

  // 18. Foreground Weather Precipitation or Sakura Petals
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
  ${ghostsSvg}
  ${holidayGiftsSvg}
  ${beeSvg}
  ${sporesSvg}
  ${precipSvg}
</svg>`;
}

export const generateSvg = renderFrame;
