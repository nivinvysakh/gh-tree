# 🎨 Contributing & Pixel Art Guide

Thank you for your interest in contributing to **`gh-tree`**! We welcome new features, bug fixes, documentation improvements, and custom Minecraft pixel art!

---

## 📜 Code of Conduct

All contributors are expected to follow our **[Code of Conduct](Code-of-Conduct)**.

---

## 🔷 Unlocking the Lapis Lazuli Contributor Badge

Every contributor whose Pull Request is merged into **[`nivinvysakh/gh-tree`](https://github.com/nivinvysakh/gh-tree)** is automatically recognized by GitHub's API and permanently unlocks the celestial blue **Lapis Lazuli Ore 🔷** in their own personal commit tree!

---

## 🛠️ Local Development Setup

### 1. Clone the repository:
```bash
git clone https://github.com/nivinvysakh/gh-tree.git
cd gh-tree
```

### 2. Install dependencies:
```bash
npm install
```

### 3. Run tests & typecheck:
```bash
npm test            # Run Vitest unit & e2e test suite
npm run typecheck   # Typecheck TypeScript files without emitting JS
```

### 4. Generate all showcase mock GIFs locally (offline):
```bash
npm run generate:mock
```

### 5. Compile production distribution bundle:
```bash
npm run build
```

---

## 🎨 Adding New Minecraft Pixel Art (Mobs, Biomes, Ores)

All rendering in `gh-tree` is built with lightweight, crisp SVG pixel art and `shape-rendering="crispEdges"`:

1. **Pixel Units**:
   Use a uniform pixel scaling factor `ps` (e.g. `1.2` to `1.6` for mobs and signposts) and `<rect>` elements to maintain sharp pixel art aesthetics on all displays.

2. **Color Palettes**:
   Use authentic Minecraft texture palettes (e.g., Oak bark `#6d4934`, Spruce bark `#38271d`, Birch bark `#eaeaea`, Sakura foliage `#f48fb1`, red collar `#d32f2f`, emerald eyes `#00e676`).

3. **Collision-Free Ground Slots**:
   When placing items on the grass lawn (`groundY = 370`), check `src/tree.ts` ground slot allocations (`leftSlots: 112, 144, 176` and `rightSlots: 258, 296, 336, 374`) to ensure zero visual overlaps with flowers, campfires, and pets.

---

## 🌿 Submitting Pull Requests

1. Use Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`).
2. Ensure `npm run typecheck`, `npm test`, and `npm run build` pass with 0 errors.
3. If you changed visual art, attach generated GIF mockups (`npm run generate:mock`) in your PR description.
4. Fill out the [Pull Request Template](https://github.com/nivinvysakh/gh-tree/blob/main/.github/pull_request_template.md).
