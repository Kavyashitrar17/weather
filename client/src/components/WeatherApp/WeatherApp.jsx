import { useEffect, useState, useCallback } from "react";
import { useWeather } from "../../hooks/useWeather";
import InfoBox from "../InfoBox/InfoBox";
import Forecast from "../Forecast/Forecast";

const defaultCities = ["Mumbai"];



const getWeatherEmoji = (code, label) => {
  if (typeof code === "number") {
    if (code === 0) return "☀️";
    if ([1, 2].includes(code)) return "🌤️";
    if (code === 3) return "☁️";
    if ([45, 48].includes(code)) return "🌫️";
    if ([51, 53, 55].includes(code)) return "🌦️";
    if ([61, 63, 65].includes(code)) return "🌧️";
    if ([71, 73, 75].includes(code)) return "❄️";
    if (code === 95) return "⛈️";
  }
  const l = (label || "").toLowerCase();
  if (l.includes("rain")) return "🌧️";
  if (l.includes("snow")) return "❄️";
  if (l.includes("storm")) return "⛈️";
  if (l.includes("fog")) return "🌫️";
  if (l.includes("cloud")) return "☁️";
  return "🌡️";
};

function WeatherApp() {
  const [weatherList, setWeatherList] = useState([]);
  const [search, setSearch] = useState("");
  const [unit, setUnit] = useState("c");
  const { fetchCityWeather, fetchDefaultCities, loading, error } = useWeather();

  useEffect(() => {
    const loadDefaultWeather = async () => {
      const data = await fetchDefaultCities(defaultCities);
      setWeatherList(data);
    };

    loadDefaultWeather();
  }, [fetchDefaultCities]);
 


  const runSearch = useCallback(async (city) => {
    if (!city.trim()) return;
    const data = await fetchCityWeather(city);
    if (data) setWeatherList([data]);
  }, [fetchCityWeather]);

  const handleSearch = (e) => {
    e.preventDefault();
    runSearch(search);
  };
 useEffect(() => {
  navigator.geolocation.getCurrentPosition(async (pos) => {
    const { latitude, longitude } = pos.coords;
    await runSearch(`${latitude},${longitude}`);
  });
}, [runSearch]);
  const primaryWeather = weatherList.length > 0 ? weatherList[0] : null;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 text-white py-10 px-4">
      <div className="max-w-5xl mx-auto w-full">
        <div className="relative rounded-[2.75rem] bg-white/5 border border-white/10 backdrop-blur-xl shadow-[0_30px_100px_rgba(0,0,0,0.6)] overflow-hidden">
          {/* Subtle glow */}
          <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />

          {/* Search pinned to top-left */}
          <form
            onSubmit={handleSearch}
            className="absolute top-6 left-6 right-6 sm:right-auto flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Search city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-[360px] px-5 py-3 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-sky-500/60 transition"
            />
            <button
              type="submit"
              className="px-5 py-3 rounded-2xl bg-sky-500/90 hover:bg-sky-400 text-sm font-bold transition disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "..." : "Search"}
            </button>
          </form>

          {/* Unit toggle pinned top-right */}
          <div className="absolute top-6 right-6 hidden sm:flex items-center gap-2 rounded-2xl bg-white/5 border border-white/10 p-1">
            <button
              type="button"
              onClick={() => setUnit("c")}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition ${
                unit === "c" ? "bg-white/15" : "text-white/60 hover:text-white"
              }`}
            >
              °C
            </button>
            <button
              type="button"
              onClick={() => setUnit("f")}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition ${
                unit === "f" ? "bg-white/15" : "text-white/60 hover:text-white"
              }`}
            >
              °F
            </button>
          </div>

          <div className="px-6 pt-28 pb-8 sm:px-10 sm:pt-28 sm:pb-10">
            {error && (
              <p className="text-red-300 text-left text-sm mb-5">{error}</p>
            )}

            {!primaryWeather ? (
              <div className="py-20 text-center text-white/60">
                Search for a city to see weather.
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr_1fr] gap-8 items-start">
                {/* Left: current weather text */}
                <div className="min-w-0">
                  <InfoBox data={primaryWeather} unit={unit} />
                </div>

                {/* Center: big icon */}
                <div className="flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-white/5 blur-2xl" />
                    <div className="text-[88px] sm:text-[110px] drop-shadow-[0_25px_35px_rgba(0,0,0,0.5)] select-none">
                      {getWeatherEmoji(primaryWeather.code, primaryWeather.condition)}
                    </div>
                    <div className="mt-4 text-center text-xs font-bold tracking-[0.3em] text-white/35 uppercase">
                      Live Weather
                    </div>
                  </div>
                </div>

                {/* Right: forecast panel */}
                <div className="min-w-0">
                  <Forecast forecast={primaryWeather.forecast} unit={unit} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherApp;