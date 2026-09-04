export type WeatherType = "sunny" | "rain" | "snow" | "cloudy" | "night";

export interface WeatherCondition {
  type: WeatherType;
  description: string;
  temperatureC?: number;
  isDay?: boolean;
  locationName?: string;
}

/**
 * Maps WMO weather interpretation codes to simplified Minecraft weather types.
 * WMO Code reference: https://open-meteo.com/en/docs
 */
export function mapWmoCodeToWeatherType(code: number, isDay: boolean = true): { type: WeatherType; description: string } {
  // 0, 1: Clear sky / Mainly clear
  if (code === 0) {
    return {
      type: isDay ? "sunny" : "night",
      description: isDay ? "Clear sky" : "Clear starry night",
    };
  }
  if (code === 1) {
    return {
      type: isDay ? "sunny" : "night",
      description: isDay ? "Mainly clear" : "Clear night sky",
    };
  }

  // 2, 3: Partly cloudy / Overcast
  if (code === 2) return { type: "cloudy", description: "Partly cloudy" };
  if (code === 3) return { type: "cloudy", description: "Overcast" };
  if (code === 45 || code === 48) return { type: "cloudy", description: "Foggy" };

  // 71, 73, 75, 77, 85, 86: Snowfall & snow showers
  if (
    code === 71 ||
    code === 73 ||
    code === 75 ||
    code === 77 ||
    code === 85 ||
    code === 86
  ) {
    return { type: "snow", description: "Snowfall" };
  }

  // 51-67, 80-82, 95-99: Rain, drizzle, showers, thunderstorms
  if (
    (code >= 51 && code <= 67) ||
    (code >= 80 && code <= 82) ||
    (code >= 95 && code <= 99)
  ) {
    return { type: "rain", description: code >= 95 ? "Thunderstorm" : "Rain showers" };
  }

  return { type: isDay ? "sunny" : "night", description: isDay ? "Fair weather" : "Clear night" };
}

/**
 * Fetches real-time live weather using the free Open-Meteo API (zero API key required).
 * Gracefully falls back to sunny if city is omitted or if network request fails.
 */
export async function fetchLiveWeather(
  city?: string,
  override?: string
): Promise<WeatherCondition> {
  const normalizedOverride = (override || "").toLowerCase().trim();
  if (
    normalizedOverride === "sunny" ||
    normalizedOverride === "rain" ||
    normalizedOverride === "snow" ||
    normalizedOverride === "cloudy" ||
    normalizedOverride === "night"
  ) {
    const isDay = normalizedOverride !== "night";
    return {
      type: normalizedOverride as WeatherType,
      description: `Manual override: ${normalizedOverride}`,
      isDay,
    };
  }

  const queryCity = (city || "").trim();
  if (!queryCity || queryCity.toLowerCase() === "auto") {
    return {
      type: "sunny",
      description: "Default clear sky",
      isDay: true,
    };
  }

  try {
    // 1. Geocode city name to lat/lon
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      queryCity
    )}&count=1`;
    const geoRes = await fetch(geoUrl, {
      headers: { "User-Agent": "gh-tree-action" },
    });

    if (!geoRes.ok) {
      return { type: "sunny", description: `Weather fallback for ${queryCity}`, isDay: true };
    }

    const geoData = (await geoRes.json()) as any;
    const location = geoData.results?.[0];
    if (!location) {
      return { type: "sunny", description: `Location '${queryCity}' not found, defaulted to sunny`, isDay: true };
    }

    const { latitude, longitude, name, country } = location;

    // 2. Fetch current weather forecast
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=weather_code,temperature_2m,is_day`;
    const weatherRes = await fetch(weatherUrl, {
      headers: { "User-Agent": "gh-tree-action" },
    });

    if (!weatherRes.ok) {
      return {
        type: "sunny",
        description: `Weather fallback for ${name}`,
        locationName: name,
        isDay: true,
      };
    }

    const weatherData = (await weatherRes.json()) as any;
    const current = weatherData.current || {};
    const code = typeof current.weather_code === "number" ? current.weather_code : 0;
    const temp = current.temperature_2m;
    const isDay = current.is_day !== 0;

    const mapped = mapWmoCodeToWeatherType(code, isDay);

    return {
      type: mapped.type,
      description: mapped.description,
      temperatureC: temp,
      isDay,
      locationName: country ? `${name}, ${country}` : name,
    };
  } catch {
    return {
      type: "sunny",
      description: "Weather request failed, defaulted to sunny",
      isDay: true,
    };
  }
}
