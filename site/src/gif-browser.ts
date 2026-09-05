import { GIFEncoder, quantize, applyPalette } from "gifenc";

export interface GifProgressCallback {
  (currentFrame: number, totalFrames: number, statusText: string): void;
}

/**
 * Converts an SVG string into an RGBA pixel array using the browser's HTML5 Canvas.
 */
export async function rasterizeSvgToRgba(
  svgString: string,
  width: number,
  height: number
): Promise<Uint8ClampedArray> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    // Use Blob URL to support full Unicode / UTF-8 characters
    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) {
        URL.revokeObjectURL(url);
        return reject(new Error("Could not create 2D canvas context"));
      }

      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);
      URL.revokeObjectURL(url);

      const imgData = ctx.getImageData(0, 0, width, height);
      resolve(imgData.data);
    };

    img.onerror = (err) => {
      URL.revokeObjectURL(url);
      reject(new Error(`Failed to rasterize SVG frame: ${err}`));
    };

    img.src = url;
  });
}

/**
 * Encodes an array of SVG frame strings into an animated GIF Blob in the browser.
 */
export async function encodeBrowserGif(
  svgFrames: string[],
  width: number = 480,
  height: number = 400,
  delayMs: number = 200,
  onProgress?: GifProgressCallback
): Promise<Blob> {
  const gif = GIFEncoder();
  const total = svgFrames.length;

  for (let i = 0; i < total; i++) {
    if (onProgress) {
      onProgress(i + 1, total, `Rasterizing frame ${i + 1} of ${total}...`);
    }

    const rgba = await rasterizeSvgToRgba(svgFrames[i], width, height);

    if (onProgress) {
      onProgress(i + 1, total, `Quantizing palette for frame ${i + 1}...`);
    }

    // Quantize palette with 1-bit alpha transparency
    const palette = quantize(rgba, 256, {
      format: "rgba4444",
      oneBitAlpha: true,
      clearAlpha: true,
    });

    const index = applyPalette(rgba, palette, "rgba4444");

    // Find transparent index in palette
    const transparentIndex = palette.findIndex(
      (p: number[]) => p.length >= 4 && p[3] === 0
    );

    gif.writeFrame(index, width, height, {
      palette,
      delay: delayMs,
      repeat: 0, // Infinite loop
      transparent: transparentIndex !== -1,
      transparentIndex: transparentIndex !== -1 ? transparentIndex : 0,
      dispose: 2, // Restore to background
    });
  }

  if (onProgress) {
    onProgress(total, total, "Assembling animated GIF binary...");
  }

  gif.finish();
  const bytes = gif.bytesView();
  // Return standard browser Blob
  return new Blob([bytes as any], { type: "image/gif" });
}

/**
 * Initiates an automatic file download in the browser.
 */
export function triggerFileDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
