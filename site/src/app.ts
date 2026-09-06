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
import { encodeBrowserGif, triggerFileDownload, sanitizeFilename } from "./gif-browser";
import { PRESETS } from "./presets";

class GhTreeApp {
  private previewEngine: TreePreviewEngine;
  private contributionData: ContributionData;
  private settings: PreviewSettings;
  private currentUsername: string = "nivinvysakh";
  private isGeneratingGif: boolean = false;
  private isFetchingUser: boolean = false;

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
      isContributor: false,
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

    userInput.addEventListener("input", () => {
      this.clearInputError();
    });

    fetchBtn.addEventListener("click", () => {
      const username = userInput.value.trim();
      this.handleFetchUser(username);
    });

    userInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const username = userInput.value.trim();
        this.handleFetchUser(username);
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
    this.bindToggle("toggle-signpost", (checked) => {
      this.settings.showSignpost = checked;
    });
    this.bindToggle("toggle-bee", (checked) => {
      this.settings.showBee = checked;
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

    // 12. Quick Embed Action Buttons
    document.getElementById("btn-quick-copy-md")?.addEventListener("click", () => {
      const md = this.getLiveMarkdownEmbed();
      navigator.clipboard.writeText(md).then(() => {
        this.showToast("Markdown embed copied! 📋 Paste it in your README", "success");
      });
    });

    document.getElementById("btn-quick-copy-url")?.addEventListener("click", () => {
      const url = this.getLiveApiUrl();
      navigator.clipboard.writeText(url).then(() => {
        this.showToast("Direct Image URL copied! 🔗", "success");
      });
    });

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

  private showInputError(message: string): void {
    const input = document.getElementById("input-username") as HTMLInputElement;
    const errorContainer = document.getElementById("username-error-msg");
    const errorText = document.getElementById("username-error-text");

    if (input) {
      input.classList.add("border-rose-500", "focus:border-rose-500", "focus:ring-rose-500");
      input.classList.remove("border-white/10", "focus:border-emerald-500", "focus:ring-emerald-500");
    }

    if (errorContainer && errorText) {
      errorText.textContent = message;
      errorContainer.classList.remove("hidden");
      errorContainer.classList.add("flex");
    }
  }

  private clearInputError(): void {
    const input = document.getElementById("input-username") as HTMLInputElement;
    const errorContainer = document.getElementById("username-error-msg");

    if (input) {
      input.classList.remove("border-rose-500", "focus:border-rose-500", "focus:ring-rose-500");
      input.classList.add("border-white/10", "focus:border-emerald-500", "focus:ring-emerald-500");
    }

    if (errorContainer) {
      errorContainer.classList.add("hidden");
      errorContainer.classList.remove("flex");
    }
  }

  private async handleFetchUser(username: string): Promise<void> {
    if (this.isFetchingUser) return;

    const cleanUser = username.trim().replace(/^@/, "");
    if (!cleanUser) {
      this.showInputError("Please enter a valid GitHub username.");
      this.showToast("Please enter a valid GitHub username.", "warning");
      return;
    }

    this.isFetchingUser = true;
    this.clearInputError();

    const fetchBtn = document.getElementById("btn-fetch-user") as HTMLButtonElement;
    if (fetchBtn) {
      fetchBtn.disabled = true;
      fetchBtn.innerHTML = `<span>Loading...</span> ⏳`;
    }

    try {
      // 1. Fetch public profile first to verify username existence
      const profile = await fetchGitHubProfile(cleanUser);

      // 2. Fetch contributions and repo status
      const [contributions, status] = await Promise.all([
        fetchGitHubContributions(cleanUser),
        checkUserStatus(cleanUser),
      ]);

      this.currentUsername = profile.login;

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
      this.showToast(`Fetched profile for @${profile.login}${statusBadge}! 🌴`, "success");
    } catch (err: any) {
      console.error("Fetch user error:", err);
      if (err?.code === "NOT_FOUND" || err?.message?.includes("not found")) {
        const msg = `User "@${cleanUser}" does not exist on GitHub. Please check the spelling!`;
        this.showInputError(msg);
        this.showToast(`User "@${cleanUser}" not found on GitHub!`, "error");
      } else if (err?.code === "RATE_LIMITED" || err?.message?.includes("rate limit")) {
        const msg = err?.message || "GitHub API rate limit reached. Please try again in a few moments.";
        this.showInputError(msg);
        this.showToast(msg, "warning");
      } else if (err?.code === "TIMEOUT") {
        const msg = "Network request timed out. Please check your connection and try again.";
        this.showInputError(msg);
        this.showToast(msg, "warning");
      } else {
        const msg = `Could not fetch @${cleanUser}. Please check your connection and try again.`;
        this.showInputError(msg);
        this.showToast(msg, "error");
      }
    } finally {
      this.isFetchingUser = false;
      if (fetchBtn) {
        fetchBtn.disabled = false;
        fetchBtn.innerHTML = `<span>Fetch</span> ⚡`;
      }
    }
  }

  public getLiveApiUrl(): string {
    const base = "https://gh-tree.vercel.app/api/tree";
    const params = new URLSearchParams();
    const cleanUser = this.currentUsername || "nivinvysakh";
    params.set("user", cleanUser);

    if (this.settings.treeType && this.settings.treeType !== "oak") {
      params.set("theme", this.settings.treeType);
    }
    if (this.settings.weatherType && this.settings.weatherType !== "sunny") {
      params.set("weather", this.settings.weatherType);
    }
    if (this.settings.pet && this.settings.pet !== "none") {
      params.set("pet", this.settings.pet);
    }
    if (this.settings.event && this.settings.event !== "none") {
      params.set("event", this.settings.event);
    }
    if (this.settings.showCampfire) {
      params.set("campfire", "true");
    }

    return `${base}?${params.toString()}`;
  }

  public getLiveMarkdownEmbed(): string {
    const url = this.getLiveApiUrl();
    const cleanUser = this.currentUsername || "GitHub Developer";
    return `[![${cleanUser}'s Minecraft Tree](${url})](https://github.com/nivinvysakh/gh-tree)`;
  }

  private updatePreview(): void {
    this.previewEngine.update(this.contributionData, this.settings);
    this.updateEmbedSnippet();
  }

  private updateEmbedSnippet(): void {
    const embedPreview = document.getElementById("embed-markdown-preview");
    const testLink = document.getElementById("link-test-live-api") as HTMLAnchorElement;
    const liveUrl = this.getLiveApiUrl();
    const liveMd = this.getLiveMarkdownEmbed();

    if (embedPreview) {
      embedPreview.textContent = liveMd;
    }
    if (testLink) {
      testLink.href = liveUrl;
    }
  }

  private async handleGenerateGif(): Promise<void> {
    if (this.isGeneratingGif) return;

    const frames = this.previewEngine.getFrames();
    if (!frames || frames.length === 0) {
      this.showToast("Cannot generate GIF: No frames available.", "error");
      return;
    }

    this.isGeneratingGif = true;

    const progressContainer = document.getElementById("gif-progress-container")!;
    const progressFill = document.getElementById("progress-fill")!;
    const progressText = document.getElementById("progress-text")!;
    const progressPct = document.getElementById("progress-pct")!;
    const gifBtn = document.getElementById("btn-generate-gif") as HTMLButtonElement;

    progressContainer.classList.add("active");
    gifBtn.disabled = true;

    try {
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

      const safeFilename = sanitizeFilename(`${this.currentUsername}-tree`, "gif");
      triggerFileDownload(gifBlob, safeFilename);
      this.showToast(`GIF "${safeFilename}" downloaded! 🎮`, "success");
    } catch (err) {
      console.error("GIF generation failed:", err);
      this.showToast("Failed to generate GIF. Please try again.", "error");
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
    if (!svgStr || !svgStr.includes("<svg")) {
      this.showToast("Cannot export SVG: Preview is not ready.", "error");
      return;
    }
    const safeFilename = sanitizeFilename(`${this.currentUsername}-tree`, "svg");
    const blob = new Blob([svgStr], { type: "image/svg+xml;charset=utf-8" });
    triggerFileDownload(blob, safeFilename);
    this.showToast(`SVG "${safeFilename}" downloaded! 🖼️`, "success");
  }

  private handleOpenMarkdownModal(): void {
    const instantMd = this.getLiveMarkdownEmbed();
    const actionMd = `<!-- commit-tree-start -->
![${this.currentUsername}'s Minecraft Tree](https://github.com/${this.currentUsername}/${this.currentUsername}/raw/main/tree.gif)
<!-- commit-tree-end -->`;

    const combinedSnippet = `### Option 1: Instant 1-Line Live URL (Zero Setup - Recommended)
${instantMd}

---

### Option 2: GitHub Actions Automated Workflow (Self-Hosted)
${actionMd}`;

    this.openModal(
      "GitHub Profile README Embed Code",
      "Choose your preferred integration method to display your Minecraft Tree:",
      combinedSnippet
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

  private showToast(message: string, type: "success" | "error" | "warning" | "info" = "success"): void {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    let typeClasses = "bg-emerald-500 text-slate-950 shadow-emerald-500/20";
    let icon = "✅";

    if (type === "error") {
      typeClasses = "bg-rose-600 text-white shadow-rose-600/30 border border-rose-400/40";
      icon = "❌";
    } else if (type === "warning") {
      typeClasses = "bg-amber-500 text-slate-950 shadow-amber-500/20";
      icon = "⚠️";
    } else if (type === "info") {
      typeClasses = "bg-sky-500 text-slate-950 shadow-sky-500/20";
      icon = "ℹ️";
    }

    toast.className = `toast px-4 py-2.5 rounded-xl font-bold text-xs shadow-2xl flex items-center gap-2 transition-all duration-300 ${typeClasses}`;
    toast.innerHTML = `<span class="flex-shrink-0">${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(20px)";
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }
}

// Bootstrap application on DOM ready
window.addEventListener("DOMContentLoaded", () => {
  new GhTreeApp();
});
