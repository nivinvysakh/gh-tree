import { buildTreeLayout, TreeLayout, TreeType } from "../../src/tree";
import { renderFrame } from "../../src/svg";
import { ContributionData } from "../../src/github";
import { WeatherCondition, WeatherType } from "../../src/weather";

export interface PreviewSettings {
  treeType: TreeType;
  pet: "none" | "wolf" | "cat" | "fox" | "auto";
  showCampfire: boolean;
  weatherType: WeatherType;
  isDay: boolean;
  streakOverride?: number;
  showSignpost: boolean;
  showBee: boolean;
  showChest: boolean;
  event: "none" | "halloween" | "holiday" | "fireworks" | "auto";
  isOwner: boolean;
  isContributor: boolean;
  width: number;
  height: number;
}

export class TreePreviewEngine {
  private container: HTMLElement;
  private currentFrames: string[] = [];
  private currentFrameIndex: number = 0;
  private animationTimer: number | null = null;
  private isPlaying: boolean = true;
  private frameDelayMs: number = 200; // 5 FPS (matching gh-tree action)
  private totalFrames: number = 6;
  private lastLayout: TreeLayout | null = null;

  constructor(containerElement: HTMLElement) {
    this.container = containerElement;
  }

  /**
   * Rebuilds all SVG frames from contribution data and settings, then updates the live preview.
   */
  public update(contributionData: ContributionData, settings: PreviewSettings): void {
    const weather: WeatherCondition = {
      type: settings.weatherType,
      description: `${settings.weatherType} condition`,
      isDay: settings.isDay,
    };

    const effectiveStreak = settings.streakOverride !== undefined 
      ? settings.streakOverride 
      : contributionData.currentStreak;

    this.lastLayout = buildTreeLayout(
      contributionData.weeks,
      contributionData.totalCommits,
      {
        width: settings.width,
        height: settings.height,
        weather,
        treeType: settings.treeType,
        showSignpost: settings.showSignpost,
        showBee: settings.showBee,
        pet: settings.pet === "none" ? "none" : settings.pet,
        showCampfire: settings.showCampfire,
        showChest: settings.showChest,
        event: settings.event === "none" ? "none" : settings.event,
        streak: effectiveStreak,
        openPRs: contributionData.totalOpenPRs,
        mergedPRs: contributionData.totalMergedPRs,
        assignedPRs: contributionData.totalAssignedPRs,
        isOwner: settings.isOwner,
        isContributor: settings.isContributor,
      }
    );

    this.currentFrames = Array.from({ length: this.totalFrames }, (_, i) =>
      renderFrame(this.lastLayout!, i, this.totalFrames)
    );

    this.renderCurrentFrame();
    this.startAnimationLoop();
  }

  private renderCurrentFrame(): void {
    if (this.currentFrames.length === 0) return;
    const svgStr = this.currentFrames[this.currentFrameIndex % this.currentFrames.length];
    this.container.innerHTML = svgStr;
  }

  public startAnimationLoop(): void {
    if (this.animationTimer) {
      clearInterval(this.animationTimer);
    }
    if (!this.isPlaying) return;

    this.animationTimer = window.setInterval(() => {
      if (this.currentFrames.length > 0) {
        this.currentFrameIndex = (this.currentFrameIndex + 1) % this.currentFrames.length;
        this.renderCurrentFrame();
      }
    }, this.frameDelayMs);
  }

  public togglePlayPause(): boolean {
    this.isPlaying = !this.isPlaying;
    if (this.isPlaying) {
      this.startAnimationLoop();
    } else if (this.animationTimer) {
      clearInterval(this.animationTimer);
      this.animationTimer = null;
    }
    return this.isPlaying;
  }

  public stepFrame(delta: number): number {
    this.isPlaying = false;
    if (this.animationTimer) {
      clearInterval(this.animationTimer);
      this.animationTimer = null;
    }
    if (this.currentFrames.length > 0) {
      this.currentFrameIndex = (this.currentFrameIndex + delta + this.currentFrames.length) % this.currentFrames.length;
      this.renderCurrentFrame();
    }
    return this.currentFrameIndex;
  }

  public getFrames(): string[] {
    return this.currentFrames;
  }

  public getCurrentSvg(): string {
    return this.currentFrames[this.currentFrameIndex] || (this.currentFrames.length > 0 ? this.currentFrames[0] : "");
  }

  public getLayout(): TreeLayout | null {
    return this.lastLayout;
  }

  public destroy(): void {
    if (this.animationTimer) {
      clearInterval(this.animationTimer);
      this.animationTimer = null;
    }
  }
}
