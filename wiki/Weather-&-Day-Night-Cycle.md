# 🌦️ Live Weather & Day/Night Atmosphere

**`gh-tree`** features a real-time weather engine powered by Open-Meteo that renders live atmospheric weather conditions based on your city or manual override.

---

## 🌍 Setting Your City (`city`)

Add your city name to the action inputs in `.github/workflows/tree.yml`:

```yaml
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          city: "Paris" # e.g. London, Tokyo, New York, Seattle, Sydney
```

Open-Meteo fetches the real-time weather condition (solar elevation, rain rate, snowfall, cloud cover) and automatically renders:

---

## ☀️ Atmospheric Conditions

| Weather Type | Visual Elements |
| :--- | :--- |
| **Sunny ☀️** | Bright golden sun with radiating solar corona and clear blue atmosphere. |
| **Starry Night 🌕✨** | Crescent glowing moon, multi-layered twinkling stars, and night sky depth. |
| **Rainy 🌧️** | Slanted rain streaks, storm clouds, and ground impact puddle splashes. |
| **Snowy ❄️** | Fluttering pixel snowflakes and snow-capped leaves on top of the canopy blocks. |
| **Cloudy ☁️** | Multi-layered drifting overcast clouds moving across the sky. |

---

## 🛠️ Manual Weather Override (`weather`)

You can force a specific weather condition regardless of location:

```yaml
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          weather: "night" # auto | sunny | night | rain | snow | cloudy
```
