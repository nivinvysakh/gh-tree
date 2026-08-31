import { describe, it, expect, afterAll } from "vitest";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import { buildTreeLayout } from "../src/tree";
import { renderFrame } from "../src/svg";
import { encodeGif } from "../src/gif";
import { updateMarkdownFile } from "../src/markdown";

describe("End-to-End GIF Generation", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "gh-tree-test-"));
  const tempGifPath = path.join(tempDir, "tree.gif");
  const tempReadmePath = path.join(tempDir, "README.md");

  afterAll(() => {
    try {
      fs.rmSync(tempDir, { recursive: true, force: true });
    } catch {
      // ignore
    }
  });

  it("generates a tree.gif with leaves, flowers, apples, and golden apples, and updates markdown", async () => {
    const weeks = [];
    const now = new Date();
    for (let i = 14; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 7 * 24 * 60 * 60 * 1000);
      const dateStr = d.toISOString().slice(0, 10);
      const commits = i === 10 ? 25 : i % 3 === 0 ? 8 : 2;
      const openPRs = i === 5 || i === 11 ? 2 : 0;
      const mergedPRs = i === 8 || i === 12 ? 3 : 0;
      const assignedPRs = i === 2 || i === 7 ? 2 : 0;
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
    const layout = buildTreeLayout(weeks, undefined, { width, height });
    const frameCount = 10;
    const frames = Array.from({ length: frameCount }, (_, i) => ({
      svg: renderFrame(layout, i, frameCount),
    }));

    const gifBytes = await encodeGif(frames, width, height, 100);
    fs.writeFileSync(tempGifPath, gifBytes);

    expect(fs.existsSync(tempGifPath)).toBe(true);
    expect(gifBytes.length).toBeGreaterThan(1000);

    // Initial dummy README
    fs.writeFileSync(tempReadmePath, "# Test Repo\n\n<!-- commit-tree-start -->\n<!-- commit-tree-end -->\n", "utf-8");
    updateMarkdownFile(tempReadmePath, tempGifPath, "tree");

    const readmeContent = fs.readFileSync(tempReadmePath, "utf-8");
    expect(readmeContent).toContain("![tree](tree.gif)");
  });
});
