import { describe, it, expect, vi, beforeEach } from "vitest";
import handler, { resolveWeather, renderErrorSvg } from "../api/tree";

describe("Live Dynamic Tree API (/api/tree)", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("resolves weather conditions accurately", () => {
    expect(resolveWeather("rain").type).toBe("rain");
    expect(resolveWeather("snow").type).toBe("snow");
    expect(resolveWeather("night").type).toBe("night");
    expect(resolveWeather("cloudy").type).toBe("cloudy");
    expect(resolveWeather("sunny").type).toBe("sunny");
    expect(resolveWeather("clear").type).toBe("sunny");
    expect(resolveWeather("auto").type).toBe("sunny");
    expect(resolveWeather(undefined).type).toBe("sunny");
  });

  it("renders a valid Minecraft error SVG when user is not provided", () => {
    const svg = renderErrorSvg("Missing 'user' query parameter", "unknown");
    expect(svg).toContain("<svg");
    expect(svg).toContain("</svg>");
    expect(svg).toContain("Minecraft Contribution Tree");
    expect(svg).toContain("Missing &apos;user&apos; query parameter");
  });

  it("handles OPTIONS request with CORS headers", async () => {
    const req = { method: "OPTIONS" };
    const headers: Record<string, string> = {};
    let statusSent: number | undefined;

    const res = {
      setHeader: (k: string, v: string) => {
        headers[k] = v;
      },
      status: (s: number) => {
        statusSent = s;
        return {
          end: () => {},
        };
      },
    };

    await handler(req, res);
    expect(headers["Access-Control-Allow-Origin"]).toBe("*");
    expect(headers["Access-Control-Allow-Methods"]).toContain("GET");
    expect(statusSent).toBe(200);
  });

  it("returns 400 error SVG when user parameter is missing", async () => {
    const req = { query: {} };
    const headers: Record<string, string> = {};
    let statusSent: number | undefined;
    let bodySent: string | undefined;

    const res = {
      setHeader: (k: string, v: string) => {
        headers[k] = v;
      },
      status: (s: number) => {
        statusSent = s;
        return {
          send: (body: string) => {
            bodySent = body;
          },
        };
      },
    };

    await handler(req, res);
    expect(statusSent).toBe(400);
    expect(headers["Content-Type"]).toContain("image/svg+xml");
    expect(bodySent).toContain("<svg");
    expect(bodySent).toContain("Missing &apos;user&apos; query parameter");
  });

  it("fetches contributions and returns a complete animated Minecraft SVG for valid user", async () => {
    // Mock global fetch for GitHub contributions API
    const mockContributions = {
      total: { lastYear: 45 },
      contributions: Array.from({ length: 30 }, (_, i) => ({
        date: `2026-08-${String(i + 1).padStart(2, "0")}`,
        count: i % 2 === 0 ? 3 : 0,
      })),
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockContributions,
    });

    const req = {
      query: {
        user: "testdev",
        theme: "sakura",
        weather: "rain",
        pet: "fox",
        format: "svg",
      },
    };

    const headers: Record<string, string> = {};
    let statusSent: number | undefined;
    let bodySent: string | undefined;

    const res = {
      setHeader: (k: string, v: string) => {
        headers[k] = v;
      },
      status: (s: number) => {
        statusSent = s;
        return {
          send: (body: string) => {
            bodySent = body;
          },
        };
      },
    };

    await handler(req, res);

    expect(statusSent).toBe(200);
    expect(headers["Content-Type"]).toBe("image/svg+xml; charset=utf-8");
    expect(headers["Cache-Control"]).toContain("max-age=14400");
    expect(bodySent).toContain("<svg");
    expect(bodySent).toContain("</svg>");
  });

  it("handles 404 user not found gracefully with an error SVG", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      json: async () => ({}),
    });

    const req = {
      query: {
        user: "nonexistent_user_12345",
      },
    };

    const headers: Record<string, string> = {};
    let statusSent: number | undefined;
    let bodySent: string | undefined;

    const res = {
      setHeader: (k: string, v: string) => {
        headers[k] = v;
      },
      status: (s: number) => {
        statusSent = s;
        return {
          send: (body: string) => {
            bodySent = body;
          },
        };
      },
    };

    await handler(req, res);

    expect(statusSent).toBe(200); // Return 200 with SVG so GitHub Camo renders the error message card
    expect(headers["Content-Type"]).toContain("image/svg+xml");
    expect(bodySent).toContain("<svg");
    expect(bodySent).toContain("User &quot;@nonexistent_user_12345&quot; not found");
  });

  it("returns an animated GIF buffer when format=gif is requested", async () => {
    const mockContributions = {
      total: { lastYear: 50 },
      contributions: Array.from({ length: 30 }, (_, i) => ({
        date: `2026-08-${String(i + 1).padStart(2, "0")}`,
        count: i % 2 === 0 ? 3 : 1,
      })),
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockContributions,
    });

    const req = {
      query: {
        user: "testdev",
        format: "gif",
      },
      url: "/api/tree.gif?user=testdev",
    };

    const headers: Record<string, string> = {};
    let statusSent: number | undefined;
    let bodySent: any;

    const res = {
      setHeader: (k: string, v: string) => {
        headers[k] = v;
      },
      status: (s: number) => {
        statusSent = s;
        return {
          send: (body: any) => {
            bodySent = body;
          },
        };
      },
    };

    await handler(req, res);

    expect(statusSent).toBe(200);
    expect(headers["Content-Type"]).toBe("image/gif");
    expect(Buffer.isBuffer(bodySent)).toBe(true);
    // GIF magic header check: GIF89a
    expect(bodySent.subarray(0, 3).toString()).toBe("GIF");
  });

  it("automatically awards Netherite ore for repo owner @nivinvysakh", async () => {
    const mockContributions = {
      total: { lastYear: 100 },
      contributions: Array.from({ length: 30 }, (_, i) => ({
        date: `2026-08-${String(i + 1).padStart(2, "0")}`,
        count: 2,
      })),
    };

    global.fetch = vi.fn().mockImplementation((url: string) => {
      if (url.includes("github-contributions-api")) {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: async () => mockContributions,
        });
      }
      return Promise.resolve({
        ok: true,
        status: 200,
        json: async () => [],
      });
    });

    const req = {
      query: {
        user: "nivinvysakh",
        format: "svg",
      },
    };

    let bodySent = "";
    const res = {
      setHeader: () => {},
      status: () => ({
        send: (body: string) => {
          bodySent = body;
        },
      }),
    };

    await handler(req, res);
    expect(bodySent).toContain("NETHERITE / ANCIENT DEBRIS BLOCK");
  });

  it("automatically awards Lapis Lazuli ore for verified repo contributors", async () => {
    const mockContributions = {
      total: { lastYear: 100 },
      contributions: Array.from({ length: 30 }, (_, i) => ({
        date: `2026-08-${String(i + 1).padStart(2, "0")}`,
        count: 2,
      })),
    };

    global.fetch = vi.fn().mockImplementation((url: string) => {
      if (url.includes("github-contributions-api")) {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: async () => mockContributions,
        });
      }
      if (url.includes("contributors")) {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: async () => [{ login: "awesome-contributor" }, { login: "another-dev" }],
        });
      }
      return Promise.resolve({
        ok: true,
        status: 200,
        json: async () => [],
      });
    });

    const req = {
      query: {
        user: "awesome-contributor",
        format: "svg",
      },
    };

    let bodySent = "";
    const res = {
      setHeader: () => {},
      status: () => ({
        send: (body: string) => {
          bodySent = body;
        },
      }),
    };

    await handler(req, res);
    expect(bodySent).toContain("LAPIS ORE BLOCK");
  });

  it("does not render fake apples or flowers when user has 0 PRs", async () => {
    const mockContributions = {
      total: { lastYear: 3 },
      contributions: Array.from({ length: 30 }, (_, i) => ({
        date: `2026-08-${String(i + 1).padStart(2, "0")}`,
        count: i === 29 ? 3 : 0,
      })),
    };

    global.fetch = vi.fn().mockImplementation((url: string) => {
      if (url.includes("github-contributions-api")) {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: async () => mockContributions,
        });
      }
      if (url.includes("search/issues")) {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: async () => ({ total_count: 0 }),
        });
      }
      return Promise.resolve({
        ok: true,
        status: 200,
        json: async () => [],
      });
    });

    const req = {
      query: {
        user: "ecoas12",
        theme: "sakura",
        format: "svg",
      },
    };

    let bodySent = "";
    const res = {
      setHeader: () => {},
      status: () => ({
        send: (body: string) => {
          bodySent = body;
        },
      }),
    };

    await handler(req, res);
    // Should NOT contain Red Apple
    expect(bodySent).not.toContain("Red Apple");
    // Should NOT contain Poppy or Dandelion flowers
    expect(bodySent).not.toContain("Poppy Flower");
    expect(bodySent).not.toContain("Dandelion");
  });
});


