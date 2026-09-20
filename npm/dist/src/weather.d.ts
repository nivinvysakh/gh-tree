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
export declare function mapWmoCodeToWeatherType(code: number, isDay?: boolean): {
    type: WeatherType;
    description: string;
};
/**
 * Fetches real-time live weather using the free Open-Meteo API (zero API key required).
 * Gracefully falls back to sunny if city is omitted or if network request fails.
 */
export declare function fetchLiveWeather(city?: string, override?: string): Promise<WeatherCondition>;
//# sourceMappingURL=weather.d.ts.map