declare module "gifenc" {
  export interface QuantizeOptions {
    format?: "rgb565" | "rgb444" | "rgba4444";
    oneBitAlpha?: boolean | number;
    clearAlpha?: boolean;
    clearAlphaThreshold?: number;
    clearAlphaColor?: number;
  }

  export interface WriteFrameOptions {
    palette?: number[][];
    delay?: number;
    repeat?: number;
    transparent?: boolean;
    transparentIndex?: number;
    dispose?: number;
  }

  export interface GIFEncoderInstance {
    writeFrame(
      index: Uint8Array | number[],
      width: number,
      height: number,
      opts?: WriteFrameOptions
    ): void;
    finish(): void;
    bytes(): Uint8Array;
    bytesView(): Uint8Array;
    getRaw(stream?: unknown): Uint8Array;
    reset(): void;
  }

  export function GIFEncoder(opts?: {
    auto?: boolean;
    initialCapacity?: number;
  }): GIFEncoderInstance;

  export function quantize(
    rgba: Uint8Array | number[] | Uint8ClampedArray,
    maxColors?: number,
    opts?: QuantizeOptions
  ): number[][];

  export function applyPalette(
    rgba: Uint8Array | number[] | Uint8ClampedArray,
    palette: number[][],
    format?: string
  ): Uint8Array;

  export function nearestColor(
    color: number[],
    palette: number[][]
  ): number;

  export function nearestColorIndex(
    color: number[],
    palette: number[][]
  ): number;

  export function nearestColorIndexWithDistance(
    color: number[],
    palette: number[][]
  ): [number, number];

  export function snapColorsToPalette(
    palette: number[],
    knownColors: number[][],
    threshold?: number
  ): number[][];

  export function prequantize(
    rgba: Uint8Array | number[] | Uint8ClampedArray,
    opts?: QuantizeOptions
  ): Uint8Array;
}
