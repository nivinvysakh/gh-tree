# 🎃 Seasonal Holiday Events

**`gh-tree`** automatically detects real-world calendar holidays (or accepts a manual override) to dress up your tree with festive Minecraft holiday decorations!

---

## 📅 Holiday Calendar & Features (`event: auto | halloween | holiday | fireworks | none`)

| Event | Automatic Active Month | Visual Effects & Decorations |
| :--- | :---: | :--- |
| **Spooky Halloween 🎃** | **October** (`Month 9`) | • **Carved Jack-o'-Lantern**: Sits on the lawn with glowing carved toothy grin, glowing eyes, and candle-lit interior.<br>• Pairs well with night mode and the Tuxedo Cat companion! |
| **Winter Holiday / Christmas 🎄** | **December** (`Month 11`) | • **Fairy String Lights**: Multi-colored twinkling festive lights (red, green, gold, blue) draped across the canopy leaf blocks.<br>• **Wrapped Gift Boxes**: Red and golden wrapped gift boxes sitting under the tree with green ribbons. |
| **New Year Fireworks 🎆** | **January** (`Month 0`) | • **Cascading Fireworks**: Cyan, gold, and magenta starburst pixel fireworks bursting across the sky with gravity-affected spark trails. |

---

## 🛠️ Forcing a Seasonal Event

You can celebrate any holiday year-round by passing the `event` input in your workflow:

```yaml
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          event: "halloween" # auto | halloween | holiday | fireworks | none
```
