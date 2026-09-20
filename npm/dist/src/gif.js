"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeGif = encodeGif;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const resvg_wasm_1 = require("@resvg/resvg-wasm");
const gifenc_1 = require("gifenc");
let wasmInitPromise = null;
async function ensureWasmInitialized() {
    if (!wasmInitPromise) {
        wasmInitPromise = (async () => {
            try {
                const possiblePaths = [
                    path.join(__dirname, "index_bg.wasm"),
                    path.join(__dirname, "../node_modules/@resvg/resvg-wasm/index_bg.wasm"),
                    path.join(process.cwd(), "node_modules/@resvg/resvg-wasm/index_bg.wasm"),
                ];
                let wasmBuffer = null;
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
                await (0, resvg_wasm_1.initWasm)(wasmBuffer);
            }
            catch (err) {
                // If already initialized or memory already bound, ignore
                if (!String(err).includes("already")) {
                    throw err;
                }
            }
        })();
    }
    return wasmInitPromise;
}
/**
 * Rasterizes each SVG frame to RGBA pixels using pure WebAssembly (cross-platform),
 * quantizes a palette per frame with alpha transparency support, and writes a looping animated GIF.
 */
async function encodeGif(frames, width, height, delayMs) {
    await ensureWasmInitialized();
    const gif = (0, gifenc_1.GIFEncoder)();
    for (const frame of frames) {
        const resvg = new resvg_wasm_1.Resvg(frame.svg, {
            fitTo: { mode: "width", value: width },
        });
        const rendered = resvg.render();
        const rgba = rendered.pixels; // Uint8Array, RGBA order
        const palette = (0, gifenc_1.quantize)(rgba, 256, {
            format: "rgba4444",
            oneBitAlpha: true,
            clearAlpha: true,
        });
        const index = (0, gifenc_1.applyPalette)(rgba, palette, "rgba4444");
        const transparentIndex = palette.findIndex((p) => p.length >= 4 && p[3] === 0);
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
//# sourceMappingURL=gif.js.map