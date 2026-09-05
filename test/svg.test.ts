import { describe, it, expect } from "vitest";
import { renderFrame } from "../src/svg";
import { TreeLayout } from "../src/tree";

describe("Minecraft SVG module", () => {
  const mockLayout: TreeLayout = {
    width: 460,
    height: 420,
    groundY: 370,
    trunkX: 206,
    treeType: "oak",
    trunkBlocks: [
      { x: 206, y: 226, size: 48 },
      { x: 206, y: 274, size: 48 },
      { x: 206, y: 322, size: 48 },
    ],
    leafBlocks: [
      { gridX: 0, gridY: 0, x: 206, y: 226, size: 48, commitCount: 30, commitLevel: 4, weekIndex: 0 },
      { gridX: 1, gridY: 0, x: 254, y: 226, size: 48, commitCount: 10, commitLevel: 2, weekIndex: 1 },
      { gridX: 0, gridY: -3, x: 206, y: 82, size: 48, commitCount: 0, commitLevel: 0, weekIndex: 13 },
    ],
    flowers: [
      { x: 130, y: 349, width: 18, height: 24, type: "poppy", side: "left" },
    ],
    apples: [
      { x: 264, y: 272, size: 20, gridX: 1 },
    ],
    goldenApples: [
      { x: 163, y: 352, size: 20, side: "left" },
    ],
    oreBlocks: [
      { x: 104, y: 386, type: "diamond" },
      { x: 312, y: 386, type: "emerald" },
    ],
    bee: { x: 162, y: 254 },
    beehive: { x: 252, y: 280, side: "right" },
    signpost: { x: 62, y: 344, streak: 12 },
    totalCommits: 40,
    currentStreak: 12,
    openPRs: 1,
    mergedPRs: 1,
    assignedPRs: 1,
    weather: { type: "sunny", description: "Clear sky" },
  };

  it("renders a transparent background SVG string with grass ground, sun, clouds, and Minecraft tree", () => {
    const svg = renderFrame(mockLayout, 0, 20);

    expect(svg).toContain('<svg width="460" height="420"');
    expect(svg).toContain('viewBox="0 0 460 420"');
    expect(svg).toContain("</svg>");
    expect(svg).toContain('shape-rendering="crispEdges"');

    // Sun & Clouds
    expect(svg).toContain('fill="#fbc02d"');
    expect(svg).toContain('fill="#cfd8dc"');

    // Grass & Dirt ground
    expect(svg).toContain('fill="#7cb342"');
    expect(svg).toContain('fill="#5d4037"');
  });

  it("renders authentic Minecraft 16x16 pixel textures for logs, leaves, flowers on grass, apples, and golden apples", () => {
    const svg = renderFrame(mockLayout, 0, 20);

    // Oak log base wood brown
    expect(svg).toContain('fill="#6d4934"');
    // Level 4 rich emerald leaf color
    expect(svg).toContain('fill="#1a6b24"');
    // Level 0 pale dormant leaf color
    expect(svg).toContain('fill="#8d7b68"');
    // Poppy flower color
    expect(svg).toContain('fill="#e63946"');
    // Red Apple color
    expect(svg).toContain('fill="#d90429"');
    // Golden Apple color
    expect(svg).toContain('fill="#ffb703"');
  });

  it("renders Minecraft bee, beehive, signpost, and diamond, emerald, gold, redstone, lapis, netherite ore blocks", () => {
    const layoutWithAllOres: TreeLayout = {
      ...mockLayout,
      oreBlocks: [
        { x: 20, y: 386, type: "netherite" },
        { x: 76, y: 386, type: "gold" },
        { x: 132, y: 386, type: "diamond" },
        { x: 280, y: 386, type: "emerald" },
        { x: 336, y: 386, type: "lapis" },
        { x: 392, y: 386, type: "redstone" },
      ],
    };
    const svg = renderFrame(layoutWithAllOres, 0, 20);

    // Bee Cyan eye & yellow body
    expect(svg).toContain('fill="#40c4ff"');
    expect(svg).toContain('fill="#fbc02d"');

    // Wooden Stat Signpost with star and carved pixels
    expect(svg).toContain("<!-- Minecraft Wooden Stat Signpost -->");
    expect(svg).toContain('fill="#ffd600"');

    // Diamond Ore (#00e5ff), Emerald Ore (#00e676), Gold Ore (#ffd600), Redstone Ore (#ff1744)
    expect(svg).toContain('fill="#00e5ff"');
    expect(svg).toContain('fill="#00e676"');
    expect(svg).toContain('fill="#ffd600"');
    expect(svg).toContain('fill="#ff1744"');

    // Lapis Lazuli Ore (#1d57b8 + pyrite #ffd54f)
    expect(svg).toContain('fill="#1d57b8"');
    expect(svg).toContain('fill="#ffd54f"');

    // Netherite / Ancient Debris Block (#2b2622 + metallic bronze #d4a373)
    expect(svg).toContain('fill="#2b2622"');
    expect(svg).toContain('fill="#d4a373"');
  });

  it("renders sakura biome with pink cherry leaves, dark log, and falling petals", () => {
    const sakuraLayout: TreeLayout = {
      ...mockLayout,
      treeType: "sakura",
    };

    const svg = renderFrame(sakuraLayout, 0, 20);

    // Vibrant pink sakura leaf
    expect(svg).toContain('fill="#c9184a"');
    // Dark cherry bark
    expect(svg).toContain('fill="#422927"');
    // Falling petals
    expect(svg).toContain('fill="#ff758f"');
  });

  it("renders spruce biome and birch biome correctly", () => {
    const spruceLayout: TreeLayout = { ...mockLayout, treeType: "spruce" };
    const spruceSvg = renderFrame(spruceLayout, 0, 20);
    expect(spruceSvg).toContain('fill="#3b2716"'); // Dark spruce log

    const birchLayout: TreeLayout = { ...mockLayout, treeType: "birch" };
    const birchSvg = renderFrame(birchLayout, 0, 20);
    expect(birchSvg).toContain('fill="#e5e5e5"'); // White birch bark
  });

  it("renders rain streaks and storm clouds in rain weather", () => {
    const rainLayout: TreeLayout = {
      ...mockLayout,
      weather: { type: "rain", description: "Rain showers" },
    };

    const svg = renderFrame(rainLayout, 0, 20);

    // Blue rain streaks
    expect(svg).toContain('fill="#64b5f6"');
    // Storm cloud shadow
    expect(svg).toContain('fill="#607d8b"');
  });

  it("renders falling snowflakes and snowy caps in snow weather", () => {
    const snowLayout: TreeLayout = {
      ...mockLayout,
      weather: { type: "snow", description: "Snowfall" },
    };

    const svg = renderFrame(snowLayout, 0, 20);

    // Snow ground top
    expect(svg).toContain('fill="#eceff1"');
  });

  it("renders Minecraft Moon, stars, and night clouds in night mode", () => {
    const nightLayout: TreeLayout = {
      ...mockLayout,
      weather: { type: "night", description: "Clear starry night", isDay: false },
    };

    const svg = renderFrame(nightLayout, 0, 20);

    // Minecraft Moon craters & lunar frame
    expect(svg).toContain('fill="#b0bec5"');
    expect(svg).toContain('fill="#cfd8dc"');
    // Twinkling stars
    expect(svg).toContain('fill="#fff9c4"');
    // Sun should NOT be present in night mode
    expect(svg).not.toContain("<!-- Minecraft Sun -->");
    expect(svg).toContain("<!-- Minecraft Moon -->");
  });

  it("prioritizes rain and snow precipitation without particle overlapping during sakura biome", () => {
    const sakuraRainLayout: TreeLayout = {
      ...mockLayout,
      treeType: "sakura",
      weather: { type: "rain", description: "Rain showers" },
    };

    const svg = renderFrame(sakuraRainLayout, 0, 20);

    // Rain streaks are rendered
    expect(svg).toContain('fill="#64b5f6"');
    // Bee and sakura falling petals are hidden to prevent particle collision
    expect(svg).not.toContain("<!-- Minecraft Bee -->");
  });

  describe("Skin & Weather Combinations Matrix", () => {
    const biomes: ("oak" | "sakura" | "spruce" | "birch")[] = ["oak", "sakura", "spruce", "birch"];
    const weathers: { type: "sunny" | "rain" | "snow" | "night" | "cloudy"; isDay?: boolean }[] = [
      { type: "sunny", isDay: true },
      { type: "rain", isDay: true },
      { type: "snow", isDay: true },
      { type: "night", isDay: false },
      { type: "cloudy", isDay: true },
    ];

    for (const biome of biomes) {
      for (const w of weathers) {
        it(`renders ${biome} tree in ${w.type} weather correctly`, () => {
          const layout: TreeLayout = {
            ...mockLayout,
            treeType: biome,
            weather: { type: w.type, description: `${w.type} weather`, isDay: w.isDay },
          };

          const svg = renderFrame(layout, 0, 10);
          expect(svg).toContain('<svg width="460" height="420"');
          expect(svg).toContain("</svg>");

          // Weather-specific checks
          if (w.type === "rain") {
            expect(svg).toContain('fill="#64b5f6"'); // Rain streaks
            expect(svg).not.toContain("<!-- Minecraft Bee -->"); // Bee rests in hive
          } else if (w.type === "snow") {
            expect(svg).toContain('fill="#eceff1"'); // Snow ground
            expect(svg).not.toContain("<!-- Minecraft Bee -->"); // Bee rests in hive
          } else if (w.type === "night") {
            expect(svg).toContain("<!-- Minecraft Moon -->");
            expect(svg).not.toContain("<!-- Minecraft Sun -->");
          } else if (w.type === "sunny") {
            expect(svg).toContain("<!-- Minecraft Sun -->");
          }
        });
      }
    }
  });

  it("renders Minecraft Pet Companions (Wolf, Fox, Cat) with animations", () => {
    // Wolf
    const wolfLayout: TreeLayout = {
      ...mockLayout,
      pet: { x: 172, y: 350, type: "wolf", state: "sitting" },
    };
    const wolfSvg = renderFrame(wolfLayout, 0, 20);
    expect(wolfSvg).toContain("<!-- Minecraft Tamed Wolf -->");
    expect(wolfSvg).toContain('fill="#d32f2f"'); // Red collar

    // Fox (Sleeping)
    const foxSleepLayout: TreeLayout = {
      ...mockLayout,
      pet: { x: 172, y: 350, type: "fox", state: "sleeping" },
      weather: { type: "sunny", description: "Sunny" },
    };
    const foxSleepSvg = renderFrame(foxSleepLayout, 0, 20);
    expect(foxSleepSvg).toContain("<!-- Minecraft Sleeping Fox -->");
    expect(foxSleepSvg).toContain('fill="#e65100"'); // Orange fur

    // Fox (Alert at night)
    const foxNightLayout: TreeLayout = {
      ...mockLayout,
      pet: { x: 172, y: 350, type: "fox", state: "standing" },
      weather: { type: "night", description: "Night", isDay: false },
    };
    const foxNightSvg = renderFrame(foxNightLayout, 0, 20);
    expect(foxNightSvg).toContain("<!-- Minecraft Alert Fox -->");

    // Cat
    const catLayout: TreeLayout = {
      ...mockLayout,
      pet: { x: 172, y: 350, type: "cat", state: "sitting" },
    };
    const catSvg = renderFrame(catLayout, 0, 20);
    expect(catSvg).toContain("<!-- Minecraft Tuxedo Cat -->");
    expect(catSvg).toContain('fill="#00e676"'); // Emerald green cat eyes
  });

  it("renders roasting campfire with crackling flames and rising smoke", () => {
    const campfireLayout: TreeLayout = {
      ...mockLayout,
      campfire: { x: 362, y: 352 },
    };
    const svg = renderFrame(campfireLayout, 0, 20);
    expect(svg).toContain("<!-- Minecraft Roasting Campfire -->");
    expect(svg).toContain('fill="#ff3d00"'); // Outer flame
    expect(svg).toContain('fill="#ffd600"'); // Mid flame
  });



  it("renders milestone treasure chests across wood, iron, gold, diamond, and ender tiers", () => {
    const enderChestLayout: TreeLayout = {
      ...mockLayout,
      chest: { x: 260, y: 350, type: "ender" },
    };
    const enderSvg = renderFrame(enderChestLayout, 0, 20);
    expect(enderSvg).toContain("<!-- Minecraft ENDER Milestone Chest -->");
    expect(enderSvg).toContain('fill="#1a3636"');
    expect(enderSvg).toContain('fill="#00e5ff"'); // Eye of ender latch

    const diamondChestLayout: TreeLayout = {
      ...mockLayout,
      chest: { x: 260, y: 350, type: "diamond" },
    };
    const diamondSvg = renderFrame(diamondChestLayout, 0, 20);
    expect(diamondSvg).toContain("<!-- Minecraft DIAMOND Milestone Chest -->");
    expect(diamondSvg).toContain('fill="#00e5ff"');
  });

  it("renders Halloween Jack-o'-Lantern with glowing carved face", () => {
    const halloweenLayout: TreeLayout = {
      ...mockLayout,
      seasonalEvent: "halloween",
      jackOLantern: { x: 362, y: 352 },
    };
    const svg = renderFrame(halloweenLayout, 0, 20);
    expect(svg).toContain("<!-- Seasonal Halloween Jack-o'-Lantern -->");
    expect(svg).toContain('fill="#e65100"');
    expect(svg).toContain('fill="#558b2f"'); // Stem
  });

  it("renders Holiday Christmas fairy lights and wrapped gift boxes", () => {
    const holidayLayout: TreeLayout = {
      ...mockLayout,
      seasonalEvent: "holiday",
      holidayGifts: [
        { x: 260, y: 358, size: 12, boxColor: "#d32f2f", ribbonColor: "#388e3c" },
      ],
    };
    const svg = renderFrame(holidayLayout, 0, 20);
    expect(svg).toContain("<!-- Holiday Fairy String Lights -->");
    expect(svg).toContain("<!-- Wrapped Gift Box -->");
    expect(svg).toContain('fill="#d32f2f"');
    expect(svg).toContain('fill="#388e3c"');
  });

  it("renders New Year fireworks starbursts exploding in sky", () => {
    const fireworksLayout: TreeLayout = {
      ...mockLayout,
      seasonalEvent: "fireworks",
    };
    const svg = renderFrame(fireworksLayout, 0, 20);
    expect(svg).toContain("<!-- New Year Fireworks -->");
  });

  it("renders upgraded milestone signposts for 100+ and 365+ day streaks with royal crown and glowing ink", () => {
    // 100+ Days: Golden Milestone Signboard with glowing gold text & crown
    const goldSignLayout: TreeLayout = {
      ...mockLayout,
      signpost: { x: 62, y: 344, streak: 120 },
    };
    const goldSvg = renderFrame(goldSignLayout, 0, 20);
    expect(goldSvg).toContain("<!-- Minecraft Golden Milestone Signpost (100+ Streak) -->");
    expect(goldSvg).toContain('fill="#fff9c4"'); // Glowing gold text
    expect(goldSvg).toContain('fill="#ffd54f"'); // Golden trim

    // 365+ Days: Diamond Milestone Signboard with glowing diamond cyan text & crown
    const diamondSignLayout: TreeLayout = {
      ...mockLayout,
      signpost: { x: 62, y: 344, streak: 365 },
    };
    const diamondSvg = renderFrame(diamondSignLayout, 0, 20);
    expect(diamondSvg).toContain("<!-- Minecraft Diamond Milestone Signpost (365+ Streak) -->");
    expect(diamondSvg).toContain('fill="#e0f7fa"'); // Glowing cyan text
    expect(diamondSvg).toContain('fill="#00e5ff"'); // Diamond trim

    // 1000+ Days: Compact notation scaling
    const kSignLayout: TreeLayout = {
      ...mockLayout,
      signpost: { x: 62, y: 344, streak: 1250 },
    };
    const kSvg = renderFrame(kSignLayout, 0, 20);
    expect(kSvg).toContain("<!-- Minecraft Diamond Milestone Signpost (365+ Streak) -->");
  });

  it("animates across frames", () => {
    const frame0 = renderFrame(mockLayout, 0, 20);
    const frame5 = renderFrame(mockLayout, 5, 20);

    expect(frame0).toBeDefined();
    expect(frame5).toBeDefined();
  });
});
