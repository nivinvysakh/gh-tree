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
});
