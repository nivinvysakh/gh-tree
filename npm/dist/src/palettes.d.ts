import { TreeType } from "./tree";
export declare const LOG_16X16: string[];
export declare const LOG_PALETTES: Record<TreeType, string[]>;
export declare const LEAF_16X16: string[];
export declare const LEAF_PALETTES: Record<TreeType, string[][]>;
export interface BiomeTerrainPalette {
    grassTop: string;
    grassHighlight: string;
    grassShadow: string;
    dirtBase: string;
    dirtDark: string;
    dirtLight: string;
    pebbleColor: string;
}
export declare const BIOME_TERRAINS: Record<TreeType, BiomeTerrainPalette>;
export declare const ORE_PALETTES: Record<string, {
    gemColor: string;
    gemShine: string;
    gemShadow: string;
}>;
export declare const CHEST_PALETTES: Record<string, {
    body: string;
    shadow: string;
    highlight: string;
    seam: string;
    latchBorder: string;
    latchCore: string;
    latchShine: string;
}>;
export declare const FONT_5X5_GLYPHS: Record<string, string[]>;
//# sourceMappingURL=palettes.d.ts.map