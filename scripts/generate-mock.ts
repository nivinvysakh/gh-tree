import * as fs from "fs";
import * as path from "path";
import { buildTreeLayout } from "../src/tree";
import { renderFrame } from "../src/svg";
import { encodeGif } from "../src/gif";
import { updateMarkdownFile } from "../src/markdown";
import { ContributionWeek } from "../src/github";

function runMockGeneration(): void {
  console.log("Generating Minecraft Commit Tree GIF (commits determine leaf greenness, flowers & golden apples on grass, red apples in canopy)...");

  const weeks: ContributionWeek[] = [];
  const now = new Date();
  const weekCount = 14;

  for (let i = weekCount - 1; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 7 * 24 * 60 * 60 * 1000);
    const dateStr = d.toISOString().slice(0, 10);
    
    // Vary commit activity from 0 to 45 across weeks
    const commits = i === 13 ? 35 : i % 4 === 0 ? 0 : i % 3 === 0 ? 25 : (i * 3 + 2);
    
    // Flowers for open authored PRs (max 4 on grass)
    const openPRs = i === 3 || i === 9 ? 2 : 0;
    // Red apples for merged PRs (max 4 in canopy)
    const mergedPRs = i === 6 || i === 12 ? 2 : 0;
    // Golden apples for assigned PRs (max 4 on grass)
    const assignedPRs = i === 2 || i === 8 ? 2 : 0;

    weeks.push({
      days: [{ date: dateStr, count: commits }],
      total: commits,
      openPRs,
      mergedPRs,
      assignedPRs,
    });
  }

  const width = 460;
  const height = 420;
  const frameCount = 12;
  const frameDelayMs = 120;

  console.log(`Building Minecraft tree layout with commit green levels for ${weeks.length} weeks...`);
  const layout = buildTreeLayout(weeks, undefined, { width, height });

  console.log(`Rendering ${frameCount} animation frames...`);
  const frames = Array.from({ length: frameCount }, (_, i) => ({
    svg: renderFrame(layout, i, frameCount),
  }));

  console.log("Encoding transparent GIF...");
  const gifBytes = encodeGif(frames, width, height, frameDelayMs);

  const outputPath = path.resolve(__dirname, "../tree.gif");
  fs.writeFileSync(outputPath, gifBytes);
  console.log(`✓ Generated ${outputPath} (${(gifBytes.length / 1024).toFixed(1)} KB)`);

  const readmePath = path.resolve(__dirname, "../README.md");
  updateMarkdownFile(readmePath, outputPath, "tree");
  console.log(`✓ Updated ${readmePath} with ![tree](tree.gif)`);
  console.log("Done! Open tree.gif to view your Minecraft Commit Tree.");
}

runMockGeneration();
