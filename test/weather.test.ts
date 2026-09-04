import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { fetchLiveWeather, mapWmoCodeToWeatherType } from "../src/weather";

describe("weather module", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  describe("mapWmoCodeToWeatherType", () => {
    it("maps clear WMO codes to sunny when isDay is true, and night when isDay is false", () => {
      expect(mapWmoCodeToWeatherType(0, true).type).toBe("sunny");
      expect(mapWmoCodeToWeatherType(1, true).type).toBe("sunny");
      expect(mapWmoCodeToWeatherType(0, false).type).toBe("night");
      expect(mapWmoCodeToWeatherType(1, false).type).toBe("night");
    });

    it("maps overcast WMO codes to cloudy", () => {
      expect(mapWmoCodeToWeatherType(2).type).toBe("cloudy");
      expect(mapWmoCodeToWeatherType(3).type).toBe("cloudy");
      expect(mapWmoCodeToWeatherType(45).type).toBe("cloudy");
    });

    it("maps rain and thunderstorm WMO codes to rain", () => {
      expect(mapWmoCodeToWeatherType(51).type).toBe("rain");
      expect(mapWmoCodeToWeatherType(63).type).toBe("rain");
      expect(mapWmoCodeToWeatherType(80).type).toBe("rain");
      expect(mapWmoCodeToWeatherType(95).type).toBe("rain");
    });

    it("maps snow WMO codes to snow", () => {
      expect(mapWmoCodeToWeatherType(71).type).toBe("snow");
      expect(mapWmoCodeToWeatherType(75).type).toBe("snow");
      expect(mapWmoCodeToWeatherType(85).type).toBe("snow");
    });
  });

  describe("fetchLiveWeather", () => {
    it("returns manual override without making network calls", async () => {
      const fetchSpy = vi.fn();
      global.fetch = fetchSpy;

      const rainResult = await fetchLiveWeather("London", "rain");
      expect(rainResult.type).toBe("rain");
      expect(fetchSpy).not.toHaveBeenCalled();

      const snowResult = await fetchLiveWeather("London", "snow");
      expect(snowResult.type).toBe("snow");

      const sunnyResult = await fetchLiveWeather("London", "sunny");
      expect(sunnyResult.type).toBe("sunny");

      const cloudyResult = await fetchLiveWeather("London", "cloudy");
      expect(cloudyResult.type).toBe("cloudy");

      const nightResult = await fetchLiveWeather("Tokyo", "night");
      expect(nightResult.type).toBe("night");
      expect(nightResult.isDay).toBe(false);
    });

    it("defaults to sunny if city is omitted or auto", async () => {
      const result = await fetchLiveWeather("");
      expect(result.type).toBe("sunny");

      const resultAuto = await fetchLiveWeather("auto");
      expect(resultAuto.type).toBe("sunny");
    });

    it("fetches and parses live weather for a city using Open-Meteo", async () => {
      const mockGeo = {
        results: [
          {
            latitude: 51.5074,
            longitude: -0.1278,
            name: "London",
            country: "United Kingdom",
          },
        ],
      };

      const mockForecast = {
        current: {
          weather_code: 61, // Slight rain
          temperature_2m: 14.5,
          is_day: 1,
        },
      };

      global.fetch = vi
        .fn()
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockGeo,
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockForecast,
        });

      const result = await fetchLiveWeather("London");

      expect(result.type).toBe("rain");
      expect(result.temperatureC).toBe(14.5);
      expect(result.locationName).toContain("London");
    });

    it("falls back to sunny gracefully if geocoding or forecast fails", async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error("Network offline"));

      const result = await fetchLiveWeather("NonexistentCity12345");
      expect(result.type).toBe("sunny");
    });
  });
});
