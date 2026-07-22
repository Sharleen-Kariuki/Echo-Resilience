import Card from "../../components/ui/Card";

const TONES = {
  red: { tile: "bg-danger-soft text-danger", caption: "text-primary", fill: "bg-primary" },
  green: { tile: "bg-success-soft text-success", caption: "text-success", fill: "bg-success" },
  neutral: { tile: "bg-chip text-chip-ink", caption: "text-chip-ink", fill: "bg-chip-ink" },
};

export default function StatCard({ icon: Icon, tone = "red", caption, label, value, unit, progress = 0 }) {
  const t = TONES[tone];
  return (
    <Card className="p-6">
      <div className="mb-6 flex items-start justify-between">
        <div className={`grid h-13 w-13 place-items-center rounded-2xl ${t.tile}`}>
          <Icon size={22} strokeWidth={2} />
        </div>
        <span className={`max-w-24 text-right text-[13px] font-bold leading-tight ${t.caption}`}>
          {caption}
        </span>
      </div>

      <div className="text-[15px] font-semibold text-ink">{label}</div>
      <div className="mb-4 mt-0.5 font-display text-4xl font-extrabold tracking-tight text-primary">
        {value}
        {unit && <span className="ml-2 text-base font-semibold text-muted">{unit}</span>}
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-canvas">
        <div className={`h-full rounded-full ${t.fill}`} style={{ width: `${progress * 100}%` }} />
      </div>
    </Card>
  );
}