"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSvg = exports.renderSeasonalFairyLights = exports.renderSeasonalHolidayGifts = exports.renderHalloweenGhosts = exports.renderSeasonalJackOLantern = exports.renderMinecraftChest = exports.renderMinecraftCampfire = exports.renderMinecraftParrot = exports.renderMinecraftCat = exports.renderMinecraftFox = exports.renderMinecraftWolf = exports.renderMinecraftFarmer = exports.renderMinecraftSignpost = exports.renderMinecraftBeehive = exports.renderMinecraftBee = exports.renderGoldenAppleOnGrass = exports.renderApple = exports.renderFlowerOnGrass = exports.renderMinecraftLeaf = exports.renderMinecraftLog = exports.renderMinecraftGround = exports.renderSeasonalFireworks = exports.renderSakuraPetals = exports.renderSnowflakes = exports.renderRainStreaks = exports.renderMinecraftCloud = exports.renderBioluminescentParticles = exports.renderMinecraftStars = exports.renderMinecraftMoon = exports.renderMinecraftSun = void 0;
exports.renderFrame = renderFrame;
const environment_1 = require("./environment");
const props_1 = require("./props");
var environment_2 = require("./environment");
Object.defineProperty(exports, "renderMinecraftSun", { enumerable: true, get: function () { return environment_2.renderMinecraftSun; } });
Object.defineProperty(exports, "renderMinecraftMoon", { enumerable: true, get: function () { return environment_2.renderMinecraftMoon; } });
Object.defineProperty(exports, "renderMinecraftStars", { enumerable: true, get: function () { return environment_2.renderMinecraftStars; } });
Object.defineProperty(exports, "renderBioluminescentParticles", { enumerable: true, get: function () { return environment_2.renderBioluminescentParticles; } });
Object.defineProperty(exports, "renderMinecraftCloud", { enumerable: true, get: function () { return environment_2.renderMinecraftCloud; } });
Object.defineProperty(exports, "renderRainStreaks", { enumerable: true, get: function () { return environment_2.renderRainStreaks; } });
Object.defineProperty(exports, "renderSnowflakes", { enumerable: true, get: function () { return environment_2.renderSnowflakes; } });
Object.defineProperty(exports, "renderSakuraPetals", { enumerable: true, get: function () { return environment_2.renderSakuraPetals; } });
Object.defineProperty(exports, "renderSeasonalFireworks", { enumerable: true, get: function () { return environment_2.renderSeasonalFireworks; } });
var props_2 = require("./props");
Object.defineProperty(exports, "renderMinecraftGround", { enumerable: true, get: function () { return props_2.renderMinecraftGround; } });
Object.defineProperty(exports, "renderMinecraftLog", { enumerable: true, get: function () { return props_2.renderMinecraftLog; } });
Object.defineProperty(exports, "renderMinecraftLeaf", { enumerable: true, get: function () { return props_2.renderMinecraftLeaf; } });
Object.defineProperty(exports, "renderFlowerOnGrass", { enumerable: true, get: function () { return props_2.renderFlowerOnGrass; } });
Object.defineProperty(exports, "renderApple", { enumerable: true, get: function () { return props_2.renderApple; } });
Object.defineProperty(exports, "renderGoldenAppleOnGrass", { enumerable: true, get: function () { return props_2.renderGoldenAppleOnGrass; } });
Object.defineProperty(exports, "renderMinecraftBee", { enumerable: true, get: function () { return props_2.renderMinecraftBee; } });
Object.defineProperty(exports, "renderMinecraftBeehive", { enumerable: true, get: function () { return props_2.renderMinecraftBeehive; } });
Object.defineProperty(exports, "renderMinecraftSignpost", { enumerable: true, get: function () { return props_2.renderMinecraftSignpost; } });
Object.defineProperty(exports, "renderMinecraftFarmer", { enumerable: true, get: function () { return props_2.renderMinecraftFarmer; } });
Object.defineProperty(exports, "renderMinecraftWolf", { enumerable: true, get: function () { return props_2.renderMinecraftWolf; } });
Object.defineProperty(exports, "renderMinecraftFox", { enumerable: true, get: function () { return props_2.renderMinecraftFox; } });
Object.defineProperty(exports, "renderMinecraftCat", { enumerable: true, get: function () { return props_2.renderMinecraftCat; } });
Object.defineProperty(exports, "renderMinecraftParrot", { enumerable: true, get: function () { return props_2.renderMinecraftParrot; } });
Object.defineProperty(exports, "renderMinecraftCampfire", { enumerable: true, get: function () { return props_2.renderMinecraftCampfire; } });
Object.defineProperty(exports, "renderMinecraftChest", { enumerable: true, get: function () { return props_2.renderMinecraftChest; } });
Object.defineProperty(exports, "renderSeasonalJackOLantern", { enumerable: true, get: function () { return props_2.renderSeasonalJackOLantern; } });
Object.defineProperty(exports, "renderHalloweenGhosts", { enumerable: true, get: function () { return props_2.renderHalloweenGhosts; } });
Object.defineProperty(exports, "renderSeasonalHolidayGifts", { enumerable: true, get: function () { return props_2.renderSeasonalHolidayGifts; } });
Object.defineProperty(exports, "renderSeasonalFairyLights", { enumerable: true, get: function () { return props_2.renderSeasonalFairyLights; } });
function renderFrame(layout, frameIndex, totalFrames) {
    const { width, height, groundY, treeType, trunkBlocks, leafBlocks, flowers, apples, goldenApples, oreBlocks, bee, beehive, signpost, pet, farmer, campfire, chest, seasonalEvent, holidayGifts, jackOLantern, weather, } = layout;
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
        const moonX = width - 88;
        const moonY = 18;
        const moonSize = 34;
        skySvg += (0, environment_1.renderMinecraftMoon)(moonX, moonY, moonSize, frameIndex, totalFrames);
        skySvg += (0, environment_1.renderMinecraftStars)(width, frameIndex);
        const cloud1X = 28 + Math.sin(driftRatio * Math.PI * 2) * 8;
        skySvg += (0, environment_1.renderMinecraftCloud)(cloud1X, 26, 0.95, 0.65);
        if (width > 550) {
            const cloud2X = width - 280 - Math.sin(driftRatio * Math.PI * 2) * 8;
            skySvg += (0, environment_1.renderMinecraftCloud)(cloud2X, 34, 0.85, 0.55);
        }
    }
    else if (isSunny) {
        // Day: Minecraft Sun + Daylight Cloud
        const sunX = width - 88;
        const sunY = 18;
        const sunSize = 34;
        skySvg += (0, environment_1.renderMinecraftSun)(sunX, sunY, sunSize, frameIndex, totalFrames);
        const cloud1X = 28 + Math.sin(driftRatio * Math.PI * 2) * 8;
        skySvg += (0, environment_1.renderMinecraftCloud)(cloud1X, 26, 0.95, 0.85);
        if (width > 550) {
            const cloud2X = width - 280 - Math.sin(driftRatio * Math.PI * 2) * 8;
            skySvg += (0, environment_1.renderMinecraftCloud)(cloud2X, 34, 0.85, 0.75);
        }
    }
    else if (isCloudy) {
        const cloud1X = 24 + Math.sin(driftRatio * Math.PI * 2) * 8;
        const cloud2X = width - 220 - Math.sin(driftRatio * Math.PI * 2) * 8;
        const cloud3X = 130 + Math.cos(driftRatio * Math.PI * 2) * 6;
        skySvg += (0, environment_1.renderMinecraftCloud)(cloud1X, 24, 1.0, 0.9);
        skySvg += (0, environment_1.renderMinecraftCloud)(cloud2X, 32, 0.9, 0.85);
        skySvg += (0, environment_1.renderMinecraftCloud)(cloud3X, 18, 0.8, 0.75);
    }
    else if (isRain) {
        // Storm clouds
        const stormCloud1X = 20 + Math.sin(driftRatio * Math.PI * 2) * 6;
        const stormCloud2X = width - 220 - Math.sin(driftRatio * Math.PI * 2) * 6;
        const stormCloud3X = 130 + Math.cos(driftRatio * Math.PI * 2) * 6;
        skySvg += (0, environment_1.renderMinecraftCloud)(stormCloud1X, 20, 1.1, 0.95, true);
        skySvg += (0, environment_1.renderMinecraftCloud)(stormCloud2X, 28, 1.05, 0.95, true);
        if (width > 550) {
            skySvg += (0, environment_1.renderMinecraftCloud)(stormCloud3X, 16, 0.95, 0.9, true);
        }
    }
    else if (isSnow) {
        // Winter overcast clouds
        const snowCloud1X = 24 + Math.sin(driftRatio * Math.PI * 2) * 6;
        const snowCloud2X = width - 220 - Math.sin(driftRatio * Math.PI * 2) * 6;
        const snowCloud3X = 130 + Math.cos(driftRatio * Math.PI * 2) * 6;
        skySvg += (0, environment_1.renderMinecraftCloud)(snowCloud1X, 22, 1.0, 0.9);
        skySvg += (0, environment_1.renderMinecraftCloud)(snowCloud2X, 30, 0.9, 0.85);
        if (width > 550) {
            skySvg += (0, environment_1.renderMinecraftCloud)(snowCloud3X, 18, 0.85, 0.8);
        }
    }
    // Fireworks in Sky (New Year Event)
    if (seasonalEvent === "fireworks") {
        skySvg += (0, environment_1.renderSeasonalFireworks)(width, height, frameIndex, totalFrames);
    }
    // 2. Grass & Dirt Ground Layer (with embedded Diamond & Emerald Ore & Biome Styling)
    const groundSvg = (0, props_1.renderMinecraftGround)(width, height, groundY, isSnow, oreBlocks || [], treeType);
    // 3. Wooden Stat Signpost
    let signpostSvg = "";
    if (signpost) {
        signpostSvg = (0, props_1.renderMinecraftSignpost)(signpost.x, signpost.y, signpost.streak);
    }
    // 4. Milestone Treasure Chest
    let chestSvg = "";
    if (chest) {
        chestSvg = (0, props_1.renderMinecraftChest)(chest, frameIndex);
    }
    // 5. Trunk
    const trunkSvg = trunkBlocks.map((b) => (0, props_1.renderMinecraftLog)(b.x, b.y, b.size, treeType)).join("\n");
    // 6. Beehive on Trunk
    let beehiveSvg = "";
    if (beehive) {
        beehiveSvg = (0, props_1.renderMinecraftBeehive)(beehive.x, beehive.y, beehive.side);
    }
    // 7. Canopy Leaf Blocks
    const leavesSvg = leafBlocks
        .map((l) => (0, props_1.renderMinecraftLeaf)(l, frameIndex, totalFrames, isSnow, treeType))
        .join("\n");
    // 8. Holiday Fairy Lights (Canopy Overlay)
    let fairyLightsSvg = "";
    if (seasonalEvent === "holiday") {
        fairyLightsSvg = (0, props_1.renderSeasonalFairyLights)(leafBlocks, frameIndex);
    }
    // 9. Red Apples
    const applesSvg = apples.map((a) => (0, props_1.renderApple)(a, frameIndex)).join("\n");
    // 10. Flowers on Grass
    const flowersSvg = flowers.map((f) => (0, props_1.renderFlowerOnGrass)(f, frameIndex)).join("\n");
    // 11. Golden Apples on Grass
    const goldenApplesSvg = (goldenApples || []).map((g) => (0, props_1.renderGoldenAppleOnGrass)(g, frameIndex)).join("\n");
    // 12. Pet Animal Companion (Wolf / Fox / Cat / Parrot - Left side)
    let petSvg = "";
    if (pet) {
        if (pet.type === "wolf") {
            petSvg = (0, props_1.renderMinecraftWolf)(pet, frameIndex);
        }
        else if (pet.type === "fox") {
            petSvg = (0, props_1.renderMinecraftFox)(pet, frameIndex, isNight);
        }
        else if (pet.type === "cat") {
            petSvg = (0, props_1.renderMinecraftCat)(pet, frameIndex);
        }
        else if (pet.type === "parrot") {
            petSvg = (0, props_1.renderMinecraftParrot)(pet, frameIndex);
        }
    }
    // 13. Minecraft Farmer Under Tree (Right side)
    let farmerSvg = "";
    if (farmer) {
        farmerSvg = (0, props_1.renderMinecraftFarmer)(farmer, frameIndex, totalFrames);
    }
    // 14. Roasting Campfire
    let campfireSvg = "";
    if (campfire) {
        campfireSvg = (0, props_1.renderMinecraftCampfire)(campfire, frameIndex, totalFrames);
    }
    // 15. Halloween Jack-o'-Lantern & Flying Ghosts
    let jackOLanternSvg = "";
    let ghostsSvg = "";
    if (jackOLantern) {
        jackOLanternSvg = (0, props_1.renderSeasonalJackOLantern)(jackOLantern, frameIndex);
        ghostsSvg = (0, props_1.renderHalloweenGhosts)(jackOLantern.x, jackOLantern.y, frameIndex, totalFrames);
    }
    // 16. Holiday Gift Boxes
    let holidayGiftsSvg = "";
    if (holidayGifts && holidayGifts.length > 0) {
        holidayGiftsSvg = (0, props_1.renderSeasonalHolidayGifts)(holidayGifts, frameIndex);
    }
    // 17. Flying Minecraft Bee
    let beeSvg = "";
    if (bee && !isRain && !isSnow) {
        beeSvg = (0, props_1.renderMinecraftBee)(bee.x, bee.y, frameIndex, totalFrames);
    }
    // 18. Ambient Bioluminescent Spores / Particles (Nether & Night Biomes)
    let sporesSvg = "";
    if (treeType === "crimson" || treeType === "warped" || (isNight && !isRain && !isSnow)) {
        sporesSvg = (0, environment_1.renderBioluminescentParticles)(width, groundY, frameIndex, totalFrames, treeType);
    }
    // 19. Foreground Weather Precipitation or Sakura Petals
    let precipSvg = "";
    if (isRain) {
        precipSvg = (0, environment_1.renderRainStreaks)(width, groundY, frameIndex, totalFrames);
    }
    else if (isSnow) {
        precipSvg = (0, environment_1.renderSnowflakes)(width, groundY, frameIndex, totalFrames);
    }
    else if (treeType === "sakura") {
        precipSvg = (0, environment_1.renderSakuraPetals)(width, groundY, frameIndex, totalFrames);
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
exports.generateSvg = renderFrame;
//# sourceMappingURL=svg.js.map