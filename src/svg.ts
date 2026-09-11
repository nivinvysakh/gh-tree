import { TreeLayout } from "./tree";
import {
  renderMinecraftSun,
  renderMinecraftMoon,
  renderMinecraftStars,
  renderBioluminescentParticles,
  renderMinecraftCloud,
  renderRainStreaks,
  renderSnowflakes,
  renderSakuraPetals,
  renderSeasonalFireworks,
} from "./environment";
import {
  renderMinecraftGround,
  renderMinecraftLog,
  renderMinecraftLeaf,
  renderFlowerOnGrass,
  renderApple,
  renderGoldenAppleOnGrass,
  renderMinecraftBee,
  renderMinecraftBeehive,
  renderMinecraftSignpost,
  renderMinecraftFarmer,
  renderMinecraftWolf,
  renderMinecraftFox,
  renderMinecraftCat,
  renderMinecraftParrot,
  renderMinecraftCampfire,
  renderMinecraftChest,
  renderSeasonalJackOLantern,
  renderHalloweenGhosts,
  renderSeasonalHolidayGifts,
  renderSeasonalFairyLights,
} from "./props";

export {
  renderMinecraftSun,
  renderMinecraftMoon,
  renderMinecraftStars,
  renderBioluminescentParticles,
  renderMinecraftCloud,
  renderRainStreaks,
  renderSnowflakes,
  renderSakuraPetals,
  renderSeasonalFireworks,
} from "./environment";

export {
  renderMinecraftGround,
  renderMinecraftLog,
  renderMinecraftLeaf,
  renderFlowerOnGrass,
  renderApple,
  renderGoldenAppleOnGrass,
  renderMinecraftBee,
  renderMinecraftBeehive,
  renderMinecraftSignpost,
  renderMinecraftFarmer,
  renderMinecraftWolf,
  renderMinecraftFox,
  renderMinecraftCat,
  renderMinecraftParrot,
  renderMinecraftCampfire,
  renderMinecraftChest,
  renderSeasonalJackOLantern,
  renderHalloweenGhosts,
  renderSeasonalHolidayGifts,
  renderSeasonalFairyLights,
} from "./props";

export function renderFrame(
  layout: TreeLayout,
  frameIndex: number,
  totalFrames: number
): string {
  const {
    width,
    height,
    groundY,
    treeType,
    trunkBlocks,
    leafBlocks,
    flowers,
    apples,
    goldenApples,
    oreBlocks,
    bee,
    beehive,
    signpost,
    pet,
    farmer,
    campfire,
    chest,
    seasonalEvent,
    holidayGifts,
    jackOLantern,
    weather,
  } = layout;

  const weatherType = weather?.type || "sunny";
  const isNight = weatherType === "night" || weather?.isDay === false;
  const isRain = weatherType === "rain";
  const isSnow = weatherType === "snow";
  const isCloudy = weatherType === "cloudy";
  const isSunny = weatherType === "sunny" && !isNight;

  const driftRatio = totalFrames > 0 ? frameIndex / totalFrames : 0;

  // 1. Sky & Atmosphere
  let skySvg = "";

  if (isNight) {
    // Night: Minecraft Moon + Twinkling Stars + Night Clouds
    const moonX = width - 82;
    const moonY = 18;
    const moonSize = 34;
    skySvg += renderMinecraftMoon(moonX, moonY, moonSize, frameIndex, totalFrames);
    skySvg += renderMinecraftStars(width, frameIndex);

    const cloud1X = 18 + Math.sin(driftRatio * Math.PI * 2) * 8;
    skySvg += renderMinecraftCloud(cloud1X, 32, 1.0, 0.65);
  } else if (isSunny) {
    // Day: Minecraft Sun + Daylight Cloud
    const sunX = width - 82;
    const sunY = 18;
    const sunSize = 34;
    skySvg += renderMinecraftSun(sunX, sunY, sunSize, frameIndex, totalFrames);

    const cloud1X = 18 + Math.sin(driftRatio * Math.PI * 2) * 8;
    skySvg += renderMinecraftCloud(cloud1X, 32, 1.0, 0.85);
  } else if (isCloudy) {
    const cloud1X = 14 + Math.sin(driftRatio * Math.PI * 2) * 10;
    const cloud2X = width - 120 - Math.sin(driftRatio * Math.PI * 2) * 8;
    const cloud3X = width / 2 - 30 + Math.cos(driftRatio * Math.PI * 2) * 6;
    skySvg += renderMinecraftCloud(cloud1X, 22, 1.1, 0.9);
    skySvg += renderMinecraftCloud(cloud2X, 38, 0.9, 0.85);
    skySvg += renderMinecraftCloud(cloud3X, 15, 0.8, 0.75);
  } else if (isRain) {
    // Storm clouds
    const stormCloud1X = 10 + Math.sin(driftRatio * Math.PI * 2) * 6;
    const stormCloud2X = width - 130 - Math.sin(driftRatio * Math.PI * 2) * 6;
    skySvg += renderMinecraftCloud(stormCloud1X, 16, 1.3, 0.95, true);
    skySvg += renderMinecraftCloud(stormCloud2X, 24, 1.2, 0.95, true);
  } else if (isSnow) {
    // Winter overcast clouds
    const snowCloud1X = 20 + Math.sin(driftRatio * Math.PI * 2) * 6;
    const snowCloud2X = width - 110 - Math.sin(driftRatio * Math.PI * 2) * 6;
    skySvg += renderMinecraftCloud(snowCloud1X, 22, 1.1, 0.9);
    skySvg += renderMinecraftCloud(snowCloud2X, 30, 0.9, 0.85);
  }

  // Fireworks in Sky (New Year Event)
  if (seasonalEvent === "fireworks") {
    skySvg += renderSeasonalFireworks(width, height, frameIndex, totalFrames);
  }

  // 2. Grass & Dirt Ground Layer (with embedded Diamond & Emerald Ore & Biome Styling)
  const groundSvg = renderMinecraftGround(width, height, groundY, isSnow, oreBlocks || [], treeType);

  // 3. Wooden Stat Signpost
  let signpostSvg = "";
  if (signpost) {
    signpostSvg = renderMinecraftSignpost(signpost.x, signpost.y, signpost.streak);
  }

  // 4. Milestone Treasure Chest
  let chestSvg = "";
  if (chest) {
    chestSvg = renderMinecraftChest(chest, frameIndex);
  }

  // 5. Trunk
  const trunkSvg = trunkBlocks.map((b) => renderMinecraftLog(b.x, b.y, b.size, treeType)).join("\n");

  // 6. Beehive on Trunk
  let beehiveSvg = "";
  if (beehive) {
    beehiveSvg = renderMinecraftBeehive(beehive.x, beehive.y, beehive.side);
  }

  // 7. Canopy Leaf Blocks
  const leavesSvg = leafBlocks
    .map((l) => renderMinecraftLeaf(l, frameIndex, totalFrames, isSnow, treeType))
    .join("\n");

  // 8. Holiday Fairy Lights (Canopy Overlay)
  let fairyLightsSvg = "";
  if (seasonalEvent === "holiday") {
    fairyLightsSvg = renderSeasonalFairyLights(leafBlocks, frameIndex);
  }

  // 9. Red Apples
  const applesSvg = apples.map((a) => renderApple(a, frameIndex)).join("\n");

  // 10. Flowers on Grass
  const flowersSvg = flowers.map((f) => renderFlowerOnGrass(f, frameIndex)).join("\n");

  // 11. Golden Apples on Grass
  const goldenApplesSvg = (goldenApples || []).map((g) => renderGoldenAppleOnGrass(g, frameIndex)).join("\n");

  // 12. Pet Animal Companion (Wolf / Fox / Cat / Parrot - Left side)
  let petSvg = "";
  if (pet) {
    if (pet.type === "wolf") {
      petSvg = renderMinecraftWolf(pet, frameIndex);
    } else if (pet.type === "fox") {
      petSvg = renderMinecraftFox(pet, frameIndex, isNight);
    } else if (pet.type === "cat") {
      petSvg = renderMinecraftCat(pet, frameIndex);
    } else if (pet.type === "parrot") {
      petSvg = renderMinecraftParrot(pet, frameIndex);
    }
  }

  // 13. Minecraft Farmer Under Tree (Right side)
  let farmerSvg = "";
  if (farmer) {
    farmerSvg = renderMinecraftFarmer(farmer, frameIndex, totalFrames);
  }

  // 14. Roasting Campfire
  let campfireSvg = "";
  if (campfire) {
    campfireSvg = renderMinecraftCampfire(campfire, frameIndex, totalFrames);
  }

  // 15. Halloween Jack-o'-Lantern & Flying Ghosts
  let jackOLanternSvg = "";
  let ghostsSvg = "";
  if (jackOLantern) {
    jackOLanternSvg = renderSeasonalJackOLantern(jackOLantern, frameIndex);
    ghostsSvg = renderHalloweenGhosts(jackOLantern.x, jackOLantern.y, frameIndex, totalFrames);
  }

  // 16. Holiday Gift Boxes
  let holidayGiftsSvg = "";
  if (holidayGifts && holidayGifts.length > 0) {
    holidayGiftsSvg = renderSeasonalHolidayGifts(holidayGifts, frameIndex);
  }

  // 17. Flying Minecraft Bee
  let beeSvg = "";
  if (bee && !isRain && !isSnow) {
    beeSvg = renderMinecraftBee(bee.x, bee.y, frameIndex, totalFrames);
  }

  // 18. Ambient Bioluminescent Spores / Particles (Nether & Night Biomes)
  let sporesSvg = "";
  if (treeType === "crimson" || treeType === "warped" || (isNight && !isRain && !isSnow)) {
    sporesSvg = renderBioluminescentParticles(width, groundY, frameIndex, totalFrames, treeType);
  }

  // 19. Foreground Weather Precipitation or Sakura Petals
  let precipSvg = "";
  if (isRain) {
    precipSvg = renderRainStreaks(width, groundY, frameIndex, totalFrames);
  } else if (isSnow) {
    precipSvg = renderSnowflakes(width, groundY, frameIndex, totalFrames);
  } else if (treeType === "sakura") {
    precipSvg = renderSakuraPetals(width, groundY, frameIndex, totalFrames);
  }

  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  ${skySvg}
  ${groundSvg}
  ${signpostSvg}
  ${chestSvg}
  ${trunkSvg}
  ${beehiveSvg}
  ${leavesSvg}
  ${fairyLightsSvg}
  ${applesSvg}
  ${goldenApplesSvg}
  ${flowersSvg}
  ${petSvg}
  ${farmerSvg}
  ${campfireSvg}
  ${jackOLanternSvg}
  ${ghostsSvg}
  ${holidayGiftsSvg}
  ${beeSvg}
  ${sporesSvg}
  ${precipSvg}
</svg>`;
}

export const generateSvg = renderFrame;
