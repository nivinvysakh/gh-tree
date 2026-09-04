import { describe, it, expect } from "vitest";
import { renderFrame } from "../src/svg";
import { TreeLayout } from "../src/tree";

describe("Minecraft SVG module", () => {
  const mockLayout: TreeLayout = {
    width: 460,
    height: 420,
    groundY: 370,
    trunkX: 206,
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
    totalCommits: 40,
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
    expect(svg).not.toContain('fill="#fbc02d"');
  });

  it("animates across frames", () => {
    const frame0 = renderFrame(mockLayout, 0, 20);
    const frame5 = renderFrame(mockLayout, 5, 20);

    expect(frame0).toBeDefined();
    expect(frame5).toBeDefined();
  });
});
