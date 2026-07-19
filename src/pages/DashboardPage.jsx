import { useEffect, useMemo, useState } from "react";
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
import { api } from "../lib/api";

const TONES = {
  red: { tile: "bg-danger-soft text-danger", caption: "text-primary", fill: "bg-primary" },
  green: { tile: "bg-success-soft text-success", caption: "text-success", fill: "bg-success" },
  neutral: { tile: "bg-chip text-chip-ink", caption: "text-chip-ink", fill: "bg-chip-ink" },
};

const COLS = "grid grid-cols-[0.9fr_1fr_1.1fr_1fr_0.8fr] gap-3 items-center";

function timeAgo(value) {
  if (!value) return "Recently";
  const seconds = Math.max(1, Math.floor((Date.now() - new Date(value).getTime()) / 1000));
  if (seconds < 60) return "Now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

function getHazardName(alert) {
  return alert.hazardType?.name ?? alert.hazardTypeName ?? alert.type ?? "Climate Alert";
}

function getRegionName(item) {
  return item.region?.name ?? item.regions?.[0]?.name ?? item.regionName ?? "Regional";
}

function buildStats(alerts, feedback, regions, history) {
  const activeAlerts = alerts.filter((alert) => {
    const status = String(alert.status ?? alert.severityLevel ?? "").toLowerCase();
    return !["resolved", "closed", "complete"].includes(status);
  }).length;

  return [
    {
      icon: TriangleAlert,
      tone: "red",
      caption: "From /api/alerts",
      label: "Active Alerts",
      value: String(activeAlerts),
      progress: Math.min(1, activeAlerts / 20),
    },
    {
      icon: Phone,
      tone: "red",
      caption: "From /api/alert-history",
      label: "Calls Sent Today",
      value: history.length.toLocaleString(),
      progress: Math.min(1, history.length / 30),
    },
    {
      icon: MessageCircle,
      tone: "green",
      caption: "From /api/feedback",
      label: "Feedback Received",
      value: feedback.length.toLocaleString(),
      unit: "new",
      progress: Math.min(1, feedback.length / 25),
    },
    {
      icon: MapPin,
      tone: "neutral",
      caption: "From /api/regions",
      label: "Regions Covered",
      value: regions.length.toLocaleString(),
      unit: "districts",
      progress: Math.min(1, regions.length / 25),
    },
  ];
}

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

function RecentAlertsTable({ alerts }) {
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

      <div className="min-h-0 flex-1 overflow-y-auto">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`${COLS} border-b border-line px-2 py-3 text-sm last:border-none`}
          >
            <span className="font-bold text-primary">AL-{String(alert.id).padStart(4, "0")}</span>
            <span>{getHazardName(alert)}</span>
            <span>{getRegionName(alert)}</span>
            <span>
              <Badge tone={statusTone(alert.status ?? alert.severityLevel)}>
                {alert.status ?? alert.severityLevel ?? "Active"}
              </Badge>
            </span>
            <span className="text-xs text-muted">{timeAgo(alert.createdAt ?? alert.updatedAt)}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function Tag({ label }) {
  const tone =
    String(label).toUpperCase() === "URGENT" || String(label).toLowerCase() === "critical"
      ? "bg-danger-soft text-danger"
      : "bg-chip text-chip-ink";
  return <span className={`rounded-md px-2 py-0.5 text-[10px] font-bold tracking-wide ${tone}`}>{label}</span>;
}

function LiveFeedbackPanel({ feedback }) {
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
        {feedback.map((item) => (
          <div
            key={item.id}
            className={
              item.highlight
                ? "rounded-xl bg-primary-soft/40 p-3.5 shadow-[inset_4px_0_0_var(--color-success)]"
                : "rounded-xl border border-line p-3.5"
            }
          >
            <div className="mb-1.5 flex items-baseline justify-between">
              <span className="text-sm font-bold">Feedback #{item.id}</span>
              <span className="text-[11px] text-muted">{timeAgo(item.createdAt)}</span>
            </div>
            <p className="mb-2 text-sm italic leading-snug text-ink/80">
              &ldquo;{item.translationText ?? item.quote ?? "Community feedback received."}&rdquo;
            </p>
            <div className="flex flex-wrap gap-1.5">
              {((item.tags ?? [getRegionName(item), item.severity]).filter(Boolean)).map((tag) => (
                <Tag key={tag} label={tag} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-2 rounded-xl border border-line py-1 pl-3 pr-1">
        <input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
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

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState({
    alerts: [],
    feedback: [],
    regions: [],
    history: [],
    usingMock: false,
  });

  useEffect(() => {
    let isMounted = true;

    async function loadDashboard() {
      const [alertsResult, feedbackResult, regionsResult, historyResult] = await Promise.all([
        api.getAlerts({ page: 1, limit: 5 }),
        api.getFeedback({ page: 1, limit: 5 }),
        api.getRegions(),
        api.getAlertHistory({ page: 1, limit: 20 }),
      ]);

      if (!isMounted) return;

      setDashboardData({
        alerts: alertsResult.data,
        feedback: feedbackResult.data,
        regions: regionsResult.data,
        history: historyResult.data,
        usingMock:
          alertsResult.usingMock ||
          feedbackResult.usingMock ||
          regionsResult.usingMock ||
          historyResult.usingMock,
      });
    }

    loadDashboard();
    return () => {
      isMounted = false;
    };
  }, []);

  const stats = useMemo(
    () =>
      buildStats(
        dashboardData.alerts,
        dashboardData.feedback,
        dashboardData.regions,
        dashboardData.history,
      ),
    [dashboardData],
  );

  return (
    <AppLayout
      fitViewport
      topBar={
        <TopBar
          title={dashboardData.usingMock ? "Welcome back, Admin - mock data active" : "Welcome back, Admin"}
        />
      }
    >
      <div className="flex h-full min-h-0 flex-col gap-4">
        <section className="grid shrink-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </section>

        <section className="grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr]">
          <RecentAlertsTable alerts={dashboardData.alerts} />
          <LiveFeedbackPanel feedback={dashboardData.feedback} />
        </section>
      </div>
    </AppLayout>
  );
}
