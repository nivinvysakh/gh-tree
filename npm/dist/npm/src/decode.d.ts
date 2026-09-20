/**
 * Lightweight pure TypeScript GIF metadata decoder and inspector.
 * Parses GIF87a / GIF89a binary byte streams to extract frame counts,
 * dimensions, timing, loops, and color palettes.
 */
export interface GifFrameInfo {
    index: number;
    x: number;
    y: number;
    width: number;
    height: number;
    delayMs: number;
    hasLocalColorTable: boolean;
    localColorTableSize: number;
}
export interface GifInfo {
    valid: boolean;
    version: "GIF87a" | "GIF89a" | "unknown";
    width: number;
    height: number;
    frameCount: number;
    durationMs: number;
    delaysMs: number[];
    loopCount: number | null;
    hasGlobalColorTable: boolean;
    globalColorTableSize: number;
    frames: GifFrameInfo[];
}
/**
 * Decodes header, metadata, dimensions, and frame layout from a GIF byte buffer.
 */
export declare function decodeGifInfo(data: Uint8Array | ArrayBuffer | Buffer): GifInfo;
//# sourceMappingURL=decode.d.ts.map