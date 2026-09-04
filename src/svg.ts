import { TreeLayout, LeafBlockPos, FlowerPos, ApplePos, GoldenApplePos } from "./tree";

// Seamless 16x16 Minecraft Oak Log texture
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

const LOG_PALETTE = [
  "#6d4934", // 0: Base wood brown
  "#4a3020", // 1: Dark bark fissure
  "#352015", // 2: Outer side bark edge
  "#8a5f43", // 3: Light bark vertical highlight
];

// Authentic 16x16 Minecraft Oak Leaf texture
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

// 5 Commit-driven leaf palettes (from Level 0 dormant to Level 4 rich emerald)
const LEAF_LEVEL_PALETTES = [
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
];

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
      <!-- Outer Golden Sun Flare Glow -->
      <rect x="${(x - glow * 2).toFixed(1)}" y="${(y - glow * 2).toFixed(1)}" width="${(size + glow * 4).toFixed(1)}" height="${(size + glow * 4).toFixed(1)}" fill="#ffe082" opacity="${shimmer ? 0.35 : 0.2}" />
      <!-- Outer Yellow Sun Frame -->
      <rect x="${(x + ps).toFixed(1)}" y="${(y + ps).toFixed(1)}" width="${(size - 2 * ps).toFixed(1)}" height="${(size - 2 * ps).toFixed(1)}" fill="#fbc02d" />
      <!-- Inner Warm Golden Layer -->
      <rect x="${(x + 2 * ps).toFixed(1)}" y="${(y + 2 * ps).toFixed(1)}" width="${(size - 4 * ps).toFixed(1)}" height="${(size - 4 * ps).toFixed(1)}" fill="#fff176" />
      <!-- Pure White Solar Core -->
      <rect x="${(x + 3 * ps).toFixed(1)}" y="${(y + 3 * ps).toFixed(1)}" width="${(size - 6 * ps).toFixed(1)}" height="${(size - 6 * ps).toFixed(1)}" fill="#ffffff" />
    </g>
  `;
}

function renderMinecraftCloud(
  x: number,
  y: number,
  scale: number = 1.0,
  opacity: number = 0.85
): string {
  const ps = 2.4 * scale;
  return `
    <g shape-rendering="crispEdges" opacity="${opacity}">
      <!-- Stepped Cloud Top Puff -->
      <rect x="${(x + 8 * ps).toFixed(1)}" y="${(y - 2 * ps).toFixed(1)}" width="${(8 * ps).toFixed(1)}" height="${(2 * ps).toFixed(1)}" fill="#ffffff" />
      <rect x="${(x + 4 * ps).toFixed(1)}" y="${y.toFixed(1)}" width="${(16 * ps).toFixed(1)}" height="${(3 * ps).toFixed(1)}" fill="#ffffff" />
      
      <!-- Main Cloud White Body -->
      <rect x="${x.toFixed(1)}" y="${(y + 3 * ps).toFixed(1)}" width="${(24 * ps).toFixed(1)}" height="${(4 * ps).toFixed(1)}" fill="#ffffff" />
      <rect x="${(x + 2 * ps).toFixed(1)}" y="${(y + 1 * ps).toFixed(1)}" width="${(20 * ps).toFixed(1)}" height="${(2 * ps).toFixed(1)}" fill="#ffffff" />
      
      <!-- Stepped Cloud Bottom Shading (Minecraft grey-blue shadow) -->
      <rect x="${(x + 1 * ps).toFixed(1)}" y="${(y + 7 * ps).toFixed(1)}" width="${(22 * ps).toFixed(1)}" height="${(2 * ps).toFixed(1)}" fill="#cfd8dc" />
      <rect x="${(x + 3 * ps).toFixed(1)}" y="${(y + 9 * ps).toFixed(1)}" width="${(18 * ps).toFixed(1)}" height="${(1.5 * ps).toFixed(1)}" fill="#b0bec5" />
    </g>
  `;
}

function renderMinecraftGround(width: number, height: number, groundY: number): string {
  const grassHeight = 14;
  return `
    <g shape-rendering="crispEdges">
      <!-- Green Grass Top Surface Layer -->
      <rect x="0" y="${groundY}" width="${width}" height="${grassHeight}" fill="#7cb342" />
      <rect x="0" y="${groundY}" width="${width}" height="3" fill="#8bc34a" />
      <rect x="0" y="${groundY + grassHeight - 2}" width="${width}" height="2" fill="#558b2f" />
      
      <!-- Brown Dirt Layer -->
      <rect x="0" y="${groundY + grassHeight}" width="${width}" height="${height - groundY - grassHeight}" fill="#5d4037" />
      <rect x="0" y="${groundY + grassHeight}" width="${width}" height="2" fill="#4e342e" />
    </g>
  `;
}

function renderMinecraftLog(x: number, y: number, size: number): string {
  const pixelSize = size / 16;
  let rects = "";

  for (let r = 0; r < 16; r++) {
    const row = LOG_16X16[r];
    for (let c = 0; c < 16; c++) {
      const colorIndex = parseInt(row[c], 10);
      const color = LOG_PALETTE[colorIndex];
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
  totalFrames: number
): string {
  const { x, y, size, commitLevel } = leaf;
  const pixelSize = size / 16;
  const palette = LEAF_LEVEL_PALETTES[Math.min(4, Math.max(0, commitLevel))];

  // Subtle wind sparkle on highlight pixels
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

  return `<g shape-rendering="crispEdges">${rects}</g>`;
}

function renderFlowerOnGrass(flower: FlowerPos, frameIndex: number): string {
  const { x, y, type } = flower;
  const ps = 2.0; // pixel size for flower
  const cx = x;
  const cy = y;

  let petalColor = "#e63946"; // Poppy red
  let centerColor = "#2b2b2b";

  if (type === "sakura") {
    petalColor = "#ff85a2"; // Sakura Pink
    centerColor = "#ffd166";
  } else if (type === "dandelion") {
    petalColor = "#ffd166"; // Yellow
    centerColor = "#e76f51";
  } else if (type === "tulip") {
    petalColor = "#f77f00"; // Orange
    centerColor = "#d62828";
  }

  // Gentle bloom animation
  const pulse = (frameIndex + Math.floor(cx / 10)) % 4 === 0 ? ps * 0.5 : 0;

  return `
    <g shape-rendering="crispEdges">
      <!-- Green Stem planted on grass -->
      <rect x="${cx + 4 * ps}" y="${cy + 5 * ps}" width="${2 * ps}" height="${7 * ps}" fill="#2e7d32" />
      <!-- Leaves on Stem -->
      <rect x="${cx + 2 * ps}" y="${cy + 8 * ps}" width="${2 * ps}" height="${2 * ps}" fill="#4caf50" />
      <rect x="${cx + 6 * ps}" y="${cy + 7 * ps}" width="${2 * ps}" height="${2 * ps}" fill="#4caf50" />
      
      <!-- Blossom Petals -->
      <rect x="${cx + 1 * ps - pulse}" y="${cy + 1 * ps - pulse}" width="${8 * ps + pulse * 2}" height="${6 * ps + pulse * 2}" fill="${petalColor}" />
      <rect x="${cx + 2 * ps - pulse}" y="${cy - pulse}" width="${6 * ps + pulse * 2}" height="${8 * ps + pulse * 2}" fill="${petalColor}" />
      
      <!-- Flower Center -->
      <rect x="${cx + 3.5 * ps}" y="${cy + 2.5 * ps}" width="${3 * ps}" height="${3 * ps}" fill="${centerColor}" />
      <!-- Highlight -->
      <rect x="${cx + 2.5 * ps}" y="${cy + 1.5 * ps}" width="${1.5 * ps}" height="${1.5 * ps}" fill="#ffffff" opacity="0.8" />
    </g>
  `;
}

function renderApple(apple: ApplePos, frameIndex: number): string {
  const { x, y, size } = apple;
  const ps = size / 12; // pixel size for apple
  const cx = x;
  const cy = y;

  // Gentle 1px sway
  const sway = (frameIndex + (apple.gridX || 0)) % 6 < 3 ? 0 : ps * 0.6;

  return `
    <g shape-rendering="crispEdges">
      <!-- Wood Stem connecting to leaf bottom -->
      <rect x="${cx + 5 * ps + sway}" y="${cy}" width="${2 * ps}" height="${4 * ps}" fill="#4e342e" />
      <!-- Green Leaf on Stem -->
      <rect x="${cx + 7 * ps + sway}" y="${cy + 1 * ps}" width="${2.5 * ps}" height="${2 * ps}" fill="#4caf50" />
      
      <!-- Red Apple Body -->
      <rect x="${cx + 2 * ps + sway}" y="${cy + 4 * ps}" width="${8 * ps}" height="${8 * ps}" fill="#d90429" />
      <rect x="${cx + 1 * ps + sway}" y="${cy + 5 * ps}" width="${10 * ps}" height="${6 * ps}" fill="#d90429" />
      
      <!-- Bottom Shading -->
      <rect x="${cx + 3 * ps + sway}" y="${cy + 11 * ps}" width="${6 * ps}" height="${1.5 * ps}" fill="#780016" />
      <!-- White Specular Highlight -->
      <rect x="${cx + 3 * ps + sway}" y="${cy + 5 * ps}" width="${2 * ps}" height="${2 * ps}" fill="#ffffff" />
    </g>
  `;
}

function renderGoldenAppleOnGrass(apple: GoldenApplePos, frameIndex: number): string {
  const { x, y, size } = apple;
  const ps = size / 12; // pixel scale
  const cx = x;
  const cy = y;

  // Enchantment shimmer pulse
  const shimmer = (frameIndex + Math.floor(cx / 10)) % 4 === 0;
  const pulse = shimmer ? ps * 0.4 : 0;

  return `
    <g shape-rendering="crispEdges">
      <!-- Wood Stem -->
      <rect x="${cx + 5 * ps}" y="${cy}" width="${2 * ps}" height="${4 * ps}" fill="#4e342e" />
      <!-- Golden Leaf on Stem -->
      <rect x="${cx + 7 * ps}" y="${cy + 1 * ps}" width="${2.5 * ps}" height="${2 * ps}" fill="#ffd700" />
      
      <!-- Golden Apple Body -->
      <rect x="${cx + 2 * ps - pulse}" y="${cy + 4 * ps - pulse}" width="${8 * ps + pulse * 2}" height="${8 * ps + pulse * 2}" fill="#ffb703" />
      <rect x="${cx + 1 * ps - pulse}" y="${cy + 5 * ps - pulse}" width="${10 * ps + pulse * 2}" height="${6 * ps + pulse * 2}" fill="#ffc300" />
      
      <!-- Bottom Gold Shadow -->
      <rect x="${cx + 3 * ps}" y="${cy + 11 * ps}" width="${6 * ps}" height="${1.5 * ps}" fill="#cc8800" />
      <!-- White Specular Highlight -->
      <rect x="${cx + 3 * ps}" y="${cy + 5 * ps}" width="${2 * ps}" height="${2 * ps}" fill="#ffffff" />
      <!-- Enchantment Sparkle Pixel -->
      <rect x="${cx + 7 * ps}" y="${cy + 3 * ps}" width="${1.5 * ps}" height="${1.5 * ps}" fill="#fff9c4" opacity="${shimmer ? 1 : 0.4}" />
    </g>
  `;
}

export function renderFrame(
  layout: TreeLayout,
  frameIndex: number,
  totalFrames: number
): string {
  const { width, height, groundY, trunkBlocks, leafBlocks, flowers, apples, goldenApples } = layout;

  // Sky elements: Minecraft Sun & Floating Clouds
  const sunX = width - 82; // Right upper sky (378px)
  const sunY = 18;
  const sunSize = 34;
  const sunSvg = renderMinecraftSun(sunX, sunY, sunSize, frameIndex, totalFrames);

  // Two drifting Minecraft clouds with seamless looping
  const driftRatio = totalFrames > 0 ? frameIndex / totalFrames : 0;
  
  // Cloud 1: Left upper sky
  const cloud1BaseX = 18;
  const cloud1X = cloud1BaseX + Math.sin(driftRatio * Math.PI * 2) * 8;
  const cloud1Y = 32;
  const cloud1Svg = renderMinecraftCloud(cloud1X, cloud1Y, 1.0, 0.85);

  // Cloud 2: Right mid sky
  const cloud2BaseX = width - 110;
  const cloud2X = cloud2BaseX - Math.sin(driftRatio * Math.PI * 2) * 6;
  const cloud2Y = 62;
  const cloud2Svg = renderMinecraftCloud(cloud2X, cloud2Y, 0.75, 0.75);

  // 1. Grass & Dirt Ground Layer
  const groundSvg = renderMinecraftGround(width, height, groundY);

  // 2. Oak Trunk (3 stacked log blocks directly on grass)
  const trunkSvg = trunkBlocks.map((b) => renderMinecraftLog(b.x, b.y, b.size)).join("\n");

  // 3. 14 Canopy Leaf Blocks (commit-driven green levels)
  const leavesSvg = leafBlocks
    .map((l) => renderMinecraftLeaf(l, frameIndex, totalFrames))
    .join("\n");

  // 4. Red Apples (Merged PRs hanging from canopy)
  const applesSvg = apples.map((a) => renderApple(a, frameIndex)).join("\n");

  // 5. Flowers on Grass (Open PRs planted on grass)
  const flowersSvg = flowers.map((f) => renderFlowerOnGrass(f, frameIndex)).join("\n");

  // 6. Golden Apples on Grass (Assigned PRs placed on grass)
  const goldenApplesSvg = (goldenApples || []).map((g) => renderGoldenAppleOnGrass(g, frameIndex)).join("\n");

  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  ${sunSvg}
  ${cloud1Svg}
  ${cloud2Svg}
  ${groundSvg}
  ${trunkSvg}
  ${leavesSvg}
  ${applesSvg}
  ${goldenApplesSvg}
  ${flowersSvg}
</svg>`;
}
