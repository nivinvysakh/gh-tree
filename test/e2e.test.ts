import { describe, it, expect } from "vitest";
import * as fs from "fs";
import * as path from "path";
import { buildTreeLayout } from "../src/tree";
import { renderFrame } from "../src/svg";
import { encodeGif } from "../src/gif";
import { updateMarkdownFile } from "../src/markdown";

describe("End-to-End GIF Generation", () => {
  it("generates a tree.gif with leaves, flowers, and fruits, and updates README.md", async () => {
    const weeks = [];
    const now = new Date();
    for (let i = 14; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 7 * 24 * 60 * 60 * 1000);
      const dateStr = d.toISOString().slice(0, 10);
      const commits = i === 10 ? 25 : i % 3 === 0 ? 8 : 2;
      const openPRs = i === 5 || i === 11 ? 2 : 0;
      const mergedPRs = i === 8 || i === 12 ? 3 : 0;
      weeks.push({
        days: [{ date: dateStr, count: commits }],
        total: commits,
        openPRs,
        mergedPRs,
      });
    }

    const width = 460;
    const height = 420;
    const layout = buildTreeLayout(weeks, undefined, { width, height });
    const frameCount = 10;
    const frames = Array.from({ length: frameCount }, (_, i) => ({
      svg: renderFrame(layout, i, frameCount),
    }));

    const gifBytes = await encodeGif(frames, width, height, 100);
    const outputPath = path.resolve(__dirname, "../tree.gif");
    fs.writeFileSync(outputPath, gifBytes);

    expect(fs.existsSync(outputPath)).toBe(true);
    expect(gifBytes.length).toBeGreaterThan(1000);

    const readmePath = path.resolve(__dirname, "../README.md");
    updateMarkdownFile(readmePath, outputPath, "tree");

    const readmeContent = fs.readFileSync(readmePath, "utf-8");
    expect(readmeContent).toContain("![tree](tree.gif)");
  });
});
