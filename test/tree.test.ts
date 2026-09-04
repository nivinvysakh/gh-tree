import { describe, it, expect } from "vitest";
import { buildTreeLayout, getCommitLevel, MAX_FLOWERS, MAX_APPLES, MAX_GOLDEN_APPLES } from "../src/tree";
import { ContributionWeek } from "../src/github";

describe("Minecraft tree module", () => {
  describe("getCommitLevel", () => {
    it("maps commit counts to levels 0 through 4 correctly", () => {
      expect(getCommitLevel(0)).toBe(0);
      expect(getCommitLevel(-1)).toBe(0);
      expect(getCommitLevel(1)).toBe(1);
      expect(getCommitLevel(4)).toBe(1);
      expect(getCommitLevel(5)).toBe(2);
      expect(getCommitLevel(14)).toBe(2);
      expect(getCommitLevel(15)).toBe(3);
      expect(getCommitLevel(29)).toBe(3);
      expect(getCommitLevel(30)).toBe(4);
      expect(getCommitLevel(100)).toBe(4);
    });
  });

  describe("buildTreeLayout", () => {
    const mockWeeks: ContributionWeek[] = [
      {
        days: [{ date: "2026-08-01", count: 0 }],
        total: 0,
        openPRs: 0,
        mergedPRs: 0,
        assignedPRs: 0,
      },
      {
        days: [{ date: "2026-08-08", count: 15 }],
        total: 15,
        openPRs: 2,
        mergedPRs: 0,
        assignedPRs: 2,
      },
      {
        days: [{ date: "2026-08-15", count: 32 }],
        total: 32,
        openPRs: 0,
        mergedPRs: 3,
        assignedPRs: 0,
      },
    ];

    it("generates 14 canopy blocks with commit green levels and 3-block trunk", () => {
      const layout = buildTreeLayout(mockWeeks, undefined, { width: 460, height: 420 });
      expect(layout.width).toBe(460);
      expect(layout.height).toBe(420);
      expect(layout.trunkBlocks).toHaveLength(3);
      expect(layout.leafBlocks).toHaveLength(14);
      expect(layout.totalCommits).toBe(47);
    });

    it("generates flowers on grass for open PRs and respects MAX_FLOWERS cap of 4", () => {
      const layout = buildTreeLayout(mockWeeks);
      expect(layout.openPRs).toBe(2);
      expect(layout.flowers).toHaveLength(2);
      expect(["poppy", "sakura", "tulip", "dandelion"]).toContain(layout.flowers[0].type);

      // Test cap with 20 open PRs
      const highPRWeeks: ContributionWeek[] = [
        {
          days: [{ date: "2026-08-01", count: 10 }],
          total: 10,
          openPRs: 20,
          mergedPRs: 20,
          assignedPRs: 20,
        },
      ];
      const cappedLayout = buildTreeLayout(highPRWeeks);
      expect(cappedLayout.flowers).toHaveLength(MAX_FLOWERS);
      expect(cappedLayout.flowers.length).toBeLessThanOrEqual(4);
    });

    it("generates apples for merged PRs and respects MAX_APPLES cap of 4", () => {
      const layout = buildTreeLayout(mockWeeks);
      expect(layout.mergedPRs).toBe(3);
      expect(layout.apples).toHaveLength(3);

      const highPRWeeks: ContributionWeek[] = [
        {
          days: [{ date: "2026-08-01", count: 10 }],
          total: 10,
          openPRs: 20,
          mergedPRs: 20,
          assignedPRs: 20,
        },
      ];
      const cappedLayout = buildTreeLayout(highPRWeeks);
      expect(cappedLayout.apples).toHaveLength(MAX_APPLES);
      expect(cappedLayout.apples.length).toBeLessThanOrEqual(4);
    });

    it("generates golden apples on grass for assigned PRs and respects MAX_GOLDEN_APPLES cap of 4", () => {
      const layout = buildTreeLayout(mockWeeks);
      expect(layout.assignedPRs).toBe(2);
      expect(layout.goldenApples).toHaveLength(2);

      const highPRWeeks: ContributionWeek[] = [
        {
          days: [{ date: "2026-08-01", count: 10 }],
          total: 10,
          openPRs: 20,
          mergedPRs: 20,
          assignedPRs: 20,
        },
      ];
      const cappedLayout = buildTreeLayout(highPRWeeks);
      expect(cappedLayout.goldenApples).toHaveLength(MAX_GOLDEN_APPLES);
      expect(cappedLayout.goldenApples.length).toBeLessThanOrEqual(4);
    });

    it("generates signpost, beehive, bee, and ore blocks based on activity and options", () => {
      const activeWeeks: ContributionWeek[] = [
        {
          days: [
            { date: "2026-08-20", count: 12 },
            { date: "2026-08-21", count: 15 },
            { date: "2026-08-22", count: 20 },
            { date: "2026-08-23", count: 35 },
          ],
          total: 82,
          openPRs: 2,
          mergedPRs: 2,
          assignedPRs: 1,
        },
      ];

      const layout = buildTreeLayout(activeWeeks, undefined, {
        treeType: "sakura",
        showSignpost: true,
        showBee: true,
      });

      expect(layout.treeType).toBe("sakura");
      expect(layout.currentStreak).toBe(4);
      expect(layout.signpost).toBeDefined();
      expect(layout.signpost?.streak).toBe(4);
      expect(layout.beehive).toBeDefined();
      expect(layout.bee).toBeDefined();
      expect(layout.oreBlocks.length).toBeGreaterThanOrEqual(1);
    });

    it("unlocks Gold, Diamond, Emerald, Redstone, Netherite (owner), and Lapis (contributor) ores", () => {
      // High streak + high commits + PR merges + isOwner + isContributor => all 6 ores
      const allMilestonesWeek: ContributionWeek[] = [
        {
          days: Array.from({ length: 14 }, (_, i) => ({ date: `2026-08-${String(i + 1).padStart(2, "0")}`, count: 10 })),
          total: 140,
          openPRs: 2,
          mergedPRs: 3,
          assignedPRs: 1,
        },
      ];

      const fullLayout = buildTreeLayout(allMilestonesWeek, undefined, {
        isOwner: true,
        isContributor: true,
      });
      const oreTypes = fullLayout.oreBlocks.map((o) => o.type);
      expect(oreTypes).toContain("netherite");
      expect(oreTypes).toContain("gold");
      expect(oreTypes).toContain("diamond");
      expect(oreTypes).toContain("emerald");
      expect(oreTypes).toContain("lapis");
      expect(oreTypes).toContain("redstone");
      expect(fullLayout.oreBlocks).toHaveLength(6);
    });

    it("assigns Minecraft Pet Companions (Wolf, Fox, Cat) based on streaks and options", () => {
      // Streak >= 14 -> Wolf
      const streak14Weeks: ContributionWeek[] = [
        {
          days: Array.from({ length: 14 }, (_, i) => ({ date: `2026-08-${String(i + 1).padStart(2, "0")}`, count: 2 })),
          total: 28,
          openPRs: 0,
          mergedPRs: 0,
          assignedPRs: 0,
        },
      ];
      const wolfLayout = buildTreeLayout(streak14Weeks);
      expect(wolfLayout.pet).toBeDefined();
      expect(wolfLayout.pet?.type).toBe("wolf");
      expect(wolfLayout.pet?.state).toBe("sitting");

      // Streak >= 7 -> Fox (sleeping in daytime, standing at night)
      const streak7Weeks: ContributionWeek[] = [
        {
          days: Array.from({ length: 7 }, (_, i) => ({ date: `2026-08-${String(i + 1).padStart(2, "0")}`, count: 2 })),
          total: 14,
          openPRs: 0,
          mergedPRs: 0,
          assignedPRs: 0,
        },
      ];
      const foxDayLayout = buildTreeLayout(streak7Weeks, undefined, { weather: { type: "sunny", description: "Sunny" } });
      expect(foxDayLayout.pet?.type).toBe("fox");
      expect(foxDayLayout.pet?.state).toBe("sleeping");

      const foxNightLayout = buildTreeLayout(streak7Weeks, undefined, { weather: { type: "night", description: "Night", isDay: false } });
      expect(foxNightLayout.pet?.type).toBe("fox");
      expect(foxNightLayout.pet?.state).toBe("standing");

      // Explicit pet override and pet: 'none'
      const customPetLayout = buildTreeLayout(streak7Weeks, undefined, { pet: "cat" });
      expect(customPetLayout.pet?.type).toBe("cat");

      const noPetLayout = buildTreeLayout(streak14Weeks, undefined, { pet: "none" });
      expect(noPetLayout.pet).toBeUndefined();
    });

    it("triggers roasting campfire during high activity sprints or manual toggle", () => {
      // High recent sprint (>= 12 commits in recent 2 weeks)
      const sprintWeeks: ContributionWeek[] = [
        { days: [{ date: "2026-08-01", count: 20 }], total: 20, openPRs: 0, mergedPRs: 0, assignedPRs: 0 },
      ];
      const sprintLayout = buildTreeLayout(sprintWeeks);
      expect(sprintLayout.campfire).toBeDefined();

      const noCampfireLayout = buildTreeLayout(sprintWeeks, undefined, { showCampfire: false });
      expect(noCampfireLayout.campfire).toBeUndefined();

      const manualCampfireLayout = buildTreeLayout([], undefined, { showCampfire: true });
      expect(manualCampfireLayout.campfire).toBeDefined();
    });

    it("allocates non-overlapping ground slots for flowers and props", () => {
      const busyWeeks: ContributionWeek[] = [
        { days: [{ date: "2026-08-01", count: 10 }], total: 10, openPRs: 8, mergedPRs: 0, assignedPRs: 0 },
      ];
      const busyLayout = buildTreeLayout(busyWeeks, undefined, {
        showCampfire: true,
        showChest: true,
        pet: "cat",
        event: "halloween",
      });

      const usedXCoords = [
        busyLayout.pet?.x,
        busyLayout.campfire?.x,
        busyLayout.chest?.x,
        busyLayout.jackOLantern?.x,
        ...busyLayout.flowers.map((f) => f.x),
      ].filter((x): x is number => x !== undefined);

      const uniqueCoords = new Set(usedXCoords);
      expect(uniqueCoords.size).toBe(usedXCoords.length);
    });

    it("upgrades Milestone Treasure Chest across wood, iron, gold, diamond, and ender tiers", () => {
      const makeWeek = (total: number): ContributionWeek[] => [
        { days: [{ date: "2026-08-01", count: total }], total, openPRs: 0, mergedPRs: 0, assignedPRs: 0 },
      ];

      expect(buildTreeLayout(makeWeek(20)).chest?.type).toBe("wood");
      expect(buildTreeLayout(makeWeek(60)).chest?.type).toBe("iron");
      expect(buildTreeLayout(makeWeek(180)).chest?.type).toBe("gold");
      expect(buildTreeLayout(makeWeek(350)).chest?.type).toBe("diamond");
      expect(buildTreeLayout(makeWeek(550)).chest?.type).toBe("ender");

      const noChestLayout = buildTreeLayout(makeWeek(550), undefined, { showChest: false });
      expect(noChestLayout.chest).toBeUndefined();
    });

    it("activates seasonal events (Halloween, Holiday/Christmas, Fireworks) automatically or manually", () => {
      // Halloween (October)
      const octDate = new Date(2026, 9, 31); // Month 9 = October
      const halloweenLayout = buildTreeLayout([], undefined, { currentDate: octDate });
      expect(halloweenLayout.seasonalEvent).toBe("halloween");
      expect(halloweenLayout.jackOLantern).toBeDefined();

      // Holiday / Christmas (December)
      const decDate = new Date(2026, 11, 25); // Month 11 = December
      const holidayLayout = buildTreeLayout([], undefined, { currentDate: decDate });
      expect(holidayLayout.seasonalEvent).toBe("holiday");
      expect(holidayLayout.holidayGifts).toBeDefined();
      expect(holidayLayout.holidayGifts?.length).toBeGreaterThan(0);

      // New Year Fireworks (January)
      const janDate = new Date(2026, 0, 1); // Month 0 = January
      const fireworksLayout = buildTreeLayout([], undefined, { currentDate: janDate });
      expect(fireworksLayout.seasonalEvent).toBe("fireworks");

      // Manual override
      const manualHalloween = buildTreeLayout([], undefined, { event: "halloween" });
      expect(manualHalloween.seasonalEvent).toBe("halloween");
      expect(manualHalloween.jackOLantern).toBeDefined();
    });
  });
});
