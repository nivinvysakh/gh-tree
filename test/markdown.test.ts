import { describe, it, expect, beforeEach, afterEach } from "vitest";
import * as fs from "fs";
import * as path from "path";
import { updateMarkdownContent, updateMarkdownFile } from "../src/markdown";

describe("markdown module", () => {
  const tmpDir = path.join(__dirname, "tmp_markdown_test");
  const testMdFile = path.join(tmpDir, "README.md");
  const testGifFile = path.join(tmpDir, "tree.gif");

  beforeEach(() => {
    fs.mkdirSync(tmpDir, { recursive: true });
  });

  afterEach(() => {
    if (fs.existsSync(tmpDir)) {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  });

  describe("updateMarkdownContent", () => {
    it("replaces content within commit-tree HTML comments if present with cache-busting query", () => {
      const initial = `# My Profile\n\n<!-- commit-tree-start -->\n![old](old.gif)\n<!-- commit-tree-end -->\n\nMore content`;
      const updated = updateMarkdownContent(initial, "tree.gif", "tree", true);

      expect(updated).toMatch(
        /# My Profile\n\n<!-- commit-tree-start -->\n!\[tree\]\(tree\.gif\?v=\d+\)\n<!-- commit-tree-end -->\n\nMore content/
      );
    });

    it("replaces existing ![tree](...) markdown link if present", () => {
      const initial = `# My Profile\n\n![tree](https://example.com/tree.gif)\n\nBio here`;
      const updated = updateMarkdownContent(initial, "tree.gif", "tree", false);

      expect(updated).toBe(`# My Profile\n\n![tree](tree.gif)\n\nBio here`);
    });

    it("replaces existing [tree](...) link if present", () => {
      const initial = `# My Profile\n\n[tree](tree.gif)\n\nBio here`;
      const updated = updateMarkdownContent(initial, "tree.gif", "tree", false);

      expect(updated).toBe(`# My Profile\n\n![tree](tree.gif)\n\nBio here`);
    });

    it("appends comment block with image if no marker or image exists", () => {
      const initial = `# My Profile\n\nWelcome to my repo!`;
      const updated = updateMarkdownContent(initial, "tree.gif", "tree", false);

      expect(updated).toContain("<!-- commit-tree-start -->\n![tree](tree.gif)\n<!-- commit-tree-end -->");
    });
  });

  describe("updateMarkdownFile", () => {
    it("creates/updates the markdown file on disk with relative path", () => {
      fs.writeFileSync(testMdFile, "# Header\n", "utf-8");

      updateMarkdownFile(testMdFile, testGifFile, "tree", true);

      const result = fs.readFileSync(testMdFile, "utf-8");
      expect(result).toMatch(/!\[tree\]\(tree\.gif\?v=\d+\)/);
    });
  });
});
