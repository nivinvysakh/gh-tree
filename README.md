<div align="center">

# gh-tree 🌴


<!-- commit-tree-start -->
![tree](tree.gif?v=1788539560947)
<!-- commit-tree-end -->


<p>
  <b>Renders your GitHub contribution graph and pull requests as an animated Minecraft Oak, Sakura, Spruce, or Birch Tree with transparent background, live weather, and gamer collectibles.</b>
</p>

</div>

---

- **Minecraft Tree Biomes 🌸🌲⚪🌳** — choose between **Sakura / Cherry Blossom** (with falling pink petals), **Spruce Taiga**, **Birch Forest**, or classic **Oak**.
- **Minecraft Oak / Sakura Leaves** — weekly commits drive the lushness and color intensity levels (Level 0 dormant to Level 4 rich emerald/pink) across the 14 canopy blocks.
- **Minecraft Pet Companions 🐾 (Wolf 🐺, Fox 🦊, Cat 🐱)** — tamed red-collared **Wolf** (tail-wagging with active streaks $\ge 14\text{d}$), sleeping/waking orange **Fox** (curled up during day, alert at night for streak $\ge 7\text{d}$), and cute **Tuxedo Cat**.
- **Roasting Campfire 🔥** — crackling campfire with rising smoke particles and flying ember sparks during high-velocity sprint periods.
- **Milestone Treasure Chests 📦 (Wood, Iron, Gold, Diamond, Ender)** — treasure chests sitting on the lawn leveling up as your total commit milestones grow!
- **Seasonal Holiday Modes 🎃🎄🎆** — auto-detects or manual **Halloween** (glowing Jack-o'-Lantern), **Holiday Christmas** (twinkling canopy fairy lights & wrapped gifts), and **New Year Fireworks** (colorful sky starbursts).
- **Wooden & Milestone Stat Signposts 🪧 (Wood, Gold 🪙, Diamond 💎)** — a pixelated signpost displaying your live streak with smart auto-scaling (`14d`, `100d`, `1.2k`), leveling up with glowing ink & royal crowns for Century Club ($\ge 100\text{d}$) and 1-Year ($\ge 365\text{d}$) streaks!
- **Minecraft Bee 🐝 & Streak Beehive 🍯** — an animated buzzing bee with fluttering wings and a wooden beehive on the trunk celebrating your active commit streak.
- **Underground Ore Blocks 💎 (Netherite, Gold, Diamond, Emerald, Lapis Lazuli, Redstone)** — embedded in the dirt layer featuring creator-exclusive **Netherite** (`@nivinvysakh`), **Lapis Lazuli** exclusively for verified `nivinvysakh/gh-tree` contributors, and productivity milestone ores.
- **Minecraft Flowers 🌸 (Open PRs)** — up to 4 colorful flowers (Poppies, Dandelions, Tulips, Sakura) planted on the lawn.
- **Minecraft Red Apples 🍎 (Merged PRs)** — up to 4 ripe red apples hanging beneath the canopy leaf blocks.
- **Minecraft Golden Apples 🍏✨ (Assigned PRs / Reviews)** — up to 4 enchanted golden apples placed on the lawn.
- **Live Weather & Day/Night Cycle ☀️🌕🌧️❄️☁️** — real-time weather integration (via Open-Meteo) rendering animated Sun, Starry Night Moon & twinkling stars, Rain streaks & splashes, Snowfall & snow caps, or Drifting clouds.
- **Transparent Background** — pure alpha transparency that seamlessly blends into dark and light GitHub profiles and READMEs.

---

## Biome & Tree Varieties Showcase 🌸🌲⚪🌳

| **Classic Oak 🌳** (`tree-type: oak`) | **Sakura Cherry Blossom 🌸** (`tree-type: sakura`) |
| :---: | :---: |
| ![Oak](tree.gif) | ![Sakura](assets/tree-sakura.gif) |
| *Classic Oak, Wolf Pet, Campfire & Chest* | *Cherry blossom pinks, Cat Pet & falling petals* |

| **Taiga Spruce 🌲** (`tree-type: spruce`) | **Birch Forest ⚪** (`tree-type: birch`) |
| :---: | :---: |
| ![Spruce](assets/tree-spruce.gif) | ![Birch](assets/tree-birch.gif) |
| *Dark coniferous needles, Fox & spruce bark* | *White notched birch bark & Wolf pet* |

---

## Seasonal Holiday Events Showcase 🎃🎄🎆

| **Spooky Halloween 🎃** (`event: halloween`) | **Winter Holiday Christmas 🎄** (`event: holiday`) | **New Year Fireworks 🎆** (`event: fireworks`) |
| :---: | :---: | :---: |
| ![Halloween](assets/tree-halloween.gif) | ![Holiday](assets/tree-holiday.gif) | ![Fireworks](assets/tree-fireworks.gif) |
| *Carved Jack-o'-Lantern & Cat Pet* | *Twinkling fairy lights, gifts & snow* | *Sky starburst fireworks, Campfire & Fox* |

---

## Live Weather & Day/Night Showcase 🌦️🐾

| **Starry Night 🌕✨** (`weather: night`) | **Rainy 🌧️** (`weather: rain`) |
| :---: | :---: |
| ![Night](assets/tree-night.gif) | ![Rain](assets/tree-rain.gif) |
| *Starry night sky, alert Fox & Moon* | *Slanted rain streaks & splashes* |

| **Snowy ❄️** (`weather: snow`) | **Cloudy ☁️** (`weather: cloudy`) |
| :---: | :---: |
| ![Snow](assets/tree-snow.gif) | ![Cloudy](assets/tree-cloudy.gif) |
| *Fluttering snow & snow-capped leaves* | *Multi-layered drifting overcast clouds & Fox* |

---

## 🎮 Minecraft Collectibles & Game Mechanics

gh-tree turns your GitHub contributions into living Minecraft collectibles and milestones:

### 🐾 Minecraft Pet Companions & Campfire

| Companion / Prop | Appearance & Behavior | Unlock Condition |
| :--- | :--- | :--- |
| **Tamed Wolf 🐺** | Sits loyally on the lawn with a red collar and wagging tail. | **Current streak ≥ 14 days** (or `pet: wolf`) |
| **Sleeping / Alert Fox 🦊** | Curls up sleeping during the day; wakes up and stays alert at night. | **Current streak ≥ 7 days** or active commits (or `pet: fox`) |
| **Tuxedo Cat 🐱** | Sits peacefully under the tree canopy with glowing emerald eyes. | **Current streak ≥ 3 days** or ≥ 25 commits (or `pet: cat`) |
| **Roasting Campfire 🔥** | Crackling campfire with crossed logs, flickering flame tongues, and rising smoke. | **Sprint mode**: ≥ 12 commits in recent 2 weeks, streak ≥ 10d, or ≥ 60 total commits (or `show-campfire: true`) |
| **Milestone Chests 📦** | Leveling treasure chests: **Wood** (≥ 15 commits) 🪵 $\rightarrow$ **Iron** (≥ 50) ⚙️ $\rightarrow$ **Gold** (≥ 150) 🪙 $\rightarrow$ **Diamond** (≥ 300) 💎 $\rightarrow$ **Ender Chest** (≥ 500) 🌌 | Total commits in date range (or `show-chest: true`) |
| **Seasonal Events 🎃🎄🎆** | **Halloween** (Jack-o'-Lantern), **Holiday** (Fairy lights & gift boxes), **New Year** (Fireworks) | Auto-detected by month (Oct, Dec, Jan) or `event: halloween \| holiday \| fireworks` |

---

### 💎 Underground Ore Blocks

Embedded in the underground dirt layer beneath your tree, 6 distinct ore blocks unlock as you hit maintainer, contributor, and productivity milestones:

| Ore Block | Appearance | Unlock Condition | What It Represents |
| :--- | :---: | :--- | :--- |
| **Netherite / Ancient Debris** 🪨 | <img src="assets/ore-netherite.svg" width="48" height="40" alt="Netherite Ore" /><br>*(Slot 0: Far-Left)* | **Action Creator Exclusive** (`@nivinvysakh` or `is-owner: true`) | **👑 gh-tree Creator & Maintainer** — Minecraft's rarest material, awarded exclusively to the author of the action! |
| **Gold Ore** 🪙 | <img src="assets/ore-gold.svg" width="48" height="40" alt="Gold Ore" /><br>*(Slot 1: Mid-Left 1)* | • **Current streak ≥ 7 days**, *OR*<br>• **≥ 50 total commits** | **⚡ Streak Dedication** — milestone for sustained rhythm and week-long consistency. |
| **Diamond Ore** 💎 | <img src="assets/ore-diamond.svg" width="48" height="40" alt="Diamond Ore" /><br>*(Slot 2: Mid-Left 2)* | • **≥ 25 total commits** in date range, *OR*<br>• **≥ 1 merged PR** | **💎 Active Contributor** — milestone for regular code contributions and PR merges. |
| **Emerald Ore** ❇️ | <img src="assets/ore-emerald.svg" width="48" height="40" alt="Emerald Ore" /><br>*(Slot 3: Mid-Right 1)* | • **≥ 100 total commits** in date range, *OR*<br>• Any weekly branch reaching **Level 4** (30+ commits/week) | **🏆 Power Contributor** — rare milestone awarded for high commit volume and intense development sprints. |
| **Lapis Lazuli Ore** 🔷 | <img src="assets/ore-lapis.svg" width="48" height="40" alt="Lapis Lazuli Ore" /><br>*(Slot 4: Mid-Right 2)* | **Contributed to `nivinvysakh/gh-tree`** (verified via GitHub API or `is-contributor: true`) | **🤝 `gh-tree` Contributor Badge** — special celestial blue ore awarded exclusively to developers who have contributed code/PRs to the [nivinvysakh/gh-tree](https://github.com/nivinvysakh/gh-tree) repository! |
| **Redstone Ore** 🔴 | <img src="assets/ore-redstone.svg" width="48" height="40" alt="Redstone Ore" /><br>*(Slot 5: Far-Right)* | • **Merged PRs ≥ 2**, *OR*<br>• **Total PR activity ≥ 3**, *OR*<br>• **Current streak ≥ 14 days** | **⚙️ Engineering & Automation** — milestone honoring pull request lifecycle, code reviews, and multi-week streaks. |

---

### 🍃 Canopy Leaves & Trees
- **14 Weekly Canopy Blocks**: 14 distinct branches representing your recent contribution weeks.
- **Commit Intensity**: Leaf colors dynamically transition across 5 levels from **Level 0** (dormant/dry) up to **Level 4** (lush emerald or vibrant sakura pink) based on weekly commit volume.

### 🌸🍎🍏 Pull Request Collectibles
- **Flowers 🌸 (Open PRs)**: Up to 4 colorful Minecraft flowers (Poppies, Dandelions, Tulips, Sakura) planted across the grass lawn.
- **Red Apples 🍎 (Merged PRs)**: Up to 4 ripe red apples hanging beneath the canopy leaf blocks.
- **Golden Apples 🍏✨ (Assigned PRs / Reviews)**: Up to 4 enchanted golden apples placed on the lawn.

### 🪧 Wooden & Milestone Stat Signposts & 🐝 Beehive
- **Wooden & Milestone Stat Signposts 🪧**: Renders your active consecutive commit streak using a crisp pixel font and smart auto-scaling (`14d`, `100d`, `365d`, `1.2k`). Features progressive milestone tiers:
  - 🪵 **Classic Oak Signpost** (`< 100` days): Warm carved wooden board with high-contrast golden star.
  - 🪙 **Golden Milestone Signpost** ($\ge 100$ days): Golden inlay frame, glowing warm gold ink, and a royal gold crown 👑 for the Century Club!
  - 💎 **Diamond Milestone Signpost** ($\ge 365$ days): Prismatic diamond teal frame, glowing diamond-cyan ink, and an illuminated diamond crown 👑 for 1+ year streaks!
- **Beehive 🍯 & Animated Bee 🐝**: A wooden beehive appears on the trunk for active streaks (≥ 3 days) or ≥ 25 commits, while an animated Minecraft bee buzzes around the tree during fair weather.

| **Classic Oak Signpost 🪵** (`< 100` days) | **Century Club Gold Signpost 🪙👑** (`≥ 100` days) | **Diamond 1-Year Signpost 💎👑** (`≥ 365` days) |
| :---: | :---: | :---: |
| ![Classic Oak Signpost](assets/tree-streak-14.gif) | ![Golden Signpost](assets/tree-streak-100.gif) | ![Diamond Signpost](assets/tree-streak-365.gif) |
| *Standard carved wood board & Star* | *Golden frame, glowing gold text & Crown* | *Prismatic teal frame, glowing cyan text & Crown* |

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

Customize your tree with biomes, pet companions, campfire, milestone chests, seasonal events, and live weather:

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
          # Companion pet companion: auto | wolf | fox | cat | none
          pet: "auto"
          # Roasting campfire & milestone treasure chest: auto | true | false
          show-campfire: "auto"
          show-chest: "auto"
          # Seasonal holiday event: auto | halloween | holiday | fireworks | none
          event: "auto"
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
![tree](tree.gif?v=1788539560947)
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
| `pet`             | `auto`       | Minecraft pet companion (`auto`, `wolf`, `fox`, `cat`, `none`) |
| `show-campfire`   | `auto`       | Render roasting campfire during active sprints (`auto`, `true`, `false`) |
| `show-chest`      | `auto`       | Render milestone treasure chest (`auto`, `true`, `false`) |
| `event`           | `auto`       | Seasonal holiday event (`auto`, `halloween`, `holiday`, `fireworks`, `none`) |
| `show-signpost`   | `true`       | Render wooden streak stat signpost on the grass  |
| `show-bee`        | `true`       | Render animated Minecraft bee around the tree    |
| `is-owner`        | `auto`       | Unlocks creator-exclusive Netherite Ore (`@nivinvysakh`) |
| `is-contributor`  | `auto`       | Unlocks Lapis Lazuli Ore (verified for `nivinvysakh/gh-tree` contributors) |
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
| `weather-type`  | Detected or active weather type (`sunny`, `night`, `rain`, `snow`, `cloudy`)|
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