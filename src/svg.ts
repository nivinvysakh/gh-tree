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
  isSnow: boolean = false
): string {
  const grassHeight = 14;
  const grassColor = isSnow ? "#eceff1" : "#7cb342";
  const grassHighlight = isSnow ? "#ffffff" : "#8bc34a";
  const grassShadow = isSnow ? "#cfd8dc" : "#558b2f";

  return `
    <g shape-rendering="crispEdges">
      <rect x="0" y="${groundY}" width="${width}" height="${grassHeight}" fill="${grassColor}" />
      <rect x="0" y="${groundY}" width="${width}" height="3" fill="${grassHighlight}" />
      <rect x="0" y="${groundY + grassHeight - 2}" width="${width}" height="2" fill="${grassShadow}" />
      
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
  totalFrames: number,
  isSnow: boolean = false
): string {
  const { x, y, size, commitLevel, gridY } = leaf;
  const pixelSize = size / 16;
  const palette = LEAF_LEVEL_PALETTES[Math.min(4, Math.max(0, commitLevel))];

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

export function renderFrame(
  layout: TreeLayout,
  frameIndex: number,
  totalFrames: number
): string {
  const { width, height, groundY, trunkBlocks, leafBlocks, flowers, apples, goldenApples, weather } = layout;
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

  // 2. Grass & Dirt Ground Layer
  const groundSvg = renderMinecraftGround(width, height, groundY, isSnow);

  // 3. Oak Trunk
  const trunkSvg = trunkBlocks.map((b) => renderMinecraftLog(b.x, b.y, b.size)).join("\n");

  // 4. 14 Canopy Leaf Blocks
  const leavesSvg = leafBlocks
    .map((l) => renderMinecraftLeaf(l, frameIndex, totalFrames, isSnow))
    .join("\n");

  // 5. Red Apples
  const applesSvg = apples.map((a) => renderApple(a, frameIndex)).join("\n");

  // 6. Flowers on Grass
  const flowersSvg = flowers.map((f) => renderFlowerOnGrass(f, frameIndex)).join("\n");

  // 7. Golden Apples on Grass
  const goldenApplesSvg = (goldenApples || []).map((g) => renderGoldenAppleOnGrass(g, frameIndex)).join("\n");

  // 8. Foreground Weather Precipitation (Rain or Snow)
  let precipSvg = "";
  if (isRain) {
    precipSvg = renderRainStreaks(width, groundY, frameIndex, totalFrames);
  } else if (isSnow) {
    precipSvg = renderSnowflakes(width, groundY, frameIndex, totalFrames);
  }

  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  ${skySvg}
  ${groundSvg}
  ${trunkSvg}
  ${leavesSvg}
  ${applesSvg}
  ${goldenApplesSvg}
  ${flowersSvg}
  ${precipSvg}
</svg>`;
}
