import { useState, useCallback } from "react";

export function useWeather() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCityWeather = useCallback(async (city) => {
    setLoading(true);
    setError(null);
    try {
      // Step 1: get coordinates
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
      );
      const geoData = await geoRes.json();
      if (!geoData.results) throw new Error("City not found");

      const { latitude, longitude, name, country } = geoData.results[0];

      // Step 2: get weather
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min,windspeed_10m_max&timezone=auto`
      );
      const weatherData = await weatherRes.json();

      return {
        city: name,
        country,
        temp: weatherData.current_weather.temperature,
        wind: weatherData.current_weather.windspeed,
        code: weatherData.current_weather.weathercode,
        forecast: weatherData.daily.time.map((date, i) => ({
          date,
          max: weatherData.daily.temperature_2m_max[i],
          min: weatherData.daily.temperature_2m_min[i],
          code: weatherData.daily.weathercode[i],
        })),
      };
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchDefaultCities = useCallback(async (cities) => {
    const results = await Promise.all(cities.map(fetchCityWeather));
    return results.filter(Boolean);
  }, [fetchCityWeather]);

  return { fetchCityWeather, fetchDefaultCities, loading, error };
}
