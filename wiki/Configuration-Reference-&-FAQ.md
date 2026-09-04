# ⚙️ Action Inputs, Outputs & FAQ

Complete technical reference for all **`gh-tree`** GitHub Action parameters.

---

## 📥 Action Inputs

| Input | Type | Default | Description |
| :--- | :---: | :---: | :--- |
| `github-token` | `string` | *(Required)* | GitHub Token or PAT with `read:user` scope. |
| `github-login` | `string` | `repository_owner` | Target GitHub username whose activity drives the tree. |
| `tree-type` | `string` | `oak` | Biome variety: `oak`, `sakura`, `spruce`, `birch`. |
| `pet` | `string` | `auto` | Companion pet: `auto`, `wolf`, `fox`, `cat`, `none`. |
| `show-campfire` | `string` | `auto` | Roasting campfire toggle: `auto`, `true`, `false`. |
| `show-chest` | `string` | `auto` | Milestone treasure chest toggle: `auto`, `true`, `false`. |
| `event` | `string` | `auto` | Seasonal holiday event: `auto`, `halloween`, `holiday`, `fireworks`, `none`. |
| `show-signpost` | `boolean` | `true` | Wooden streak stat signpost on lawn. |
| `show-bee` | `boolean` | `true` | Animated Minecraft bee hovering near canopy. |
| `is-owner` | `string` | `auto` | Unlocks creator-exclusive Netherite Ore (`@nivinvysakh`). |
| `is-contributor` | `string` | `auto` | Unlocks Lapis Lazuli Ore (verified for `nivinvysakh/gh-tree` contributors). |
| `city` | `string` | `""` | City for Open-Meteo live weather (e.g. `London`, `Tokyo`, `New York`). |
| `weather` | `string` | `auto` | Manual weather override: `auto`, `sunny`, `night`, `rain`, `snow`, `cloudy`. |
| `days` | `number` | `140` | Total history days fetched for 14 weekly canopy tiers. |
| `pr-days` | `number` | `14` | Recency window in days for flowers, red apples, and golden apples. |
| `output-path` | `string` | `tree.gif` | File path where generated GIF is saved. |
| `markdown-path` | `string` | `README.md` | Markdown file to auto-update with the GIF marker. |
| `auto-commit` | `boolean` | `true` | Automatically commits & pushes updated files to branch. |
| `commit-message` | `string` | `chore: update commit tree [skip ci]` | Git commit message. |
| `frames` | `number` | `20` | Number of animation frames in the loop. |
| `frame-delay-ms` | `number` | `100` | Frame delay in milliseconds. |
| `width` | `number` | `460` | Canvas width in pixels. |
| `height` | `number` | `420` | Canvas height in pixels. |

---

## 📤 Action Outputs

| Output | Description |
| :--- | :--- |
| `gif-path` | Absolute filepath to the generated GIF. |
| `total-commits` | Total commits counted in the date range. |
| `current-streak` | Current active commit streak in days. |
| `open-prs` | Total open pull requests authored by user. |
| `merged-prs` | Total merged pull requests. |
| `assigned-prs` | Total assigned pull requests / reviews. |
| `weather-type` | Active weather condition type (`sunny`, `night`, `rain`, `snow`, `cloudy`). |
| `weather-desc` | Text description of the current weather. |
| `tree-type` | Selected tree biome type (`oak`, `sakura`, `spruce`, `birch`). |

---

## ❓ Frequently Asked Questions (FAQ)

### Why doesn't the tree show my private commits?
The default `${{ secrets.GITHUB_TOKEN }}` provided by GitHub Actions only has access to public data. Create a Personal Access Token (PAT) with `read:user` scope and pass it via `${{ secrets.TREE_PAT }}` (see [Getting Started](Getting-Started)).

### How do I prevent infinite CI runs when auto-committing?
By default, `gh-tree` includes `[skip ci]` in the commit message, which tells GitHub Actions not to trigger subsequent workflow runs.
