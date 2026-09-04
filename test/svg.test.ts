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

  it("renders Minecraft bee, beehive, signpost, and diamond/emerald ore blocks", () => {
    const svg = renderFrame(mockLayout, 0, 20);

    // Bee Cyan eye & yellow body
    expect(svg).toContain('fill="#40c4ff"');
    expect(svg).toContain('fill="#fbc02d"');

    // Wooden Stat Signpost with star and carved pixels
    expect(svg).toContain("<!-- Minecraft Wooden Stat Signpost -->");
    expect(svg).toContain('fill="#ffd600"');

    // Diamond Ore (#00e5ff) & Emerald Ore (#00e676)
    expect(svg).toContain('fill="#00e5ff"');
    expect(svg).toContain('fill="#00e676"');
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

  it("animates across frames", () => {
    const frame0 = renderFrame(mockLayout, 0, 20);
    const frame5 = renderFrame(mockLayout, 5, 20);

    expect(frame0).toBeDefined();
    expect(frame5).toBeDefined();
  });
});
