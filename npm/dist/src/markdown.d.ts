/**
 * Updates or inserts a tree GIF markdown image into the target markdown file.
 *
 * It will:
 * 1. Replace content between `<!-- commit-tree-start -->` and `<!-- commit-tree-end -->` if markers exist.
 * 2. Or replace any existing markdown image like `![tree](...)`, `![commit tree](...)`, or `[tree](...)`.
 * 3. Or append the image wrapped in comment markers to the end of the file.
 */
export declare function updateMarkdownContent(existingContent: string, imageRelativePath: string, altText?: string, cacheBust?: boolean): string;
/**
 * Reads a markdown file, updates its tree GIF reference, and writes it back to disk.
 */
export declare function updateMarkdownFile(markdownFilePath: string, imagePath: string, altText?: string, cacheBust?: boolean): boolean;
//# sourceMappingURL=markdown.d.ts.map