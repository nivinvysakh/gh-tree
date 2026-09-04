import * as fs from "fs";
import * as path from "path";
import { buildTreeLayout, TreeType } from "../src/tree";
import { renderFrame } from "../src/svg";
import { encodeGif } from "../src/gif";
import { updateMarkdownFile } from "../src/markdown";
import { ContributionWeek } from "../src/github";
import { WeatherCondition } from "../src/weather";

async function generateGifVariant(
  filename: string,
  weather: WeatherCondition,
  treeType: TreeType,
  weeks: ContributionWeek[],
  width: number,
  height: number,
  frameCount: number,
  frameDelayMs: number
): Promise<string> {
  const layout = buildTreeLayout(weeks, undefined, {
    width,
    height,
    weather,
    treeType,
    showSignpost: true,
    showBee: true,
  });
  const frames = Array.from({ length: frameCount }, (_, i) => ({
    svg: renderFrame(layout, i, frameCount),
  }));

  const gifBytes = await encodeGif(frames, width, height, frameDelayMs);
  const outputPath = path.resolve(__dirname, `../${filename}`);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, gifBytes);
  console.log(`✓ Generated ${filename} [${treeType.toUpperCase()} | ${weather.type.toUpperCase()}] - ${(gifBytes.length / 1024).toFixed(1)} KB`);
  return outputPath;
}

async function runMockGeneration(): Promise<void> {
  console.log("Generating local mock GIFs for all biomes and weather conditions...\n");

  // 14 weeks crafted to showcase all levels, PR flowers, apples, golden apples, and streak
  const commitCounts = [
    3,  // Tier 0 (bottom left outer) - Level 1
    18, // Tier 0 (bottom left inner) - Level 3
    42, // Tier 0 (bottom center) - Level 4
    2,  // Tier 0 (bottom right inner) - Level 1
    4,  // Tier 0 (bottom right outer)
    8,  // Tier -1 (mid left outer)
    12, // Tier -1 (mid left inner) - Level 2
    38, // Tier -1 (mid center) - Level 4
    14, // Tier -1 (mid right inner) - Level 2
    6,  // Tier -1 (mid right outer)
    34, // Tier -2 (upper left) - Level 4
    25, // Tier -2 (upper center) - Level 3
    28, // Tier -2 (upper right) - Level 3
    48, // Tier -3 (top peak) - Level 4 (large commits)
  ];

  const now = new Date();
  const weeks: ContributionWeek[] = commitCounts.map((count, idx) => {
    const d = new Date(now.getTime() - (13 - idx) * 7 * 24 * 60 * 60 * 1000);
    const dateStr = d.toISOString().slice(0, 10);

    return {
      days: [
        { date: dateStr, count: Math.ceil(count / 2) },
        { date: new Date(d.getTime() + 86400000).toISOString().slice(0, 10), count: Math.floor(count / 2) },
      ],
      total: count,
      openPRs: idx === 3 || idx === 10 ? 2 : 0,    // Total 4 flowers (2 left, 2 right)
      mergedPRs: idx === 2 || idx === 8 ? 2 : 0,   // Total 4 red apples in canopy
      assignedPRs: idx === 1 || idx === 7 ? 2 : 0, // Total 4 golden apples (2 far-left, 2 far-right)
    };
  });

  const width = 460;
  const height = 420;
  const frameCount = 14;
  const frameDelayMs = 110;

  const variants: { file: string; weather: WeatherCondition; treeType: TreeType }[] = [
    { file: "tree.gif", weather: { type: "sunny", description: "Sunny / Clear sky" }, treeType: "oak" },
    { file: "assets/tree-sakura.gif", weather: { type: "sunny", description: "Sunny Sakura Blossom" }, treeType: "sakura" },
    { file: "assets/tree-sakura-rain.gif", weather: { type: "rain", description: "Sakura in Rain" }, treeType: "sakura" },
    { file: "assets/tree-sakura-snow.gif", weather: { type: "snow", description: "Sakura in Snow" }, treeType: "sakura" },
    { file: "assets/tree-spruce.gif", weather: { type: "sunny", description: "Taiga Spruce" }, treeType: "spruce" },
    { file: "assets/tree-spruce-snow.gif", weather: { type: "snow", description: "Taiga Spruce in Snow" }, treeType: "spruce" },
    { file: "assets/tree-birch.gif", weather: { type: "sunny", description: "Birch Forest" }, treeType: "birch" },
    { file: "assets/tree-birch-rain.gif", weather: { type: "rain", description: "Birch in Rain" }, treeType: "birch" },
    { file: "assets/tree-night.gif", weather: { type: "night", description: "Clear starry night (Moon & Clouds)", isDay: false }, treeType: "oak" },
    { file: "assets/tree-rain.gif", weather: { type: "rain", description: "Rain showers & storm clouds" }, treeType: "oak" },
    { file: "assets/tree-snow.gif", weather: { type: "snow", description: "Snowfall & snowy caps" }, treeType: "spruce" },
    { file: "assets/tree-cloudy.gif", weather: { type: "cloudy", description: "Overcast clouds" }, treeType: "oak" },
  ];

  for (const variant of variants) {
    const outputPath = await generateGifVariant(
      variant.file,
      variant.weather,
      variant.treeType,
      weeks,
      width,
      height,
      frameCount,
      frameDelayMs
    );

    if (variant.file === "tree.gif") {
      const readmePath = path.resolve(__dirname, "../README.md");
      updateMarkdownFile(readmePath, outputPath, "tree");
    }
  }

  console.log("\nAll mock GIFs generated successfully!");
}

runMockGeneration();
