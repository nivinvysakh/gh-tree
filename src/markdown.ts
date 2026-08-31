import * as fs from "fs";
import * as path from "path";

/**
 * Updates or inserts a tree GIF markdown image into the target markdown file.
 *
 * It will:
 * 1. Replace content between `<!-- commit-tree-start -->` and `<!-- commit-tree-end -->` if markers exist.
 * 2. Or replace any existing markdown image like `![tree](...)`, `![commit tree](...)`, or `[tree](...)`.
 * 3. Or append the image wrapped in comment markers to the end of the file.
 */
export function updateMarkdownContent(
  existingContent: string,
  imageRelativePath: string,
  altText: string = "tree",
  cacheBust: boolean = true
): string {
  const cleanPath = imageRelativePath.split("?")[0];
  const finalPath = cacheBust ? `${cleanPath}?v=${Date.now()}` : cleanPath;
  const imageMarkdown = `![${altText}](${finalPath})`;
  const startTag = "<!-- commit-tree-start -->";
  const endTag = "<!-- commit-tree-end -->";

  if (existingContent.includes(startTag) && existingContent.includes(endTag)) {
    const regex = new RegExp(`${startTag}[\\s\\S]*?${endTag}`, "g");
    return existingContent.replace(regex, `${startTag}\n${imageMarkdown}\n${endTag}`);
  }

  // Check if there is an existing tree image or link like ![tree](...) or ![commit tree](...) or [tree](...)
  const imgRegex = /!\[(?:tree|commit\s*tree)\]\([^)]+\)/i;
  if (imgRegex.test(existingContent)) {
    return existingContent.replace(imgRegex, imageMarkdown);
  }

  const linkRegex = /\[(?:tree|commit\s*tree)\]\([^)]+\)/i;
  if (linkRegex.test(existingContent)) {
    return existingContent.replace(linkRegex, imageMarkdown);
  }

  // Otherwise append to the end
  let output = existingContent;
  if (output.length > 0 && !output.endsWith("\n")) {
    output += "\n\n";
  } else if (output.length > 0 && !output.endsWith("\n\n")) {
    output += "\n";
  }

  output += `${startTag}\n${imageMarkdown}\n${endTag}\n`;
  return output;
}

/**
 * Reads a markdown file, updates its tree GIF reference, and writes it back to disk.
 */
export function updateMarkdownFile(
  markdownFilePath: string,
  imagePath: string,
  altText: string = "tree",
  cacheBust: boolean = true
): boolean {
  if (!markdownFilePath) return false;

  const resolvedMarkdown = path.resolve(markdownFilePath);
  const resolvedImage = path.resolve(imagePath);

  // Compute the relative path from the markdown directory to the image file
  let relPath = path.relative(path.dirname(resolvedMarkdown), resolvedImage);
  if (!relPath.startsWith(".") && !relPath.startsWith("/")) {
    relPath = `./${relPath}`;
  }

  // Normalise for root-level reference e.g. "./tree.gif" -> "tree.gif" if in same dir
  if (relPath.startsWith("./") && !relPath.includes("/", 2)) {
    relPath = relPath.slice(2);
  }

  let content = "";
  if (fs.existsSync(resolvedMarkdown)) {
    content = fs.readFileSync(resolvedMarkdown, "utf-8");
  }

  const updatedContent = updateMarkdownContent(content, relPath, altText, cacheBust);
  fs.mkdirSync(path.dirname(resolvedMarkdown), { recursive: true });
  fs.writeFileSync(resolvedMarkdown, updatedContent, "utf-8");
  return true;
}
