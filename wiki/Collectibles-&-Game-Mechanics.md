# 🐾 Minecraft Companions, Collectibles & Game Mechanics

`gh-tree` turns your development consistency, streaks, and pull requests into interactive Minecraft collectibles.

---

## 👨‍🌾 Human Farmer (`show-farmer: auto | true | false`, `farmer-mood: auto | sad | dancing | watering`) {#farmer}

The human Minecraft Farmer stands loyally under the right side of the tree canopy, caring for the tree and reacting to your development velocity:

| Mood / Activity | Trigger Condition | Visual & Animation Details |
| :--- | :--- | :--- |
| 😢 **Sad Farmer** | **Dormant tree** ($0$ commits or all dormant leaves) | Slumped posture, drooping straw hat, downcast sad eyes, falling tear droplet, and holding a withered dry twig. |
| 💧 **Watering Farmer** | **Neutral / Steady Growth** ($1$–$29$ commits) | Holding an Iron Water Bucket tilted toward the trunk, streaming sparkling cyan water with animated splash droplets onto the roots. |
| 💃 **Dancing Farmer** | **Flourishing / Cherished Tree** ($\ge 30$ commits, streak $\ge 7\text{d}$, or active sprint) | Energetic hopping harvest dance, smiling rosy cheeks, waving golden wheat stalk, and floating celebration sparkles! |

---

## 🐾 Animal Companion Pets (`pet: auto | wolf | fox | cat | parrot | none`) {#pets}

Animal companion mobs sit and play on the **left side** of the tree canopy:

| Companion | Unlock Condition (Auto Mode) | Visual Behavior |
| :--- | :--- | :--- |
| **Red Macaw Parrot 🦜** | **Selected via `pet: parrot`** (or Jungle biome) | Perches on lawn with scarlet feathers, tri-color wings (red ➔ yellow ➔ blue), crested head, and an animated dancing head bob & tail flutter! |
| **Tamed Wolf 🐺** | **Current streak ≥ 14 days** | Sits loyally under the canopy with a vibrant red collar, golden tag, and a happy wagging tail. |
| **Sleeping / Alert Fox 🦊** | **Current streak ≥ 7 days** | Curls up peacefully sleeping during the daytime; wakes up alert with perked ears and twitching tail at night! |
| **Tuxedo Cat 🐱** | **Current streak ≥ 3 days** or ≥ 25 total commits | Sits gracefully under the tree with glowing emerald green eyes, cyan collar, and swishing tail. |

---

## 🔥 Roasting Campfire (`show-campfire: auto | true | false`) {#campfire}

- **Active Sprint Celebration**: Ignites during high-velocity development periods ($\ge 12$ commits in recent 2 weeks, streak $\ge 10\text{d}$, or total $\ge 60$ commits).
- **Visuals**: Crossed dark oak logs base, glowing red/orange ember coal bed, 3 dynamic independently flickering flame tongues, floating spark embers, and rising translucent smoke puffs.

---

## 📦 Milestone Treasure Chests (`show-chest: auto | true | false`) {#chests}

As your total contributions grow across the date range, your lawn treasure chest levels up:

| Tier | Total Commits | Appearance |
| :--- | :--- | :--- |
| 🪵 **Wooden Chest** | $\ge 15$ commits | Classic oak chest with iron latch. |
| ⚙️ **Iron Chest** | $\ge 50$ commits | Sturdy steel plate armor frame. |
| 🪙 **Golden Chest** | $\ge 150$ commits | Polished gold with animated glint sparkle. |
| 💎 **Diamond Chest** | $\ge 300$ commits | Brilliant cyan diamond body with animated glint sparkle. |
| 🌌 **Ender Chest** | $\ge 500$ commits | Deep obsidian/teal body, flush ground alignment, authentic **Eye of Ender** center lock, and floating mystical portal particles! |

---

## 🪧 Stat Signposts & Auto-Scaling {#signposts}

Displays your live active streak with smart auto-scaling (`14d`, `100d`, `1.2k`) and progressive milestone themes:

- 🪵 **Classic Oak Signpost** (`< 100` days): Warm carved wooden board with high-contrast golden star.
- 🪙 **Golden Milestone Signpost** ($\ge 100$ days — *Century Club!*): Golden frame inlay, glowing warm gold ink (`#fff9c4`), and a royal gold crown 👑.
- 💎 **Diamond Milestone Signpost** ($\ge 365$ days — *1-Year Streak!*): Prismatic diamond teal frame, glowing cyan ink (`#e0f7fa`), and an illuminated diamond crown 👑.

---

## 🌸🍎🍏 Pull Request Collectibles {#pr-collectibles}

- **🌸 Minecraft Flowers (Open PRs)**: Up to 4 colorful flowers (Poppies, Dandelions, Tulips, Sakura) planted across the grass lawn.
- **🍎 Red Apples (Merged PRs)**: Up to 4 ripe red apples hanging beneath the canopy leaf blocks.
- **🍏✨ Golden Apples (Reviews & Assigned PRs)**: Up to 4 enchanted golden apples placed on the lawn edges.
- **🐝 Beehive & Animated Bee**: A wooden beehive appears on the trunk (streak $\ge 3\text{d}$ or $\ge 25$ commits) while an animated Minecraft bee buzzes around the canopy.
