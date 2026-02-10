import { MapPin, Wind } from "lucide-react";

const toFahrenheit = (c) => Math.round((c * 9) / 5 + 32);

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

export default function InfoBox({ data, unit }) {
  if (!data) return null;

  const isF = unit === "f";
  const tempC = Math.round(data.temp ?? 0);
  const temp = isF ? toFahrenheit(tempC) : tempC;
  const unitLabel = isF ? "°F" : "°C";
  const today = Array.isArray(data.forecast) ? data.forecast[0] : null;
  const hiC = today?.max ?? null;
  const loC = today?.min ?? null;
  const hi = hiC == null ? null : isF ? toFahrenheit(hiC) : hiC;
  const lo = loC == null ? null : isF ? toFahrenheit(loC) : loC;

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-white/70 text-sm">
          <MapPin size={16} className="text-sky-300" />
          <span className="font-medium">{data.city}</span>
        </div>

        <div className="flex items-end gap-3">
          <h2 className="text-6xl sm:text-7xl font-light tracking-tight">
            {temp}
            <span className="text-2xl sm:text-3xl text-white/70 align-top ml-1">
              {unitLabel}
            </span>
          </h2>
        </div>

        <p className="text-xl text-white/80 font-medium">
          {data.condition || "—"}
        </p>
      </div>

      <div className="flex items-center gap-4 text-white/70">
        <div className="inline-flex items-center gap-2 rounded-2xl bg-white/5 border border-white/10 px-4 py-3 backdrop-blur-md transition hover:bg-white/10">
          <Wind size={18} className="text-sky-300" />
          <div className="leading-tight">
            <div className="text-[10px] uppercase tracking-widest text-white/50">
              Wind
            </div>
            <div className="text-sm font-semibold text-white">
              {Math.round(data.wind ?? 0)} km/h
            </div>
          </div>
        </div>

        {hi != null && lo != null && (
          <div className="inline-flex items-center gap-2 rounded-2xl bg-white/5 border border-white/10 px-4 py-3 backdrop-blur-md transition hover:bg-white/10">
            <span className="text-lg" aria-hidden="true">
              {getWeatherEmoji(data.code, data.condition)}
            </span>
            <div className="leading-tight">
              <div className="text-[10px] uppercase tracking-widest text-white/50">
                Today
              </div>
              <div className="text-sm font-semibold text-white">
                {hi} / {lo}
                <span className="text-white/70">{unitLabel}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}