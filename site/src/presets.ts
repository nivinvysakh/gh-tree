import { TreeType } from "../../src/tree";
import { WeatherType } from "../../src/weather";

export interface TreePreset {
  id: string;
  name: string;
  emoji: string;
  description: string;
  options: {
    treeType: TreeType;
    pet: "none" | "wolf" | "cat" | "fox";
    showCampfire: boolean;
    weather: WeatherType;
    isDay: boolean;
    streak: number;
    ore: "auto" | "coal" | "iron" | "redstone" | "gold" | "lapis" | "emerald" | "diamond" | "netherite";
    showJackOLantern: boolean;
    showHolidayGift: boolean;
    showFireworks: boolean;
    isOwner: boolean;
    isContributor: boolean;
    totalCommits: number;
    openPRs: number;
    mergedPRs: number;
    assignedPRs: number;
  };
}

export const PRESETS: TreePreset[] = [
  {
    id: "sakura-twilight",
    name: "Sakura Twilight",
    emoji: "🌸",
    description: "Cherry blossom canopy, peaceful red fox, and a starlit night sky.",
    options: {
      treeType: "sakura",
      pet: "fox",
      showCampfire: false,
      weather: "night",
      isDay: false,
      streak: 45,
      ore: "diamond",
      showJackOLantern: false,
      showHolidayGift: false,
      showFireworks: false,
      isOwner: false,
      isContributor: true,
      totalCommits: 84,
      openPRs: 2,
      mergedPRs: 6,
      assignedPRs: 1,
    },
  },
  {
    id: "snowy-cabin",
    name: "Snowy Pine Cabin",
    emoji: "🌲",
    description: "Spruce pine tree with a cozy campfire, tamed wolf, and gentle snowfall.",
    options: {
      treeType: "spruce",
      pet: "wolf",
      showCampfire: true,
      weather: "snow",
      isDay: true,
      streak: 100,
      ore: "diamond",
      showJackOLantern: false,
      showHolidayGift: false,
      showFireworks: false,
      isOwner: true,
      isContributor: true,
      totalCommits: 140,
      openPRs: 3,
      mergedPRs: 12,
      assignedPRs: 2,
    },
  },
  {
    id: "emerald-grove",
    name: "Lush Emerald Grove",
    emoji: "🌳",
    description: "Classic vibrant Oak tree, purring cat, and 365-day Diamond Royal Crown.",
    options: {
      treeType: "oak",
      pet: "cat",
      showCampfire: false,
      weather: "sunny",
      isDay: true,
      streak: 365,
      ore: "emerald",
      showJackOLantern: false,
      showHolidayGift: false,
      showFireworks: false,
      isOwner: true,
      isContributor: true,
      totalCommits: 320,
      openPRs: 4,
      mergedPRs: 25,
      assignedPRs: 3,
    },
  },
  {
    id: "spooky-woods",
    name: "Spooky Autumn",
    emoji: "🎃",
    description: "Halloween Jack-o'-lantern, stormy rain showers, and black cat.",
    options: {
      treeType: "oak",
      pet: "cat",
      showCampfire: false,
      weather: "rain",
      isDay: false,
      streak: 60,
      ore: "redstone",
      showJackOLantern: true,
      showHolidayGift: false,
      showFireworks: false,
      isOwner: false,
      isContributor: true,
      totalCommits: 65,
      openPRs: 1,
      mergedPRs: 4,
      assignedPRs: 1,
    },
  },
  {
    id: "fireworks-gala",
    name: "New Year Fireworks",
    emoji: "🎆",
    description: "Birch grove with multi-color festive fireworks and holiday gifts.",
    options: {
      treeType: "birch",
      pet: "wolf",
      showCampfire: true,
      weather: "night",
      isDay: false,
      streak: 1000,
      ore: "netherite",
      showJackOLantern: false,
      showHolidayGift: true,
      showFireworks: true,
      isOwner: true,
      isContributor: true,
      totalCommits: 1250,
      openPRs: 4,
      mergedPRs: 48,
      assignedPRs: 4,
    },
  },
];
