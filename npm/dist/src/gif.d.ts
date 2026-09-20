export interface Frame {
    svg: string;
}
/**
 * Rasterizes each SVG frame to RGBA pixels using pure WebAssembly (cross-platform),
 * quantizes a palette per frame with alpha transparency support, and writes a looping animated GIF.
 */
export declare function encodeGif(frames: Frame[], width: number, height: number, delayMs: number): Promise<Uint8Array>;
//# sourceMappingURL=gif.d.ts.map