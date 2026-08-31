import * as fs from "fs";
import * as path from "path";
import { Resvg, initWasm } from "@resvg/resvg-wasm";
import { GIFEncoder, quantize, applyPalette } from "gifenc";

let wasmInitPromise: Promise<void> | null = null;

async function ensureWasmInitialized(): Promise<void> {
  if (!wasmInitPromise) {
    wasmInitPromise = (async () => {
      try {
        const possiblePaths = [
          path.join(__dirname, "index_bg.wasm"),
          path.join(__dirname, "../node_modules/@resvg/resvg-wasm/index_bg.wasm"),
        ];

        let wasmBuffer: Buffer | null = null;
        for (const p of possiblePaths) {
          if (fs.existsSync(p)) {
            wasmBuffer = fs.readFileSync(p);
            break;
          }
        }

        if (!wasmBuffer) {
          const resolved = require.resolve("@resvg/resvg-wasm/index_bg.wasm");
          wasmBuffer = fs.readFileSync(resolved);
        }

        await initWasm(wasmBuffer);
      } catch (err: any) {
        // If already initialized or memory already bound, ignore
        if (!String(err).includes("already")) {
          throw err;
        }
      }
    })();
  }
  return wasmInitPromise;
}

export interface Frame {
  svg: string;
}

/**
 * Rasterizes each SVG frame to RGBA pixels using pure WebAssembly (cross-platform),
 * quantizes a palette per frame with alpha transparency support, and writes a looping animated GIF.
 */
export async function encodeGif(
  frames: Frame[],
  width: number,
  height: number,
  delayMs: number
): Promise<Uint8Array> {
  await ensureWasmInitialized();
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
      dispose: 2, // 2 = Restore to background
    });
  }

  gif.finish();
  return gif.bytesView();
}
