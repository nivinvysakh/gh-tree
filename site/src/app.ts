import { TreeType } from "../../src/tree";
import { WeatherType } from "../../src/weather";
import { ContributionData } from "../../src/github";
import { TreePreviewEngine, PreviewSettings } from "./preview";
import {
  fetchGitHubProfile,
  fetchGitHubContributions,
  checkUserStatus,
  generateMockContributions,
} from "./github-api";
import { encodeBrowserGif, triggerFileDownload } from "./gif-browser";
import { PRESETS } from "./presets";

class GhTreeApp {
  private previewEngine: TreePreviewEngine;
  private contributionData: ContributionData;
  private settings: PreviewSettings;
  private currentUsername: string = "nivinvysakh";
  private isGeneratingGif: boolean = false;

  constructor() {
    const container = document.getElementById("tree-preview-container")!;
    this.previewEngine = new TreePreviewEngine(container);

    // Initial default settings
    this.settings = {
      treeType: "oak",
      pet: "none",
      showCampfire: false,
      weatherType: "sunny",
      isDay: true,
      streakOverride: 14,
      showSignpost: true,
      showBee: true,
      showChest: true,
      event: "none",
      isOwner: true,
      isContributor: true,
      width: 480,
      height: 400,
    };

    // Initial mock data
    this.contributionData = generateMockContributions(48, 14, 2, 4, 1);

    this.initUI();
    this.loadPresets();
    this.updatePreview();

    // Auto-fetch default user on start
    this.handleFetchUser(this.currentUsername);
  }

  private initUI(): void {
    // 1. Tab Navigation
    const tabButtons = document.querySelectorAll<HTMLButtonElement>(".tab-btn");
    tabButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        tabButtons.forEach((b) => b.classList.remove("active"));
        document.querySelectorAll(".tab-content").forEach((c) => c.classList.remove("active"));

        btn.classList.add("active");
        const targetId = btn.getAttribute("data-tab");
        if (targetId) {
          document.getElementById(targetId)?.classList.add("active");
        }
      });
    });

    // 2. Fetch User Button & Input Enter
    const fetchBtn = document.getElementById("btn-fetch-user") as HTMLButtonElement;
    const userInput = document.getElementById("input-username") as HTMLInputElement;

    fetchBtn.addEventListener("click", () => {
      const username = userInput.value.trim();
      if (username) {
        this.handleFetchUser(username);
      }
    });

    userInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const username = userInput.value.trim();
        if (username) {
          this.handleFetchUser(username);
        }
      }
    });

    // 3. Biome Selector Cards
    const biomeCards = document.querySelectorAll<HTMLElement>(".biome-card");
    biomeCards.forEach((card) => {
      card.addEventListener("click", () => {
        biomeCards.forEach((c) => c.classList.remove("active"));
        card.classList.add("active");
        const biome = card.getAttribute("data-biome") as TreeType;
        this.settings.treeType = biome;
        this.updatePreview();
      });
    });

    // 4. Pet Selector Pills
    const petPills = document.querySelectorAll<HTMLElement>("#pet-selector .pill-item");
    petPills.forEach((pill) => {
      pill.addEventListener("click", () => {
        petPills.forEach((p) => p.classList.remove("active"));
        pill.classList.add("active");
        const pet = pill.getAttribute("data-pet") as any;
        this.settings.pet = pet;
        this.updatePreview();
      });
    });

    // 5. Seasonal Events Selector Pills (maps to event param)
    const eventPills = document.querySelectorAll<HTMLElement>("#event-selector .pill-item");
    eventPills.forEach((pill) => {
      pill.addEventListener("click", () => {
        eventPills.forEach((p) => p.classList.remove("active"));
        pill.classList.add("active");
        const ev = pill.getAttribute("data-event") as any;
        this.settings.event = ev;
        this.updatePreview();
      });
    });

    // 6. Weather Selector Pills
    const weatherPills = document.querySelectorAll<HTMLElement>("#weather-selector .pill-item");
    weatherPills.forEach((pill) => {
      pill.addEventListener("click", () => {
        weatherPills.forEach((p) => p.classList.remove("active"));
        pill.classList.add("active");
        const weather = pill.getAttribute("data-weather") as WeatherType;
        this.settings.weatherType = weather;
        this.updatePreview();
      });
    });

    // 7. Toggle Switches
    this.bindToggle("toggle-campfire", (checked) => {
      this.settings.showCampfire = checked;
    });
    this.bindToggle("toggle-chest", (checked) => {
      this.settings.showChest = checked;
    });
    this.bindToggle("toggle-daytime", (checked) => {
      this.settings.isDay = checked;
    });
    this.bindToggle("toggle-owner", (checked) => {
      this.settings.isOwner = checked;
    });
    this.bindToggle("toggle-contributor", (checked) => {
      this.settings.isContributor = checked;
    });
    this.bindToggle("toggle-signpost", (checked) => {
      this.settings.showSignpost = checked;
    });
    this.bindToggle("toggle-bee", (checked) => {
      this.settings.showBee = checked;
    });
    this.bindToggle("toggle-chest", (checked) => {
      this.settings.showChest = checked;
    });

    // 8. Sliders
    this.bindSlider("slider-streak", "val-streak", " Days", (val) => {
      this.settings.streakOverride = val;
      this.contributionData.currentStreak = val;
      const streakBadge = document.getElementById("user-streak-badge");
      if (streakBadge) streakBadge.textContent = `🔥 ${val} DAYS`;
    });
    this.bindSlider("slider-commits", "val-commits", " Commits", (val) => {
      this.contributionData.totalCommits = val;
      const avgPerWeek = Math.round(val / Math.max(1, this.contributionData.weeks.length));
      this.contributionData.weeks.forEach((w) => {
        w.total = avgPerWeek;
      });
    });
    this.bindSlider("slider-openprs", "val-openprs", " PRs", (val) => {
      this.contributionData.totalOpenPRs = val;
    });
    this.bindSlider("slider-mergedprs", "val-mergedprs", " Merged", (val) => {
      this.contributionData.totalMergedPRs = val;
    });
    this.bindSlider("slider-assignedprs", "val-assignedprs", " Assigned", (val) => {
      this.contributionData.totalAssignedPRs = val;
    });

    // 9. Play / Pause & Frame Steppers
    const playPauseBtn = document.getElementById("btn-play-pause") as HTMLButtonElement;
    playPauseBtn.addEventListener("click", () => {
      const isPlaying = this.previewEngine.togglePlayPause();
      playPauseBtn.innerHTML = isPlaying ? "⏸️ Pause" : "▶️ Play";
      playPauseBtn.classList.toggle("active", isPlaying);
    });

    document.getElementById("btn-prev-frame")?.addEventListener("click", () => {
      this.previewEngine.stepFrame(-1);
      playPauseBtn.innerHTML = "▶️ Play";
      playPauseBtn.classList.remove("active");
    });

    document.getElementById("btn-next-frame")?.addEventListener("click", () => {
      this.previewEngine.stepFrame(1);
      playPauseBtn.innerHTML = "▶️ Play";
      playPauseBtn.classList.remove("active");
    });

    // 10. Zoom Controls
    const zoomButtons = document.querySelectorAll<HTMLButtonElement>(".btn-zoom");
    const previewContainer = document.getElementById("tree-preview-container")!;
    zoomButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        zoomButtons.forEach((b) => {
          b.classList.remove("active", "bg-emerald-500/20", "text-emerald-400", "border-emerald-500/30", "font-bold");
          b.classList.add("bg-slate-800/60", "text-slate-300", "font-semibold");
        });
        btn.classList.add("active", "bg-emerald-500/20", "text-emerald-400", "border-emerald-500/30", "font-bold");
        btn.classList.remove("bg-slate-800/60", "text-slate-300");
        const zoom = btn.getAttribute("data-zoom") || "1";
        previewContainer.style.transform = `scale(${zoom})`;
      });
    });

    // 11. Action Buttons (Generate GIF, Download SVG, Copy Markdown, Copy Workflow)
    document.getElementById("btn-generate-gif")?.addEventListener("click", () => this.handleGenerateGif());
    document.getElementById("btn-download-svg")?.addEventListener("click", () => this.handleDownloadSvg());
    document.getElementById("btn-copy-markdown")?.addEventListener("click", () => this.handleOpenMarkdownModal());
    document.getElementById("btn-copy-workflow")?.addEventListener("click", () => this.handleOpenWorkflowModal());

    // 13. Modal Close & Copy
    document.getElementById("modal-close")?.addEventListener("click", () => this.closeModal());
    document.getElementById("app-modal")?.addEventListener("click", (e) => {
      if ((e.target as HTMLElement).id === "app-modal") this.closeModal();
    });

    document.getElementById("btn-modal-copy")?.addEventListener("click", () => {
      const code = document.getElementById("modal-code-box")?.textContent || "";
      navigator.clipboard.writeText(code).then(() => {
        this.showToast("Copied to clipboard! 📋");
        this.closeModal();
      });
    });
  }

  private bindToggle(id: string, onChange: (checked: boolean) => void): void {
    const el = document.getElementById(id) as HTMLInputElement;
    if (el) {
      el.addEventListener("change", () => {
        onChange(el.checked);
        this.updatePreview();
      });
    }
  }

  private bindSlider(id: string, labelId: string, suffix: string, onChange: (val: number) => void): void {
    const el = document.getElementById(id) as HTMLInputElement;
    const label = document.getElementById(labelId);
    if (el) {
      el.addEventListener("input", () => {
        const val = parseInt(el.value, 10);
        if (label) label.textContent = `${val}${suffix}`;
        onChange(val);
        this.updatePreview();
      });
    }
  }

  private loadPresets(): void {
    const container = document.getElementById("presets-container");
    if (!container) return;

    container.innerHTML = "";
    PRESETS.forEach((preset) => {
      const card = document.createElement("div");
      card.className = "flex items-center gap-3 p-3 rounded-xl bg-slate-800/60 border border-white/10 hover:bg-slate-700/60 transition cursor-pointer group";
      card.innerHTML = `
        <div class="text-2xl w-10 h-10 rounded-lg bg-slate-950/60 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">${preset.emoji}</div>
        <div>
          <div class="font-bold text-xs text-white">${preset.name}</div>
          <div class="text-[11px] text-slate-400 line-clamp-1">${preset.description}</div>
        </div>
      `;
      card.addEventListener("click", () => {
        this.applyPreset(preset);
      });
      container.appendChild(card);
    });
  }

  private applyPreset(preset: typeof PRESETS[0]): void {
    const opt = preset.options;
    this.settings.treeType = opt.treeType;
    this.settings.pet = opt.pet;
    this.settings.showCampfire = opt.showCampfire;
    this.settings.weatherType = opt.weather;
    this.settings.isDay = opt.isDay;
    this.settings.streakOverride = opt.streak;
    this.settings.isOwner = opt.isOwner;
    this.settings.isContributor = opt.isContributor;

    if (opt.showJackOLantern) this.settings.event = "halloween";
    else if (opt.showHolidayGift) this.settings.event = "holiday";
    else if (opt.showFireworks) this.settings.event = "fireworks";
    else this.settings.event = "none";

    this.contributionData.totalCommits = opt.totalCommits;
    this.contributionData.totalOpenPRs = opt.openPRs;
    this.contributionData.totalMergedPRs = opt.mergedPRs;
    this.contributionData.totalAssignedPRs = opt.assignedPRs;
    this.contributionData.currentStreak = opt.streak;

    // Sync UI elements
    this.syncUIToState();
    this.updatePreview();
    this.showToast(`Applied preset: ${preset.name} ${preset.emoji}`);
  }

  private syncUIToState(): void {
    // Biome
    document.querySelectorAll(".biome-card").forEach((c) => {
      c.classList.toggle("active", c.getAttribute("data-biome") === this.settings.treeType);
    });
    // Pet
    document.querySelectorAll("#pet-selector .pill-item").forEach((p) => {
      p.classList.toggle("active", p.getAttribute("data-pet") === this.settings.pet);
    });
    // Weather
    document.querySelectorAll("#weather-selector .pill-item").forEach((w) => {
      w.classList.toggle("active", w.getAttribute("data-weather") === this.settings.weatherType);
    });

    // Seasonal Events
    document.querySelectorAll("#event-selector .pill-item").forEach((p) => {
      p.classList.toggle("active", p.getAttribute("data-event") === this.settings.event);
    });

    // Switches
    this.setSwitch("toggle-campfire", this.settings.showCampfire);
    this.setSwitch("toggle-chest", this.settings.showChest);
    this.setSwitch("toggle-daytime", this.settings.isDay);
    this.setSwitch("toggle-owner", this.settings.isOwner);
    this.setSwitch("toggle-contributor", this.settings.isContributor);
    this.setSwitch("toggle-signpost", this.settings.showSignpost);
    this.setSwitch("toggle-bee", this.settings.showBee);

    // Sliders (Stats Sandbox)
    this.setSliderVal("slider-streak", "val-streak", this.settings.streakOverride !== undefined ? this.settings.streakOverride : this.contributionData.currentStreak, " Days");
    this.setSliderVal("slider-commits", "val-commits", this.contributionData.totalCommits, " Commits");
    this.setSliderVal("slider-openprs", "val-openprs", this.contributionData.totalOpenPRs, " PRs");
    this.setSliderVal("slider-mergedprs", "val-mergedprs", this.contributionData.totalMergedPRs, " Merged");
    this.setSliderVal("slider-assignedprs", "val-assignedprs", this.contributionData.totalAssignedPRs, " Assigned");
  }

  private setSwitch(id: string, val: boolean): void {
    const el = document.getElementById(id) as HTMLInputElement;
    if (el) el.checked = val;
  }

  private setSliderVal(id: string, labelId: string, val: number, suffix: string): void {
    const el = document.getElementById(id) as HTMLInputElement;
    const label = document.getElementById(labelId);
    if (el) el.value = String(val);
    if (label) label.textContent = `${val}${suffix}`;
  }

  private async handleFetchUser(username: string): Promise<void> {
    const fetchBtn = document.getElementById("btn-fetch-user") as HTMLButtonElement;
    if (fetchBtn) {
      fetchBtn.disabled = true;
      fetchBtn.innerHTML = `<span>Loading...</span> ⏳`;
    }

    try {
      this.currentUsername = username;
      const [profile, contributions, status] = await Promise.all([
        fetchGitHubProfile(username),
        fetchGitHubContributions(username),
        checkUserStatus(username),
      ]);

      // Update user badge
      const avatarEl = document.getElementById("user-avatar") as HTMLImageElement;
      const nameEl = document.getElementById("user-display-name");
      const streakBadge = document.getElementById("user-streak-badge");

      if (avatarEl) avatarEl.src = profile.avatarUrl;
      if (nameEl) nameEl.textContent = profile.name;
      if (streakBadge) streakBadge.textContent = `🔥 ${contributions.currentStreak} DAYS`;

      this.contributionData = contributions;
      this.settings.streakOverride = contributions.currentStreak;
      this.settings.isOwner = status.isOwner;
      this.settings.isContributor = status.isContributor;
      this.settings.showCampfire = contributions.currentStreak >= 10 || contributions.totalCommits >= 60;

      // Sync all UI controls and sandbox sliders immediately
      this.syncUIToState();

      this.updatePreview();

      const statusBadge = status.isOwner 
        ? " 👑 Owner" 
        : status.isContributor 
        ? " 💎 Contributor" 
        : "";
      this.showToast(`Fetched profile for @${profile.login}${statusBadge}! 🌴`);
    } catch (err) {
      console.error(err);
      this.showToast("Could not fetch user, using simulated stats");
    } finally {
      if (fetchBtn) {
        fetchBtn.disabled = false;
        fetchBtn.innerHTML = `<span>Fetch</span> ⚡`;
      }
    }
  }

  private updatePreview(): void {
    this.previewEngine.update(this.contributionData, this.settings);
  }

  private async handleGenerateGif(): Promise<void> {
    if (this.isGeneratingGif) return;
    this.isGeneratingGif = true;

    const progressContainer = document.getElementById("gif-progress-container")!;
    const progressFill = document.getElementById("progress-fill")!;
    const progressText = document.getElementById("progress-text")!;
    const progressPct = document.getElementById("progress-pct")!;
    const gifBtn = document.getElementById("btn-generate-gif") as HTMLButtonElement;

    progressContainer.classList.add("active");
    gifBtn.disabled = true;

    try {
      const frames = this.previewEngine.getFrames();
      const gifBlob = await encodeBrowserGif(
        frames,
        this.settings.width,
        this.settings.height,
        200,
        (current, total, status) => {
          const pct = Math.round((current / total) * 100);
          progressFill.style.width = `${pct}%`;
          progressPct.textContent = `${pct}%`;
          progressText.textContent = status;
        }
      );

      triggerFileDownload(gifBlob, `${this.currentUsername}-tree.gif`);
      this.showToast("GIF downloaded successfully! 🎮");
    } catch (err) {
      console.error("GIF generation failed:", err);
      this.showToast("Failed to generate GIF. Please try again.");
    } finally {
      this.isGeneratingGif = false;
      gifBtn.disabled = false;
      setTimeout(() => {
        progressContainer.classList.remove("active");
        progressFill.style.width = "0%";
      }, 1200);
    }
  }

  private handleDownloadSvg(): void {
    const svgStr = this.previewEngine.getCurrentSvg();
    if (!svgStr) return;
    const blob = new Blob([svgStr], { type: "image/svg+xml;charset=utf-8" });
    triggerFileDownload(blob, `${this.currentUsername}-tree.svg`);
    this.showToast("SVG downloaded! 🖼️");
  }

  private handleOpenMarkdownModal(): void {
    const snippet = `<!-- commit-tree-start -->
![${this.currentUsername}'s Minecraft Tree](https://github.com/${this.currentUsername}/${this.currentUsername}/raw/main/tree.gif)
<!-- commit-tree-end -->`;

    this.openModal(
      "GitHub Profile README Markdown",
      "Add this snippet to your GitHub Profile README.md (the Action will keep it automatically updated!):",
      snippet
    );
  }

  private handleOpenWorkflowModal(): void {
    const yaml = `name: Daily Minecraft Tree Update

on:
  schedule:
    - cron: '0 0 * * *' # Runs daily at midnight UTC
  workflow_dispatch:

permissions:
  contents: write

jobs:
  build-tree:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Generate Minecraft Tree
        uses: nivinvysakh/gh-tree@v1
        with:
          github-token: \${{ secrets.GITHUB_TOKEN }}
          tree-type: '${this.settings.treeType}'
          pet: '${this.settings.pet}'
          event: '${this.settings.event}'
          weather: '${this.settings.weatherType}'
          show-campfire: ${this.settings.showCampfire}
          show-chest: ${this.settings.showChest}
          show-signpost: ${this.settings.showSignpost}
          show-bee: ${this.settings.showBee}`;

    this.openModal(
      "GitHub Actions Workflow (.github/workflows/gh-tree.yml)",
      "Create this file in your profile repository to automatically render and update your tree daily:",
      yaml
    );
  }

  private openModal(title: string, desc: string, code: string): void {
    const modal = document.getElementById("app-modal")!;
    const titleEl = document.getElementById("modal-title")!;
    const descEl = document.getElementById("modal-desc")!;
    const codeEl = document.getElementById("modal-code-box")!;

    titleEl.textContent = title;
    descEl.textContent = desc;
    codeEl.textContent = code;
    modal.classList.add("active");
  }

  private closeModal(): void {
    document.getElementById("app-modal")?.classList.remove("active");
  }

  private showToast(message: string): void {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = "toast px-4 py-2.5 bg-emerald-500 text-slate-950 rounded-xl font-bold text-xs shadow-2xl flex items-center gap-2";
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(20px)";
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
}

// Bootstrap application on DOM ready
window.addEventListener("DOMContentLoaded", () => {
  new GhTreeApp();
});
