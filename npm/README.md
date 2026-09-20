# gh-tree 🌲

> **Minecraft Contribution Tree Generator for Node.js & JavaScript**  
> Generate animated Minecraft tree GIFs, SVG frames, and profile widgets directly from GitHub contribution activity or custom parameters.

[![npm version](https://img.shields.io/npm/v/gh-tree?color=10b981&logo=npm)](https://www.npmjs.com/package/gh-tree)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

---

## 📦 Installation

```bash
npm install gh-tree
```
or with Yarn / pnpm / Bun:
```bash
pnpm add gh-tree
yarn add gh-tree
bun add gh-tree
```

---

## 🚀 Quick Start

### 1. Generate an Animated GIF from GitHub Activity

```typescript
import { generateTreeGif } from "gh-tree";
import * as fs from "fs";

async function main() {
  const gifBuffer = await generateTreeGif({
    username: "thatsoeclipse",
    token: process.env.GITHUB_TOKEN, // Optional, for higher rate limits
    treeType: "oak",                 // "oak" | "sakura" | "crimson" | "warped" | "spruce" | ...
    growth: "auto",                  // "auto" | "standard" | "expanded"
    pet: "auto",                     // "auto" | "wolf" | "fox" | "cat" | "parrot" | "none"
    showFarmer: true,                // Companion farmer caring for tree
    showCampfire: true,
    showChest: true,
  });

  fs.writeFileSync("tree.gif", gifBuffer);
  console.log("Tree GIF generated successfully!");
}

main();
```

---

### 2. Generate from Custom Contribution Data

You don't need GitHub API access to generate trees—pass custom weekly data directly:

```typescript
import { generateTreeGif, generateTreeSvg } from "gh-tree";
import * as fs from "fs";

async function generateCustom() {
  const weeks = [
    { days: [{ date: "2026-08-01", count: 5 }], total: 5, openPRs: 1, mergedPRs: 2, assignedPRs: 1 },
    { days: [{ date: "2026-08-08", count: 12 }], total: 12, openPRs: 0, mergedPRs: 1, assignedPRs: 0 },
  ];

  // Generate SVG
  const svg = await generateTreeSvg({
    weeks,
    streak: 7,
    treeType: "sakura",
    weather: "sunny",
  });
  fs.writeFileSync("tree.svg", svg);

  // Generate Animated GIF (Uint8Array)
  const gifBytes = await generateTreeGif({
    weeks,
    streak: 7,
    treeType: "sakura",
    frames: 20,
    frameDelayMs: 100,
  });
  fs.writeFileSync("tree.gif", gifBytes);
}
```

---

### 3. Bidirectional GIF & Layout Inspection (GIF / Layout $\to$ Metadata)

Inspect and decode metadata from any generated GIF byte stream or TreeLayout:

```typescript
import { decodeGifInfo, createTreeLayout, inspectTreeLayout, extractTreeSummary } from "gh-tree";
import * as fs from "fs";

// 1. Inspect GIF Binary Bytes
const gifBuffer = fs.readFileSync("tree.gif");
const info = decodeGifInfo(gifBuffer);

console.log(`Resolution: ${info.width}x${info.height}`);
console.log(`Total Frames: ${info.frameCount} frames`);
console.log(`Total Duration: ${info.durationMs}ms`);
console.log(`Loop Mode: ${info.loopCount === 0 ? "Infinite Loop" : info.loopCount}`);

// 2. Inspect Tree Structure & Game Elements
const layout = await createTreeLayout({
  username: "torvalds",
  treeType: "crimson",
});

const summary = inspectTreeLayout(layout);
console.log(`Growth Stage: ${summary.growthStage}`); // "standard" (14 leaves) or "expanded" (21 leaves)
console.log(`Active Foliage: ${summary.activeLeafBlocksCount} leaves`);
console.log(`Flowers (Open PRs): ${summary.flowersCount}`);
console.log(`Apples (Merged PRs): ${summary.applesCount}`);
console.log(`Underground Ores:`, summary.ores);

// 3. Human-readable summary string
console.log(extractTreeSummary(layout));
```

---

## 🎨 Tree Biomes & Species

| Tree Type | Biome Theme | Particle / Atmosphere Effects |
| :--- | :--- | :--- |
| `oak` | Classic Minecraft Forest | Floating Daylight/Night Clouds, Apples |
| `sakura` | Cherry Blossom Grove | Fluttering Pink Petals |
| `spruce` | Snowy Taiga | Cozy Campfire, Falling Snowflakes |
| `birch` | Birch Forest | Golden Sunlit Foliage |
| `jungle` | Lush Jungle | Exotic Cocoa Pods, Parrot Companions |
| `dark_oak` | Dark Forest | Rich Mahogany Wood & Emerald Clusters |
| `acacia` | Savanna Plains | Fiery Orange Leaves |
| `mangrove` | Mangrove Swamp | Deep Crimson-Red Roots |
| `crimson` | Nether Crimson Forest | Floating Crimson Spores & Fireflies |
| `warped` | Nether Warped Forest | Floating Cyan Spores & Ender Particles |

---

## 📖 API Reference

### `generateTreeGif(options: GenerateTreeOptions): Promise<Uint8Array>`
Orchestrates contribution resolution, weather, layout calculation, frame rendering, and WASM GIF encoding.

### `generateTreeSvg(options: GenerateTreeOptions, frameIndex?: number): Promise<string>`
Returns a single SVG string representing the specified frame index (default: `0`).

### `generateTreeFrames(options: GenerateTreeOptions): Promise<string[]>`
Returns an array of SVG frame strings representing the complete animation cycle.

### `createTreeLayout(options: GenerateTreeOptions): Promise<TreeLayout>`
Builds and returns the calculated `TreeLayout` object containing positions for all blocks, characters, and props.

### `decodeGifInfo(bytes: Uint8Array | ArrayBuffer | Buffer): GifInfo`
Decodes logical dimensions, frame count, durations, delays, and loop metadata from raw GIF binary data.

### `inspectTreeLayout(layout: TreeLayout): TreeInspectionSummary`
Analyzes a `TreeLayout` and returns structured summary metrics.

---

## 📄 License

MIT © [Nivin Vysakh](https://github.com/nivinvysakh)
