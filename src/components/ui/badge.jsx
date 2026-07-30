const TONES = {
  red: "border-danger/30 bg-danger-soft text-danger",
  green: "border-success/30 bg-success-soft text-success",
  neutral: "border-line bg-chip text-chip-ink",
  clay: "border-clay/30 bg-clay-soft text-clay",
};

export function statusTone(status) {
  const map = {
    CRITICAL: "red",
    URGENT: "red",
    RESOLVED: "green",
    MODERATE: "green",
    LIVE: "green",
    ONGOING: "neutral",
    MONITORING: "neutral",
    HIGH: "clay",
    DELIVERED: "green",
    DISPATCHED: "green",
    "IN PROGRESS": "neutral",
    PENDING: "neutral",
    FAILED: "red",
  };
  return map[status] ?? "neutral";
}

export default function Badge({ tone = "neutral", children, className = "" }) {
  return (
    <span
      className={`inline-block border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${TONES[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
