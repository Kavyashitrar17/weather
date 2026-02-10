const toFahrenheit = (c) => Math.round((c * 9) / 5 + 32);

const formatDay = (isoDate) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString(undefined, { weekday: "long" });
};

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

export default function Forecast({ forecast, unit }) {
  if (!Array.isArray(forecast) || forecast.length === 0) return null;

  const isF = unit === "f";
  const label = isF ? "°F" : "°C";

  return (
    <aside className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
      <h3 className="text-xs font-bold text-white/60 uppercase tracking-[0.25em] mb-4">
        Forecast
      </h3>

      <div className="space-y-2">
        {forecast.slice(0, 5).map((day) => {
          const max = isF ? toFahrenheit(day.max) : day.max;
          const min = isF ? toFahrenheit(day.min) : day.min;

          return (
            <div
              key={day.date}
              className="group flex items-center justify-between gap-3 rounded-2xl bg-white/5 border border-white/10 px-4 py-3 transition-transform duration-200 hover:scale-[1.02] hover:bg-white/10"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-xl" aria-hidden="true">
                  {getWeatherEmoji(day.code, day.condition)}
                </span>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-white truncate">
                    {formatDay(day.date)}
                  </div>
                  <div className="text-xs text-white/55 truncate">
                    {day.condition}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <span className="font-semibold text-white">
                  {max}
                  <span className="text-white/70">{label}</span>
                </span>
                <span className="text-white/60">
                  {min}
                  <span className="text-white/50">{label}</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}