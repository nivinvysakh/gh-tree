import { describe, it, expect } from "vitest";
import {
  generateTreeGif,
  generateTreeSvg,
  generateTreeFrames,
  createTreeLayout,
  inspectTreeLayout,
  extractTreeSummary,
  decodeGifInfo,
  buildTreeLayout,
  parseWeatherString,
  ContributionWeek,
} from "../npm/src/index";

describe("npm package (gh-tree)", () => {
  const mockWeeks: ContributionWeek[] = [
    {
      days: [
        { date: "2026-08-01", count: 4 },
        { date: "2026-08-02", count: 2 },
      ],
      total: 6,
      openPRs: 2,
      mergedPRs: 1,
      assignedPRs: 1,
    },
    {
      days: [
        { date: "2026-08-08", count: 8 },
        { date: "2026-08-09", count: 5 },
      ],
      total: 13,
      openPRs: 0,
      mergedPRs: 1,
      assignedPRs: 0,
    },
  ];

  describe("Forward Generation (Inputs -> Outputs)", () => {
    it("generates a valid SVG string from custom options", async () => {
      const svg = await generateTreeSvg({
        weeks: mockWeeks,
        streak: 5,
        treeType: "sakura",
        weather: "sunny",
        width: 920,
        height: 500,
      });

      expect(typeof svg).toBe("string");
      expect(svg).toContain('<svg width="920" height="500"');
      expect(svg).toContain("</svg>");
    });

    it("generates the requested number of SVG frames", async () => {
      const frames = await generateTreeFrames({
        weeks: mockWeeks,
        streak: 3,
        treeType: "oak",
        frames: 10,
      });

      expect(frames).toHaveLength(10);
      frames.forEach((f) => {
        expect(f).toContain("<svg");
        expect(f).toContain("</svg>");
      });
    });

    it("generates a valid animated GIF buffer", async () => {
      const gifBytes = await generateTreeGif({
        weeks: mockWeeks,
        streak: 5,
        treeType: "oak",
        frames: 5,
        frameDelayMs: 100,
        width: 460,
        height: 250,
      });

      expect(gifBytes).toBeInstanceOf(Uint8Array);
      expect(gifBytes.length).toBeGreaterThan(1000);

      // Verify GIF header signature
      const header = String.fromCharCode(...gifBytes.slice(0, 6));
      expect(header).toBe("GIF89a");
    });
  });

  describe("Inverse & Inspection (Outputs / Layout -> Metadata & Summary)", () => {
    it("decodes GIF binary metadata accurately using decodeGifInfo", async () => {
      const targetWidth = 460;
      const targetHeight = 250;
      const targetFrames = 4;
      const targetDelay = 120;

      const gifBytes = await generateTreeGif({
        weeks: mockWeeks,
        streak: 5,
        treeType: "crimson",
        frames: targetFrames,
        frameDelayMs: targetDelay,
        width: targetWidth,
        height: targetHeight,
      });

      const info = decodeGifInfo(gifBytes);
      expect(info.valid).toBe(true);
      expect(info.version).toBe("GIF89a");
      expect(info.width).toBe(targetWidth);
      expect(info.height).toBe(targetHeight);
      expect(info.frameCount).toBe(targetFrames);
      expect(info.delaysMs).toEqual([targetDelay, targetDelay, targetDelay, targetDelay]);
      expect(info.durationMs).toBe(targetFrames * targetDelay);
      expect(info.loopCount).toBe(0); // Infinite loop
    });

    it("inspects TreeLayout and provides structured analysis", async () => {
      const layout = await createTreeLayout({
        weeks: mockWeeks,
        streak: 10,
        treeType: "warped",
        growth: "standard",
        pet: "fox",
        showFarmer: true,
        farmerMood: "watering",
        showCampfire: true,
        showChest: true,
      });

      const summary = inspectTreeLayout(layout);
      expect(summary.treeType).toBe("warped");
      expect(summary.growthStage).toBe("standard");
      expect(summary.trunkBlocksCount).toBe(3);
      expect(summary.leafBlocksCount).toBe(14);
      expect(summary.streak).toBe(10);
      expect(summary.hasPet).toBe(true);
      expect(summary.petType).toBe("fox");
      expect(summary.hasFarmer).toBe(true);
      expect(summary.farmerMood).toBe("watering");
      expect(summary.hasCampfire).toBe(true);
      expect(summary.hasChest).toBe(true);
    });

    it("generates human-readable summary text from layout", async () => {
      const layout = await createTreeLayout({
        weeks: mockWeeks,
        streak: 4,
        treeType: "oak",
      });

      const text = extractTreeSummary(layout);
      expect(text).toContain("Tree Species: OAK");
      expect(text).toContain("Streak: 4 days");
      expect(text).toContain("Growth Stage: STANDARD");
    });
  });

  describe("Utility & Weather Helpers", () => {
    it("parses weather strings reliably", () => {
      expect(parseWeatherString("rainy morning").type).toBe("rain");
      expect(parseWeatherString("blizzard snow").type).toBe("snow");
      expect(parseWeatherString("overcast clouds").type).toBe("cloudy");
      expect(parseWeatherString("starry night").type).toBe("night");
      expect(parseWeatherString("clear day").type).toBe("sunny");
    });
  });
});
