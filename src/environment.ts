import { TreeType } from "./tree";

export function renderMinecraftSun(
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

export function renderMinecraftMoon(
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
      <rect x="${(x - glow * 2).toFixed(1)}" y="${(y - glow * 2).toFixed(1)}" width="${(size + glow * 4).toFixed(1)}" height="${(size + glow * 4).toFixed(1)}" fill="#cfd8dc" opacity="${shimmer ? 0.25 : 0.15}" />
      <!-- Outer lunar frame -->
      <rect x="${(x + ps).toFixed(1)}" y="${(y + ps).toFixed(1)}" width="${(size - 2 * ps).toFixed(1)}" height="${(size - 2 * ps).toFixed(1)}" fill="#eceff1" />
      <!-- Moon core face -->
      <rect x="${(x + 2 * ps).toFixed(1)}" y="${(y + 2 * ps).toFixed(1)}" width="${(size - 4 * ps).toFixed(1)}" height="${(size - 4 * ps).toFixed(1)}" fill="#ffffff" />
      <!-- Authentic Minecraft Moon Craters / Grey Basins -->
      <rect x="${(x + 2.5 * ps).toFixed(1)}" y="${(y + 2.5 * ps).toFixed(1)}" width="${(2 * ps).toFixed(1)}" height="${(2 * ps).toFixed(1)}" fill="#b0bec5" />
      <rect x="${(x + 5.5 * ps).toFixed(1)}" y="${(y + 3.5 * ps).toFixed(1)}" width="${(2.5 * ps).toFixed(1)}" height="${(2 * ps).toFixed(1)}" fill="#cfd8dc" />
      <rect x="${(x + 3.5 * ps).toFixed(1)}" y="${(y + 6 * ps).toFixed(1)}" width="${(3 * ps).toFixed(1)}" height="${(2 * ps).toFixed(1)}" fill="#b0bec5" />
    </g>
  `;
}

export function renderMinecraftStars(width: number, frameIndex: number): string {
  let stars = "";
  const starCoords = [
    { x: 30, y: 35, s: 2, phase: 0 },
    { x: 75, y: 70, s: 1.5, phase: 1 },
    { x: 120, y: 40, s: 2.5, phase: 2 },
    { x: 170, y: 85, s: 1.5, phase: 0 },
    { x: 230, y: 25, s: 2, phase: 1 },
    { x: 290, y: 65, s: 1.5, phase: 2 },
    { x: 340, y: 30, s: 2.5, phase: 0 },
    { x: 395, y: 75, s: 2, phase: 1 },
    { x: 430, y: 45, s: 1.5, phase: 2 },
    { x: 50, y: 110, s: 1.5, phase: 0 },
    { x: 145, y: 125, s: 2, phase: 1 },
    { x: 315, y: 115, s: 2, phase: 2 },
    { x: 380, y: 130, s: 1.5, phase: 0 },
  ];

  for (const star of starCoords) {
    if (star.x < width) {
      const twinkle = (frameIndex + star.phase * 2) % 3 === 0;
      const opacity = twinkle ? 0.95 : 0.45;
      const color = (star.phase === 0) ? "#fff9c4" : (star.phase === 1) ? "#e0f7fa" : "#ffffff";
      stars += `<rect x="${star.x}" y="${star.y}" width="${star.s}" height="${star.s}" fill="${color}" opacity="${opacity}" />`;
      if (twinkle && star.s >= 2) {
        stars += `<rect x="${star.x - 0.5}" y="${star.y - 0.5}" width="${star.s + 1}" height="${star.s + 1}" fill="${color}" opacity="0.25" />`;
      }
    }
  }

  return `<g shape-rendering="crispEdges"><!-- Twinkling Starlight -->${stars}</g>`;
}

export function renderBioluminescentParticles(
  width: number,
  groundY: number,
  frameIndex: number,
  _totalFrames: number,
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

export function renderMinecraftCloud(
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
    <!-- Minecraft Stepped Pixel Cloud -->
    <g shape-rendering="crispEdges" opacity="${opacity}">
      <rect x="${(x + 4 * ps).toFixed(1)}" y="${(y + 10 * ps).toFixed(1)}" width="${(24 * ps).toFixed(1)}" height="${(3 * ps).toFixed(1)}" fill="${deepShadow}" />
      <rect x="${(x + 2 * ps).toFixed(1)}" y="${(y + 8 * ps).toFixed(1)}" width="${(28 * ps).toFixed(1)}" height="${(4 * ps).toFixed(1)}" fill="${shadowColor}" />
      <rect x="${x.toFixed(1)}" y="${(y + 4 * ps).toFixed(1)}" width="${(32 * ps).toFixed(1)}" height="${(5 * ps).toFixed(1)}" fill="${bodyColor}" />
      <rect x="${(x + 6 * ps).toFixed(1)}" y="${(y + 1 * ps).toFixed(1)}" width="${(16 * ps).toFixed(1)}" height="${(4 * ps).toFixed(1)}" fill="${bodyColor}" />
      <rect x="${(x + 10 * ps).toFixed(1)}" y="${y.toFixed(1)}" width="${(8 * ps).toFixed(1)}" height="${(2 * ps).toFixed(1)}" fill="${bodyColor}" />
      <rect x="${(x + 22 * ps).toFixed(1)}" y="${(y + 2 * ps).toFixed(1)}" width="${(6 * ps).toFixed(1)}" height="${(3 * ps).toFixed(1)}" fill="${bodyColor}" />
    </g>
  `;
}

export function renderRainStreaks(
  width: number,
  groundY: number,
  frameIndex: number,
  _totalFrames: number
): string {
  let rects = "";
  const dropCount = 42;
  const speed = 14;

  for (let i = 0; i < dropCount; i++) {
    const seedX = (i * 37 + 13) % width;
    const initialY = (i * 23) % (groundY - 10);
    const dropY = (initialY + frameIndex * speed) % (groundY - 5);
    const dropX = (seedX - frameIndex * 2 + width) % width;
    const dropHeight = (i % 3 === 0) ? 8 : (i % 2 === 0) ? 6 : 4;
    const dropColor = (i % 2 === 0) ? "#64b5f6" : "#90caf9";

    rects += `<rect x="${dropX.toFixed(1)}" y="${dropY.toFixed(1)}" width="2" height="${dropHeight}" fill="${dropColor}" opacity="0.75" />`;

    // Splash on ground
    if (dropY > groundY - 18) {
      rects += `<rect x="${(dropX - 2).toFixed(1)}" y="${(groundY - 1).toFixed(1)}" width="4" height="1.5" fill="#e1f5fe" opacity="0.6" />`;
    }
  }

  return `<g shape-rendering="crispEdges">${rects}</g>`;
}

export function renderSnowflakes(
  width: number,
  groundY: number,
  frameIndex: number,
  _totalFrames: number
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

export function renderSakuraPetals(
  width: number,
  groundY: number,
  frameIndex: number,
  _totalFrames: number
): string {
  let petals = "";
  const petalCount = 20;

  for (let i = 0; i < petalCount; i++) {
    const seedX = (i * 47 + 23) % width;
    const initialY = (i * 31) % (groundY - 30);
    const speedY = 5 + (i % 4);
    const petalY = (initialY + frameIndex * speedY) % (groundY - 8);
    const driftX = Math.sin((frameIndex + i) * 0.45) * 8 + (frameIndex * 1.5);
    const petalX = (seedX + driftX) % width;
    const isBig = i % 3 === 0;
    const petalColor = (i % 2 === 0) ? "#ff758f" : "#ffb7c5";
    const size = isBig ? 3 : 2;

    petals += `<rect x="${petalX.toFixed(1)}" y="${petalY.toFixed(1)}" width="${size}" height="${size}" fill="${petalColor}" opacity="0.85" />`;
  }

  return `<g shape-rendering="crispEdges">${petals}</g>`;
}

export function renderSeasonalFireworks(
  width: number,
  height: number,
  frameIndex: number,
  totalFrames: number = 20
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

