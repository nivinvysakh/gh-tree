# 🎨 Contributing & Pixel Art Guide

Thank you for your interest in contributing to **`gh-tree`**! We welcome new features, bug fixes, documentation improvements, and custom Minecraft pixel art!

---

## 🛠️ Local Development Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/nivinvysakh/gh-tree.git
   cd gh-tree
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run tests**:
   ```bash
   npm test
   ```

4. **Generate all showcase mock GIFs locally** (no GitHub token required!):
   ```bash
   npm run generate:mock
   ```

5. **Compile production distribution bundle**:
   ```bash
   npm run build
   ```

---

## 🎨 Adding New Minecraft Pixel Art (Mobs, Biomes, Ores)

All rendering in `gh-tree` is built with lightweight, crisp SVG pixel art and `shape-rendering="crispEdges"`:

1. **Pixel Units**:
   Use a uniform pixel scaling factor `ps` (e.g. `1.2` to `1.6` for mobs and signposts) and `<rect>` elements to maintain sharp pixel art aesthetics at high DPI.

2. **Color Palettes**:
   Use authentic Minecraft texture palettes (e.g., oak `#6d4934`, spruce `#38271d`, birch `#eaeaea`, red collar `#d32f2f`, emerald eyes `#00e676`).

3. **Collision-Free Ground Slots**:
   When placing items on the grass lawn (`groundY = 370`), check `src/tree.ts` ground slot allocations (`leftSlots: 112, 144, 176` and `rightSlots: 258, 296, 336, 374`) to ensure zero visual overlaps with flowers and pets.

---

## 🔷 Unlocking the Lapis Lazuli Contributor Badge

Every contributor whose Pull Request is merged into `nivinvysakh/gh-tree` is automatically recognized by GitHub's API and permanently unlocks the **Lapis Lazuli Ore 🔷** in their own personal commit tree!
