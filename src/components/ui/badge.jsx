// Reused everywhere: CRITICAL / RESOLVED / ONGOING / MODERATE / HIGH / LIVE ...
// One component, four tones. Pass `tone` directly, or use statusTone() to map
// a status string to the right tone.

const TONES = {
  red: "bg-danger-soft text-danger",
  green: "bg-success-soft text-success",
  neutral: "bg-chip text-chip-ink",
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
    HIGH: "neutral",
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
      className={`inline-block rounded-full px-3 py-1 text-xs font-bold tracking-wide ${TONES[tone]} ${className}`}
    >
      {children}
    </span>
  );
}