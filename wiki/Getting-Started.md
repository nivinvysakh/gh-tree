# 🚀 Getting Started with gh-tree

This guide walks you through setting up **`gh-tree`** on your GitHub Profile README or any project repository in less than 2 minutes.

---

## 📋 Step 1: Add HTML Markers to your `README.md`

Place these HTML comment tags in your `README.md` where you want the animated tree to appear:

```markdown
<!-- commit-tree-start -->
![tree](tree.gif)
<!-- commit-tree-end -->
```

The GitHub Action will automatically generate `tree.gif`, replace the content between these tags, and commit the updated image.

---

## ⚡ Step 2: Create the GitHub Actions Workflow

Create a new workflow file at `.github/workflows/tree.yml`:

```yaml
name: Generate Commit Tree

on:
  schedule:
    - cron: '0 0 * * *' # Runs every midnight UTC
  workflow_dispatch:     # Allows manual trigger from GitHub Actions tab
  push:
    branches:
      - main

permissions:
  contents: write

jobs:
  update-tree:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Generate Minecraft Tree
        uses: nivinvysakh/gh-tree@main
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
```

---

## 🔑 Private Repositories & External Commits (Optional)

By default, the default `${{ secrets.GITHUB_TOKEN }}` only sees your public contributions.

If you want your tree to reflect private and organization commits:
1. Go to **[GitHub Settings $\rightarrow$ Developer settings $\rightarrow$ Personal Access Tokens $\rightarrow$ Fine-grained tokens or Tokens (classic)](https://github.com/settings/tokens)**.
2. Generate a token with the `read:user` scope.
3. Go to your repository settings: **Settings $\rightarrow$ Secrets and variables $\rightarrow$ Actions $\rightarrow$ New repository secret**.
4. Name the secret `TREE_PAT` and paste your token value.
5. In your `.github/workflows/tree.yml`, update the token input:

```yaml
        with:
          github-token: ${{ secrets.TREE_PAT }}
```

---

## ⚙️ Customizing Your Tree

You can customize biomes, companions, and city weather in your workflow:

```yaml
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          tree-type: "sakura"     # oak | sakura | spruce | birch
          pet: "auto"             # auto | wolf | fox | cat | none
          city: "Tokyo"           # Live weather via Open-Meteo
          show-campfire: "auto"   # auto | true | false
          show-chest: "auto"      # auto | true | false
          event: "auto"           # auto | halloween | holiday | fireworks | none
```

Next, check out **[Biomes & Trees](Biomes-&-Trees)** and **[Collectibles & Game Mechanics](Collectibles-&-Game-Mechanics)**!
