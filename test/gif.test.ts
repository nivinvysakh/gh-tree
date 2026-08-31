import { describe, it, expect } from "vitest";
import { encodeGif } from "../src/gif";

describe("gif module", () => {
  it("encodes SVG frames into a valid GIF with GIF89a magic header", async () => {
    const frame1 = {
      svg: `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" fill="#6ec6ff" />
        <circle cx="50" cy="50" r="20" fill="#e63946" />
      </svg>`,
    };
    const frame2 = {
      svg: `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" fill="#6ec6ff" />
        <circle cx="60" cy="50" r="20" fill="#ffd166" />
      </svg>`,
    };

    const bytes = await encodeGif([frame1, frame2], 100, 100, 100);

    expect(bytes).toBeInstanceOf(Uint8Array);
    expect(bytes.length).toBeGreaterThan(0);

    // Verify GIF89a header: bytes 0x47, 0x49, 0x46, 0x38, 0x39, 0x61
    const header = Buffer.from(bytes.subarray(0, 6)).toString("ascii");
    expect(header).toBe("GIF89a");
  });
});
