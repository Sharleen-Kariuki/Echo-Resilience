import { useState } from "react";
import {
  TriangleAlert,
  Phone,
  MessageCircle,
  MapPin,
  AlertOctagon,
  MessagesSquare,
  Send,
} from "lucide-react";
import AppLayout from "../components/layout/AppLayout";
import TopBar from "../components/layout/TopBar";
import Card from "../components/ui/Card";
import Badge, { statusTone } from "../components/ui/Badge";

/* ------------------------------------------------------------------
   Hardcoded data — no backend, no API layer.
   When you're ready to go live, swap these three arrays for API calls.
   ------------------------------------------------------------------ */

const STATS = [
  { icon: TriangleAlert, tone: "red", caption: "+2 since yesterday", label: "Active Alerts", value: "12", progress: 0.55 },
  { icon: Phone, tone: "red", caption: "98% success rate", label: "Calls Sent Today", value: "1,450", progress: 0.62 },
  { icon: MessageCircle, tone: "green", caption: "New responses", label: "Feedback Received", value: "89", unit: "new", progress: 0.42 },
  { icon: MapPin, tone: "neutral", caption: "Operational", label: "Regions Covered", value: "24", unit: "districts", progress: 0.7 },
];

const ALERTS = [
  { id: "AL-8924", type: "Flood Warning", region: "Riverside Basin", status: "CRITICAL", time: "12 mins ago" },
  { id: "AL-8923", type: "Heat Wave", region: "Central Valley", status: "ONGOING", time: "1 hour ago" },
  { id: "AL-8922", type: "Air Quality", region: "West Industrial", status: "RESOLVED", time: "4 hours ago" },
  { id: "AL-8921", type: "Storm Surge", region: "Coastal Zone A", status: "CRITICAL", time: "6 hours ago" },
  { id: "AL-8920", type: "Drought Monitor", region: "North Highlands", status: "MONITORING", time: "10 hours ago" },
];

const FEEDBACK = [
  { id: 1, name: "Resident 4022", time: "Now", quote: "Water levels are rising near the old bridge. Need immediate sandbags.", tags: ["RIVERSIDE", "URGENT"], highlight: true },
  { id: 2, name: "Volunteer Mark", time: "4m ago", quote: "Evacuation center at the High School is now at 80% capacity.", tags: ["CITY CENTER"], highlight: false },
];

/* ------------------------------------------------------------------
   Pieces
   ------------------------------------------------------------------ */

const TONES = {
  red: { tile: "bg-danger-soft text-danger", caption: "text-primary", fill: "bg-primary" },
  green: { tile: "bg-success-soft text-success", caption: "text-success", fill: "bg-success" },
  neutral: { tile: "bg-chip text-chip-ink", caption: "text-chip-ink", fill: "bg-chip-ink" },
};

function StatCard({ icon: Icon, tone, caption, label, value, unit, progress }) {
  const t = TONES[tone];
  return (
    <Card className="p-4">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className={`grid h-11 w-11 place-items-center rounded-xl ${t.tile}`}>
          <Icon size={20} strokeWidth={2} />
        </div>
        <span className={`max-w-24 text-right text-xs font-bold leading-tight ${t.caption}`}>
          {caption}
        </span>
      </div>
      <div className="text-sm font-semibold text-ink">{label}</div>
      <div className="mb-2.5 font-display text-3xl font-extrabold tracking-tight text-primary">
        {value}
        {unit && <span className="ml-1.5 text-sm font-semibold text-muted">{unit}</span>}
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-canvas">
        <div className={`h-full rounded-full ${t.fill}`} style={{ width: `${progress * 100}%` }} />
      </div>
    </Card>
  );
}

const COLS = "grid grid-cols-[0.9fr_1fr_1.1fr_1fr_0.8fr] gap-3 items-center";

function RecentAlertsTable() {
  return (
    <Card className="flex min-h-0 flex-col p-5">
      <div className="mb-1 flex items-center justify-between">
        <h2 className="flex items-center gap-2.5 font-display text-lg font-extrabold text-ink">
          <AlertOctagon size={20} className="text-primary" />
          Recent Alerts
        </h2>
        <button className="text-sm font-bold text-primary hover:underline">View All</button>
      </div>

      <div className={`${COLS} border-b border-line px-2 py-2.5 text-xs font-semibold text-muted`}>
        <span>Alert ID</span>
        <span>Type</span>
        <span>Region</span>
        <span>Status</span>
        <span>Time</span>
      </div>

      {/* Scrolls inside the card if the screen is short — the page itself never scrolls */}
      <div className="min-h-0 flex-1 overflow-y-auto">
        {ALERTS.map((a) => (
          <div key={a.id} className={`${COLS} border-b border-line px-2 py-3 text-sm last:border-none`}>
            <span className="font-bold text-primary">{a.id}</span>
            <span>{a.type}</span>
            <span>{a.region}</span>
            <span>
              <Badge tone={statusTone(a.status)}>{a.status}</Badge>
            </span>
            <span className="text-xs text-muted">{a.time}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function Tag({ label }) {
  const tone = label === "URGENT" ? "bg-danger-soft text-danger" : "bg-chip text-chip-ink";
  return <span className={`rounded-md px-2 py-0.5 text-[10px] font-bold tracking-wide ${tone}`}>{label}</span>;
}

function LiveFeedbackPanel() {
  const [message, setMessage] = useState("");

  return (
    <Card className="flex min-h-0 flex-col p-5">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="flex items-center gap-2.5 font-display text-lg font-extrabold text-ink">
          <MessagesSquare size={20} className="text-success" />
          Live Feedback
        </h2>
        <span className="h-2.5 w-2.5 rounded-full bg-success shadow-[0_0_0_4px_var(--color-success-soft)]" />
      </div>

      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto">
        {FEEDBACK.map((f) => (
          <div
            key={f.id}
            className={
              f.highlight
                ? "rounded-xl bg-primary-soft/40 p-3.5 shadow-[inset_4px_0_0_var(--color-success)]"
                : "rounded-xl border border-line p-3.5"
            }
          >
            <div className="mb-1.5 flex items-baseline justify-between">
              <span className="text-sm font-bold">{f.name}</span>
              <span className="text-[11px] text-muted">{f.time}</span>
            </div>
            <p className="mb-2 text-sm italic leading-snug text-ink/80">&ldquo;{f.quote}&rdquo;</p>
            <div className="flex flex-wrap gap-1.5">
              {f.tags.map((t) => (
                <Tag key={t} label={t} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-2 rounded-xl border border-line py-1 pl-3 pr-1">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="min-w-0 flex-1 bg-transparent py-1.5 text-sm outline-none placeholder:text-muted"
          placeholder="Post official response..."
          aria-label="Post official response"
        />
        <button
          onClick={() => setMessage("")}
          className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary text-white hover:brightness-110"
          aria-label="Send response"
        >
          <Send size={16} />
        </button>
      </div>
    </Card>
  );
}

/* ------------------------------------------------------------------
   Page
   ------------------------------------------------------------------ */

export default function DashboardPage() {
  return (
    // fitViewport locks the page to screen height on desktop — no scrollbar.
    <AppLayout fitViewport topBar={<TopBar title="Welcome back, Admin" />}>
      <div className="flex h-full min-h-0 flex-col gap-4">
        <section className="grid shrink-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {STATS.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </section>

        <section className="grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr]">
          <RecentAlertsTable />
          <LiveFeedbackPanel />
        </section>
      </div>
    </AppLayout>
  );
}