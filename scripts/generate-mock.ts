import * as fs from "fs";
import * as path from "path";
import { buildTreeLayout } from "../src/tree";
import { renderFrame } from "../src/svg";
import { encodeGif } from "../src/gif";
import { updateMarkdownFile } from "../src/markdown";
import { ContributionWeek } from "../src/github";
import { WeatherCondition } from "../src/weather";

async function generateWeatherGif(
  filename: string,
  weather: WeatherCondition,
  weeks: ContributionWeek[],
  width: number,
  height: number,
  frameCount: number,
  frameDelayMs: number
): Promise<string> {
  const layout = buildTreeLayout(weeks, undefined, { width, height, weather });
  const frames = Array.from({ length: frameCount }, (_, i) => ({
    svg: renderFrame(layout, i, frameCount),
  }));

  const gifBytes = await encodeGif(frames, width, height, frameDelayMs);
  const outputPath = path.resolve(__dirname, `../${filename}`);
  fs.writeFileSync(outputPath, gifBytes);
  console.log(`✓ Generated ${filename} (${weather.type.toUpperCase()}) - ${(gifBytes.length / 1024).toFixed(1)} KB`);
  return outputPath;
}

async function runMockGeneration(): Promise<void> {
  console.log("Generating local mock GIFs for all weather conditions (Sunny, Rain, Snow, Cloudy)...\n");

  // 14 weeks crafted to showcase all levels: 0 (dormant), 1 (light), 2 (medium), 3 (lush), 4 (emerald)
  const commitCounts = [
    3,  // Tier 0 (bottom left outer) - Level 1
    18, // Tier 0 (bottom left inner) - Level 3
    42, // Tier 0 (bottom center) - Level 4
    2,  // Tier 0 (bottom right inner) - Level 1
    0,  // Tier 0 (bottom right outer) - Level 0 (no commits)
    0,  // Tier -1 (mid left outer) - Level 0 (no commits)
    12, // Tier -1 (mid left inner) - Level 2
    38, // Tier -1 (mid center) - Level 4
    8,  // Tier -1 (mid right inner) - Level 2
    0,  // Tier -1 (mid right outer) - Level 0 (no commits)
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
      days: [{ date: dateStr, count }],
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

  const weatherVariants: { file: string; weather: WeatherCondition }[] = [
    { file: "tree.gif", weather: { type: "sunny", description: "Sunny / Clear sky" } },
    { file: "tree-night.gif", weather: { type: "night", description: "Clear starry night (Moon & Clouds)", isDay: false } },
    { file: "tree-rain.gif", weather: { type: "rain", description: "Rain showers & storm clouds" } },
    { file: "tree-snow.gif", weather: { type: "snow", description: "Snowfall & snowy caps" } },
    { file: "tree-cloudy.gif", weather: { type: "cloudy", description: "Overcast clouds" } },
  ];

  for (const variant of weatherVariants) {
    const outputPath = await generateWeatherGif(
      variant.file,
      variant.weather,
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
