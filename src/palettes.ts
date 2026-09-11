import { TreeType } from "./tree";

// Seamless 16x16 Minecraft Log texture index map
export const LOG_16X16 = [
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

export const LOG_PALETTES: Record<TreeType, string[]> = {
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

// Authentic 16x16 Minecraft Leaf texture index map
export const LEAF_16X16 = [
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

export const LEAF_PALETTES: Record<TreeType, string[][]> = {
  oak: [
    ["#8d7b68", "#6e5d4d", "#524437", "#a69581"], // Level 0: dormant dry foliage
    ["#7ea349", "#648434", "#486221", "#9ec75a"], // Level 1: light lime green
    ["#489e3b", "#357e2b", "#235f1c", "#60ba52"], // Level 2: vibrant medium green
    ["#2e7d32", "#1e5c22", "#134216", "#43a047"], // Level 3: deep forest green
    ["#1a6b24", "#0f4e17", "#08350e", "#35b349"], // Level 4: rich dark emerald
  ],
  sakura: [
    ["#cbb5b0", "#a8908b", "#86706c", "#ded0cc"], // Level 0: pale blossom bud
    ["#ffb7c5", "#e598a8", "#b86b7c", "#ffd1dc"], // Level 1: soft pastel pink
    ["#ff758f", "#e6506d", "#b8304d", "#ff9ebb"], // Level 2: vibrant cherry pink
    ["#ff4d6d", "#d92b4d", "#a81333", "#ff758f"], // Level 3: rich magenta sakura
    ["#c9184a", "#a01035", "#700820", "#ff4d6d"], // Level 4: deep glowing ruby sakura
  ],
  spruce: [
    ["#787a6e", "#5c5e53", "#43453b", "#919485"], // Level 0: dormant winter pine
    ["#5b7f52", "#45633d", "#304929", "#729e67"], // Level 1: muted spruce needle
    ["#3d6b38", "#2c5227", "#1c3b18", "#50874a"], // Level 2: deep taiga green
    ["#285427", "#1a3d19", "#0f290e", "#386b36"], // Level 3: dark alpine pine
    ["#1a431c", "#0f2f11", "#071e08", "#275c2a"], // Level 4: shadow coniferous pine
  ],
  birch: [
    ["#91876b", "#736b53", "#57503c", "#ada282"], // Level 0: dormant pale birch
    ["#b5bd4c", "#949c37", "#737a24", "#d1da5c"], // Level 1: golden spring birch
    ["#8da832", "#708722", "#546614", "#a8c73e"], // Level 2: chartreuse birch
    ["#6e8f24", "#546e16", "#3d520d", "#87ad30"], // Level 3: radiant sunlit birch
    ["#507a16", "#3a5c0b", "#274004", "#669c20"], // Level 4: rich autumn golden olive
  ],
  jungle: [
    ["#7c7b5b", "#616044", "#47462f", "#969571"], // Level 0: dormant vine
    ["#6cb839", "#539127", "#3c6b19", "#85de49"], // Level 1: tropical lime
    ["#45a828", "#32851b", "#216310", "#5ecc3e"], // Level 2: lush rainforest
    ["#2e8f1c", "#1f6e11", "#124f09", "#43b32b"], // Level 3: deep jungle emerald
    ["#1c7308", "#115403", "#083b00", "#2dc414"], // Level 4: radiant emerald canopy
  ],
  dark_oak: [
    ["#635a4d", "#4a4236", "#332c22", "#7d7263"], // Level 0: dry shadow
    ["#4c6e28", "#38521b", "#253810", "#638f36"], // Level 1: dense foliage
    ["#335417", "#233d0d", "#152906", "#467022"], // Level 2: deep dark forest
    ["#203d0c", "#142905", "#0a1c02", "#2f5714"], // Level 3: dark canopy
    ["#113008", "#092103", "#031401", "#1d4710"], // Level 4: deep shadow canopy
  ],
  acacia: [
    ["#8c7b64", "#6e5f4b", "#524534", "#a8957c"], // Level 0: dry savanna
    ["#c4973b", "#9c7629", "#75561a", "#e6b44c"], // Level 1: golden savanna
    ["#c47d27", "#9c601b", "#754511", "#e69733"], // Level 2: amber acacia
    ["#b87428", "#91571b", "#6b3d0f", "#d98f38"], // Level 3: deep sunset amber
    ["#b35822", "#8c4015", "#632a0b", "#d47131"], // Level 4: fiery sunset acacia
  ],
  mangrove: [
    ["#637059", "#495441", "#313b2a", "#7e8f72"], // Level 0: dormant mangrove
    ["#6ba83b", "#518529", "#37611a", "#87c752"], // Level 1: swamp moss green
    ["#53962b", "#3c751c", "#275411", "#6eb53e"], // Level 2: lush mangrove leaf
    ["#3d801d", "#296111", "#174209", "#569e2e"], // Level 3: deep swamp canopy
    ["#2a6912", "#1a4d0a", "#0d3304", "#3f8220"], // Level 4: vibrant bayou green
  ],
  crimson: [
    ["#69222c", "#4d151d", "#330b11", "#87303d"], // Level 0: dormant crimson wart
    ["#9e1b2f", "#781020", "#540714", "#c42d45"], // Level 1: nether crimson red
    ["#bd1e37", "#941228", "#6b081a", "#de334f"], // Level 2: vibrant crimson wart
    ["#db1f3d", "#b0122c", "#85071e", "#f53857"], // Level 3: rich glowing crimson
    ["#ff2a4d", "#d11535", "#a10a24", "#ff5c77"], // Level 4: radiant Nether flame
  ],
  warped: [
    ["#204d4a", "#143634", "#0a2120", "#316663"], // Level 0: dormant warped wart
    ["#137871", "#0b5752", "#053835", "#209c93"], // Level 1: warped forest teal
    ["#129c93", "#0a736c", "#054d48", "#22c4ba"], // Level 2: vibrant warped cyan
    ["#14b8ae", "#0c8c84", "#065e59", "#2de0d4"], // Level 3: rich glowing warped
    ["#17ded2", "#10aba2", "#08736d", "#4af5ea"], // Level 4: radiant Nether aurora
  ],
};

export interface BiomeTerrainPalette {
  grassTop: string;
  grassHighlight: string;
  grassShadow: string;
  dirtBase: string;
  dirtDark: string;
  dirtLight: string;
  pebbleColor: string;
}

export const BIOME_TERRAINS: Record<TreeType, BiomeTerrainPalette> = {
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
    grassTop: "#9e1b2f", // Crimson Nylium
    grassHighlight: "#bd1e37",
    grassShadow: "#69222c",
    dirtBase: "#3a131b", // Netherrack base
    dirtDark: "#240a10",
    dirtLight: "#4d1b24",
    pebbleColor: "#ff5252",
  },
  warped: {
    grassTop: "#129c93", // Warped Nylium
    grassHighlight: "#17ded2",
    grassShadow: "#0b5752",
    dirtBase: "#102e2b", // Warped netherrack
    dirtDark: "#081d1b",
    dirtLight: "#18423e",
    pebbleColor: "#1de9b6",
  },
};

export const ORE_PALETTES: Record<string, { gemColor: string; gemShine: string; gemShadow: string }> = {
  diamond: { gemColor: "#00e5ff", gemShine: "#e0f7fa", gemShadow: "#0091ea" },
  emerald: { gemColor: "#00e676", gemShine: "#e8f5e9", gemShadow: "#00a152" },
  gold: { gemColor: "#ffd600", gemShine: "#fff9c4", gemShadow: "#ff8f00" },
  redstone: { gemColor: "#ff1744", gemShine: "#ff8a80", gemShadow: "#b71c1c" },
  lapis: { gemColor: "#1565c0", gemShine: "#42a5f5", gemShadow: "#0d47a1" },
};

export const CHEST_PALETTES: Record<
  string,
  { body: string; shadow: string; highlight: string; seam: string; latchBorder: string; latchCore: string; latchShine: string }
> = {
  wood: {
    body: "#a66a38",
    shadow: "#422814",
    highlight: "#c68642",
    seam: "#321d0d",
    latchBorder: "#263238",
    latchCore: "#ffd54f",
    latchShine: "#ffffff",
  },
  iron: {
    body: "#b0bec5",
    shadow: "#37474f",
    highlight: "#eceff1",
    seam: "#263238",
    latchBorder: "#263238",
    latchCore: "#eceff1",
    latchShine: "#ffffff",
  },
  gold: {
    body: "#ffd54f",
    shadow: "#bf360c",
    highlight: "#fff9c4",
    seam: "#e65100",
    latchBorder: "#bf360c",
    latchCore: "#fff9c4",
    latchShine: "#ffffff",
  },
  diamond: {
    body: "#00e5ff",
    shadow: "#006064",
    highlight: "#e0f7fa",
    seam: "#00838f",
    latchBorder: "#006064",
    latchCore: "#e0f7fa",
    latchShine: "#ffffff",
  },
  ender: {
    body: "#1a3636",
    shadow: "#091c1c",
    highlight: "#2d5a5a",
    seam: "#061313",
    latchBorder: "#060d0e",
    latchCore: "#00e5ff",
    latchShine: "#ffffff",
  },
};

export const FONT_5X5_GLYPHS: Record<string, string[]> = {
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
  "k": ["101", "110", "100", "110", "101"],
  "d": ["110", "101", "101", "101", "110"],
  "+": ["000", "010", "111", "010", "000"],
  "-": ["000", "000", "111", "000", "000"],
  " ": ["000", "000", "000", "000", "000"],
};
