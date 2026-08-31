import { Resvg } from "@resvg/resvg-js";
import { GIFEncoder, quantize, applyPalette } from "gifenc";

export interface Frame {
  svg: string;
}

/**
 * Rasterizes each SVG frame to RGBA pixels, quantizes a palette per frame
 * with alpha transparency support, and writes a looping animated GIF.
 */
export function encodeGif(
  frames: Frame[],
  width: number,
  height: number,
  delayMs: number
): Uint8Array {
  const gif = GIFEncoder();

  for (const frame of frames) {
    const resvg = new Resvg(frame.svg, {
      fitTo: { mode: "width", value: width },
    });
    const rendered = resvg.render();
    const rgba = rendered.pixels; // Uint8Array, RGBA order

    const palette = quantize(rgba, 256, {
      format: "rgba4444",
      oneBitAlpha: true,
      clearAlpha: true,
    });
    const index = applyPalette(rgba, palette, "rgba4444");

    const transparentIndex = palette.findIndex(
      (p) => p.length >= 4 && p[3] === 0
    );

    gif.writeFrame(index, width, height, {
      palette,
      delay: delayMs,
      repeat: 0, // 0 = loop forever
      transparent: transparentIndex !== -1,
      transparentIndex: transparentIndex !== -1 ? transparentIndex : 0,
      dispose: 2, // 2 = Restore to background (essential for transparent animations)
    });
  }

  gif.finish();
  return gif.bytesView();
}
