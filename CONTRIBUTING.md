# Contributing to `gh-tree` 🌴

Thank you for your interest in contributing to **`gh-tree`**! We welcome contributions of all kinds—from reporting bugs and improving documentation to designing new Minecraft biomes, mobs, pet companions, and visual collectibles.

---

## 🔷 Exclusive Contributor Perk: Lapis Lazuli Ore

Every contributor whose Pull Request is merged into [`nivinvysakh/gh-tree`](https://github.com/nivinvysakh/gh-tree) is automatically recognized via the GitHub Contributors API and permanently unlocks the special celestial blue **Lapis Lazuli Ore 🔷** in their own personal commit tree!

---

## 📜 Code of Conduct

This project and everyone participating in it is governed by the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [@nivinvysakh](https://github.com/nivinvysakh).

---

## 🛠️ Local Development Setup

### Prerequisites
- [Node.js](https://nodejs.org/) version **20.x** or higher
- [npm](https://www.npmjs.com/) (bundled with Node.js)
- [Git](https://git-scm.com/)

### 1. Clone & Install
```bash
# Clone your fork of the repository
git clone https://github.com/<your-username>/gh-tree.git
cd gh-tree

# Install project dependencies
npm install
```

### 2. Useful NPM Scripts

| Command | Description |
| :--- | :--- |
| `npm test` | Runs the test suite once with [Vitest](https://vitest.dev/) |
| `npm run test:watch` | Runs tests in interactive watch mode during development |
| `npm run typecheck` | Validates TypeScript types across the codebase (`tsc --noEmit`) |
| `npm run generate:mock` | Generates all 12 showcase GIF mockups locally in `assets/` and root `tree.gif` (no GitHub API token required!) |
| `npm run build` | Compiles and bundles `src/main.ts` into `dist/index.js` using `@vercel/ncc` |

---

## 🗺️ Project Architecture & Codebase Map

The core logic lives in `src/`:

```
src/
├── main.ts        # Action entry point, CLI inputs/outputs parsing, and workflow orchestration
├── github.ts      # GitHub GraphQL & REST API client (contributions, PRs, streak logic, contributor check)
├── tree.ts        # Tree branch math, leaf levels (0-4), slot allocations for pets & ground collectibles
├── svg.ts         # SVG rendering engine for Minecraft pixel art (weather, biomes, mobs, ores, signposts)
├── gif.ts         # Rasterizes SVGs using @resvg/resvg-wasm and encodes animated GIFs via gifenc
├── weather.ts     # Open-Meteo live weather client and condition mappers
├── markdown.ts    # Parses and updates README.md with the generated GIF image tag
└── types/         # TypeScript type definitions and interfaces
```

---

## 🎨 Pixel Art & SVG Rendering Guidelines

`gh-tree` generates pure SVG pixel art rendered with crisp edges:

1. **Pixel Scaling Unit (`ps`)**:
   - Always scale pixel coordinates using a consistent scaling factor `ps` (e.g. `1.2` to `1.6` for mobs, props, and signposts).
   - Use standard `<rect>` elements to maintain sharp, pixelated aesthetics on both standard and Retina/HiDPI screens.

2. **Crisp Edge Rendering**:
   - SVGs are constructed with `shape-rendering="crispEdges"` to disable anti-aliasing blur and preserve authentic Minecraft retro pixels.

3. **Authentic Color Palettes**:
   - Use Minecraft color codes (e.g., Oak bark `#6d4934`, Spruce bark `#38271d`, Birch bark `#eaeaea`, Sakura pink `#f48fb1`, Grass `#5b8731`, Dirt `#866043`).

4. **Collision-Free Slot Allocation**:
   - The ground plane is fixed at `groundY = 370`.
   - When placing new ground items (pets, chests, campfires, flowers), consult `src/tree.ts` slot allocations (`leftSlots: 112, 144, 176` and `rightSlots: 258, 296, 336, 374`) to prevent overlapping visual elements.

---

## 🌿 Development & Pull Request Workflow

### 1. Create a Topic Branch
```bash
git checkout -b feat/my-new-biome
# or: git checkout -b fix/weather-parsing-bug
```

### 2. Commit Message Guidelines
We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:
- `feat: add Jungle tree biome with cocoa beans`
- `fix: correct streak signpost layout on 3-digit counts`
- `docs: update input parameters table in README`
- `test: add unit test for weather parsing edge cases`
- `refactor: optimize SVG frame rendering loop`
- `chore: update dependencies`

### 3. Pre-Flight Checklist
Before submitting a pull request, please ensure:
1. **Type Check**: `npm run typecheck` completes with 0 errors.
2. **Tests**: `npm test` passes all test suites.
3. **Bundle Build**: Run `npm run build` so `dist/index.js` is kept in sync if you edited files in `src/`.
4. **Visual Testing**: Run `npm run generate:mock` and review the output GIFs if you modified SVG art or animation frames.

### 4. Submit Your PR
- Open a Pull Request against the `main` branch.
- Fill out the provided [Pull Request Template](.github/pull_request_template.md).
- Include before/after screenshots or generated GIFs if visual art was changed.
- The automated PR bot will assign maintainer [@nivinvysakh](https://github.com/nivinvysakh) for review.

---

## 💡 Proposing New Features & Ideas

Have an idea for a new Minecraft mob, seasonal holiday event, or biome?
- Open an issue using our [🎨 New Biome / Pet / Collectible Idea](.github/ISSUE_TEMPLATE/biome_or_collectible.yml) template.
- Share your ideas in GitHub Discussions or Wiki pages.

