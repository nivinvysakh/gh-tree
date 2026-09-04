<div align="center">

# gh-tree 🌴


<!-- commit-tree-start -->
![tree](tree.gif?v=1788515413990)
<!-- commit-tree-end -->


<p>
  <b>Renders your GitHub contribution graph and pull requests as an animated Minecraft Oak, Sakura, Spruce, or Birch Tree with transparent background, live weather, and gamer collectibles.</b>
</p>

</div>

---

- **Minecraft Tree Biomes 🌸🌲⚪🌳** — choose between **Sakura / Cherry Blossom** (with falling pink petals), **Spruce Taiga**, **Birch Forest**, or classic **Oak**.
- **Minecraft Oak / Sakura Leaves** — weekly commits drive the lushness and color intensity levels (Level 0 dormant to Level 4 rich emerald/pink) across the 14 canopy blocks.
- **Minecraft Bee 🐝 & Streak Beehive 🍯** — an animated buzzing bee with fluttering wings and a wooden beehive on the trunk celebrating your active commit streak.
- **Wooden Stat Signpost 🪧** — a neat pixelated wooden signpost on the grass lawn displaying your live commit streak (`⚡ 14d`).
- **Diamond & Emerald Ore Blocks 💎** — embedded in the ground dirt layer for high-productivity weeks and commit milestones.
- **Minecraft Flowers 🌸 (Open PRs)** — up to 4 colorful flowers (Poppies, Dandelions, Tulips, Sakura) planted on the lawn.
- **Minecraft Red Apples 🍎 (Merged PRs)** — up to 4 ripe red apples hanging beneath the canopy leaf blocks.
- **Minecraft Golden Apples 🍏✨ (Assigned PRs / Reviews)** — up to 4 enchanted golden apples placed on the lawn.
- **Live Weather & Day/Night Cycle ☀️🌕🌧️❄️☁️** — real-time weather integration (via Open-Meteo) rendering animated Sun, Starry Night Moon & twinkling stars, Rain streaks & splashes, Snowfall & snow caps, or Drifting clouds.
- **Transparent Background** — pure alpha transparency that seamlessly blends into dark and light GitHub profiles and READMEs.

---

## Biome & Tree Varieties Showcase 🌸🌲⚪🌳

| **Classic Oak 🌳** (`tree-type: oak`) | **Sakura Cherry Blossom 🌸** (`tree-type: sakura`) |
| :---: | :---: |
| ![Oak](tree.gif) | ![Sakura](tree-sakura.gif) |
| *Classic Oak, Bee, Beehive & Ore* | *Cherry blossom pinks & falling petals* |

| **Taiga Spruce 🌲** (`tree-type: spruce`) | **Birch Forest ⚪** (`tree-type: birch`) |
| :---: | :---: |
| ![Spruce](tree-spruce.gif) | ![Birch](tree-birch.gif) |
| *Dark coniferous needles & spruce bark* | *White notched birch bark & olive leaves* |

---

## Weather & Day/Night Showcase 🌦️

| **Sunny ☀️** (`weather: sunny`) | **Starry Night 🌕✨** (`weather: night`) |
| :---: | :---: |
| ![Sunny](tree.gif) | ![Night](tree-night.gif) |
| *Glowing Minecraft Sun & solar flares* | *Minecraft Moon, craters & twinkling stars* |

| **Rainy 🌧️** (`weather: rain`) | **Snowy ❄️** (`weather: snow`) | **Cloudy ☁️** (`weather: cloudy`) |
| :---: | :---: | :---: |
| ![Rain](tree-rain.gif) | ![Snow](tree-snow.gif) | ![Cloudy](tree-cloudy.gif) |
| *Slanted rain streaks & splashes* | *Fluttering snow & snow-capped leaves* | *Multi-layered drifting overcast clouds* |

---

## Quick Start (Profile README)

Add this simple workflow to your repository (e.g. your `username/username` profile README repository) at `.github/workflows/tree.yml`:

```yaml
name: Generate Commit Tree

on:
  schedule:
    - cron: '0 0 * * *' # Runs daily at midnight
  workflow_dispatch:

permissions:
  contents: write

jobs:
  update-tree:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: nivinvysakh/gh-tree@main
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
```

### Full Configuration Example

Customize your tree with biomes, live weather, and recency tuning:

```yaml
name: Generate Commit Tree

on:
  schedule:
    - cron: '0 0 * * *' # Runs daily at midnight
  workflow_dispatch:

permissions:
  contents: write

jobs:
  update-tree:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: nivinvysakh/gh-tree@main
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          # Tree biome variety: oak | sakura | spruce | birch
          tree-type: "sakura"
          # Live weather from Open-Meteo for your city (auto-detects sun, night, rain, snow, clouds)
          city: "Tokyo"
          # Or manually force a weather condition: auto | sunny | night | rain | snow | cloudy
          weather: "auto"
          # Recency window in days for flowers (open PRs), red apples (merged PRs), and golden apples
          pr-days: "14"
          # Total days of history to fetch for commit canopy leaves (~14 weekly tiers)
          days: "140"
          # Whether to show the wooden streak signpost and animated bee
          show-signpost: "true"
          show-bee: "true"
```

> [!NOTE]
> If you want the tree to reflect contributions across private and external repositories, create a Personal Access Token (PAT) with `read:user` scope, save it in your repo secrets as `TREE_PAT`, and use `${{ secrets.TREE_PAT }}`.

### Embed in Your README.md
Add this anywhere in your `README.md`:

```markdown
<!-- commit-tree-start -->
![tree](tree.gif?v=1788515413990)
<!-- commit-tree-end -->
```

The action will automatically generate `tree.gif`, update your `README.md`, and commit the changes!

---

## Action Inputs & Options

| Input             | Default      | Description                                      |
|-------------------|--------------|--------------------------------------------------|
| `github-token`    | *(Required)* | GitHub Token or PAT with `read:user` scope |
| `github-login`    | `repository_owner`    | GitHub username (defaults to repo owner)   |
| `tree-type`       | `oak`        | Biome tree type (`oak`, `sakura`, `spruce`, `birch`) |
| `show-signpost`   | `true`       | Render wooden streak stat signpost on the grass  |
| `show-bee`        | `true`       | Render animated Minecraft bee around the tree    |
| `output-path`     | `tree.gif`   | Filepath where the generated GIF is written      |
| `markdown-path`   | `README.md`  | Markdown file to update (set empty to disable)   |
| `auto-commit`     | `true`       | Automatically commits & pushes updated files     |
| `commit-message`  | `chore: update commit tree [skip ci]` | Commit message for auto-commit |
| `days`            | `140`        | Days of history to fetch for commit leaves (~14–20 weekly branches)|
| `pr-days`         | `14`         | Recency timer in days for flowers, red apples, and golden apples |
| `city`            | `""`         | City for live weather (e.g. `London`, `Tokyo`, `New York`, `Paris`)|
| `weather`         | `auto`       | Manual weather override (`auto`, `sunny`, `night`, `rain`, `snow`, `cloudy`)|
| `frames`          | `20`         | Number of animation frames in the loop           |
| `frame-delay-ms`  | `100`        | Frame delay in milliseconds                      |
| `width`           | `460`        | Canvas width in pixels                           |
| `height`          | `420`        | Canvas height in pixels                          |

## Action Outputs

| Output          | Description                                            |
|-----------------|--------------------------------------------------------|
| `gif-path`      | Absolute path to the generated GIF                     |
| `total-commits` | Total commits counted in the date range                |
| `current-streak`| Current consecutive active commit streak in days       |
| `open-prs`      | Total open pull requests authored by the user          |
| `merged-prs`    | Total merged pull requests                             |
| `assigned-prs`  | Total open pull requests assigned to the user          |
| `weather-type`  | Detected or active weather type (`sunny`, `night`, `rain`, etc.)|
| `weather-desc`  | Description of current weather                         |
| `tree-type`     | Selected biome variety (`oak`, `sakura`, `spruce`, `birch`)|

---

## Local Development & Testing

Generate local sample GIFs for all biomes and weather conditions without needing a token:

```bash
npm run generate:mock
```

Run test suite:

```bash
npm test
```

Build action bundle:

```bash
npm run build
```

## Contributors 👥
Big thanks to all of the amazing people who have helped by contributing to this project!

<a href="https://github.com/nivinvysakh/gh-tree/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=nivinvysakh/gh-tree" />
</a>

---

<div align="center">

[![GitHub Action](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/marketplace/actions/minecraft-commit-tree)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
[![Licence](https://img.shields.io/github/license/Ileriayo/markdown-badges?style=for-the-badge)](./LICENSE)

</div>