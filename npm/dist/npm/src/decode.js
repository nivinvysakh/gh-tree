"use strict";
/**
 * Lightweight pure TypeScript GIF metadata decoder and inspector.
 * Parses GIF87a / GIF89a binary byte streams to extract frame counts,
 * dimensions, timing, loops, and color palettes.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeGifInfo = decodeGifInfo;
/**
 * Decodes header, metadata, dimensions, and frame layout from a GIF byte buffer.
 */
function decodeGifInfo(data) {
    const bytes = data instanceof Uint8Array ? data : new Uint8Array(data);
    const fallback = {
        valid: false,
        version: "unknown",
        width: 0,
        height: 0,
        frameCount: 0,
        durationMs: 0,
        delaysMs: [],
        loopCount: null,
        hasGlobalColorTable: false,
        globalColorTableSize: 0,
        frames: [],
    };
    if (bytes.length < 13)
        return fallback;
    // 1. Signature Check
    const signature = String.fromCharCode(...bytes.slice(0, 6));
    if (signature !== "GIF87a" && signature !== "GIF89a") {
        return fallback;
    }
    const version = signature;
    // 2. Logical Screen Descriptor (LSD)
    const width = bytes[6] | (bytes[7] << 8);
    const height = bytes[8] | (bytes[9] << 8);
    const lsdPacked = bytes[10];
    const hasGCT = (lsdPacked & 0x80) !== 0;
    const gctSize = hasGCT ? 3 * (1 << ((lsdPacked & 0x07) + 1)) : 0;
    let pos = 13 + gctSize;
    const frames = [];
    const delaysMs = [];
    let currentDelay = 100; // default 100ms
    let loopCount = null;
    // 3. Scan blocks
    while (pos < bytes.length) {
        const blockType = bytes[pos];
        if (blockType === 0x3b) {
            // GIF Trailer / End of Image
            break;
        }
        if (blockType === 0x21) {
            // Extension Block
            pos++;
            if (pos >= bytes.length)
                break;
            const extType = bytes[pos];
            pos++;
            if (extType === 0xf9) {
                // Graphic Control Extension
                const blockSize = bytes[pos];
                pos++;
                if (pos + blockSize <= bytes.length) {
                    const delayHundredths = bytes[pos + 1] | (bytes[pos + 2] << 8);
                    // Standard GIF delay in 1/100s of a second (converted to ms). Min delay usually 10-20ms.
                    currentDelay = delayHundredths > 0 ? delayHundredths * 10 : 100;
                }
                pos += blockSize;
                // Skip any sub-blocks until 0x00 terminator
                while (pos < bytes.length && bytes[pos] !== 0x00) {
                    pos += 1 + bytes[pos];
                }
                pos++; // skip 0x00
            }
            else if (extType === 0xff) {
                // Application Extension (e.g. NETSCAPE2.0 loop count)
                const blockSize = bytes[pos];
                pos++;
                const appName = String.fromCharCode(...bytes.slice(pos, pos + blockSize));
                pos += blockSize;
                while (pos < bytes.length && bytes[pos] !== 0x00) {
                    const subBlockSize = bytes[pos];
                    pos++;
                    if (appName.startsWith("NETSCAPE") && subBlockSize === 3 && bytes[pos] === 1) {
                        loopCount = bytes[pos + 1] | (bytes[pos + 2] << 8);
                    }
                    pos += subBlockSize;
                }
                pos++; // skip 0x00
            }
            else {
                // Other Extension (Comment, Plain Text, etc.)
                while (pos < bytes.length && bytes[pos] !== 0x00) {
                    const subBlockSize = bytes[pos];
                    pos += 1 + subBlockSize;
                }
                pos++; // skip 0x00
            }
        }
        else if (blockType === 0x2c) {
            // Image Descriptor
            pos++;
            if (pos + 9 > bytes.length)
                break;
            const imgLeft = bytes[pos] | (bytes[pos + 1] << 8);
            const imgTop = bytes[pos + 2] | (bytes[pos + 3] << 8);
            const imgWidth = bytes[pos + 4] | (bytes[pos + 5] << 8);
            const imgHeight = bytes[pos + 6] | (bytes[pos + 7] << 8);
            const imgPacked = bytes[pos + 8];
            pos += 9;
            const hasLCT = (imgPacked & 0x80) !== 0;
            const lctSize = hasLCT ? 3 * (1 << ((imgPacked & 0x07) + 1)) : 0;
            pos += lctSize;
            // LZW Initial Code Size
            if (pos < bytes.length) {
                pos++; // skip code size
            }
            // Skip Image Data Sub-blocks
            while (pos < bytes.length && bytes[pos] !== 0x00) {
                const subBlockSize = bytes[pos];
                pos += 1 + subBlockSize;
            }
            pos++; // skip 0x00
            frames.push({
                index: frames.length,
                x: imgLeft,
                y: imgTop,
                width: imgWidth,
                height: imgHeight,
                delayMs: currentDelay,
                hasLocalColorTable: hasLCT,
                localColorTableSize: lctSize / 3,
            });
            delaysMs.push(currentDelay);
        }
        else {
            // Unknown byte, advance
            pos++;
        }
    }
    const durationMs = delaysMs.reduce((sum, d) => sum + d, 0);
    return {
        valid: true,
        version,
        width,
        height,
        frameCount: frames.length,
        durationMs,
        delaysMs,
        loopCount,
        hasGlobalColorTable: hasGCT,
        globalColorTableSize: gctSize / 3,
        frames,
    };
}
//# sourceMappingURL=decode.js.map