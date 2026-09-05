# 🏗️ Architecture & Rendering Engine Internals

This technical document details the internal pipeline and design architecture of **`gh-tree`**.

---

## 🔄 End-to-End Pipeline Overview

When the GitHub Action runs, it executes the following sequence:

```
┌─────────────────┐     ┌───────────────────────┐     ┌──────────────────────┐
│  Action Inputs  │ ──> │   GitHub GraphQL API   │ ──> │ Tree Layout & Math   │
│   (action.yml)  │     │ (contributions, PRs)  │     │     (src/tree.ts)    │
└─────────────────┘     └───────────────────────┘     └──────────────────────┘
                                                                 │
                                                                 ▼
┌─────────────────┐     ┌───────────────────────┐     ┌──────────────────────┐
│ Auto-Commit/Push│ <── │  Rasterize & Encode   │ <── │ SVG Pixel Art Engine │
│  (src/main.ts)  │     │ (resvg-wasm + gifenc) │     │     (src/svg.ts)     │
└─────────────────┘     └───────────────────────┘     └──────────────────────┘
```

---

## 📦 Core Modules Breakdown

### 1. Action Orchestration (`src/main.ts`)
- Reads inputs from `@actions/core` with default fallbacks.
- Fetches contributions, commits, PR counts, and contributor status.
- Queries Open-Meteo for real-time weather data if `city` is configured.
- Invokes `generateTreeSvg()` for all animation frames (default 20 frames).
- Passes SVG frames to `renderGif()` and writes the output file (`tree.gif`).
- Updates `README.md` markers via `updateMarkdownFile()`.
- Commits and pushes changes with `git` using `@actions/core` or skips if clean.

### 2. GitHub API Integration (`src/github.ts`)
- **GraphQL Calendar Query**: Queries user `contributionsCollection(from, to)` over `days` history (default 140 days).
- **PR Recency Windowing**: Filters pull requests, reviews, and assignments within `prDays` (default 14 days) to ensure active, fresh collectibles.
- **Active Streak Calculation**: Computes consecutive active commit days up to today/yesterday.
- **Contributor Verification**: Calls the REST `/repos/nivinvysakh/gh-tree/contributors` endpoint to verify if the runner is an official contributor and unlock the **Lapis Lazuli Ore 🔷**.

### 3. Layout Mathematics & Slot Management (`src/tree.ts`)
- **Branch Tiering**: Buckets the 14 contribution weeks into a 4-tier canopy structure:
  - Tier -3 (Peak block: 1 block)
  - Tier -2 (Upper canopy: 3 blocks)
  - Tier -1 (Mid canopy: 5 blocks)
  - Tier 0 (Lower canopy: 5 blocks)
- **Leaf Intensity Leveling**: Computes commit density levels (Level 0 dormant to Level 4 power sprint).
- **Collision-Free Slot Allocator**:
  - Ground plane is anchored at `groundY = 370`.
  - Distributes items across `leftSlots: [112, 144, 176]` and `rightSlots: [258, 296, 336, 374]`.
  - Ensures companion pets, campfires, chests, signposts, and flowers never visually overlap.

### 4. SVG Pixel Art Engine (`src/svg.ts`)
- Uses pure SVG `<rect>` elements with `shape-rendering="crispEdges"` for razor-sharp retro rendering.
- **Layers Rendered (Bottom to Top)**:
  1. Sky & atmospheric weather particles (sun, moon, stars, rain streaks, snow, clouds).
  2. Underground dirt layer & unlocked Ore blocks (Netherite, Gold, Diamond, Emerald, Lapis, Redstone).
  3. Grass lawn surface (`groundY = 370`).
  4. Tree trunk (wood bark pattern per biome) and beehive.
  5. Canopy leaf blocks with dynamic seasonal foliage and holiday fairy lights / gifts.
  6. Ground props (campfires with rising smoke particles, chests, signposts).
  7. Companion mobs (wolf wagging tail, sleeping/alert fox, cat).
  8. Flying entities (animated buzzing bee hovering around canopy).
  9. Hanging apples & lawn flowers.

### 5. High-Performance GIF Encoding (`src/gif.ts`)
- Rasterizes SVG strings into raw RGBA pixel buffers in memory using `@resvg/resvg-wasm` (Rust-based SVG renderer compiled to WebAssembly).
- Quantizes pixel palettes and writes looping animated GIF89a streams using `gifenc`.
- Memory efficient with zero dependency on heavy headless browsers or system binaries like `imagemagick` or `ffmpeg`.

### 6. Live Weather Client (`src/weather.ts`)
- Integrates with Open-Meteo REST API.
- Geocodes city names to coordinates (latitude / longitude).
- Evaluates weather codes (WMO code), solar zenith angle (day vs. night), precipitation, and snowfall to compute atmospheric state.

### 7. Markdown Parser (`src/markdown.ts`)
- Searches for comment tags:
  ```markdown
  <!-- commit-tree-start -->
  ...
  <!-- commit-tree-end -->
  ```
- Replaces the content inside with the cache-busted animated GIF tag:
  ```markdown
  <!-- commit-tree-start -->
  ![tree](tree.gif?v=1788539560947)
  <!-- commit-tree-end -->
  ```
