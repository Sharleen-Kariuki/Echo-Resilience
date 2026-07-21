import { useEffect, useMemo, useRef, useState } from "react";
import {
  Download,
  Phone,
  MessageCircle,
  MapPin,
  TriangleAlert,
  CheckCircle2,
  Clock,
  XCircle,
  Languages,
} from "lucide-react";
import AppLayout from "../components/layout/AppLayout";
import TopBar from "../components/layout/TopBar";
import Card from "../components/ui/Card";
import { api, mockAlertHistory, mockRegions } from "../lib/api";

const STATUS_META = {
  dispatched: { label: "Delivered", color: "var(--color-success)", icon: CheckCircle2 },
  in_progress: { label: "In Progress", color: "var(--color-chip-ink)", icon: Clock },
  failed: { label: "Failed", color: "var(--color-danger)", icon: XCircle },
};

function getHazardName(item) {
  return item.hazardType?.name ?? item.hazardTypeName ?? "Other";
}

function getRegionName(item) {
  return item.region?.name ?? item.regionName ?? "Regional";
}

function getDialects(item) {
  if (Array.isArray(item.dialects) && item.dialects.length) return item.dialects;
  return item.dialect ? [item.dialect] : [];
}

function formatCompact(value) {
  if (value >= 1000) return `${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}k`;
  return String(value);
}

function shortDate(value) {
  return new Date(value).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function downloadCsv(rows) {
  const header = ["ID", "Hazard Type", "Region", "Dialects", "Status", "Calls", "Feedback", "Date"];
  const lines = rows.map((row) =>
    [
      row.id,
      getHazardName(row),
      getRegionName(row),
      getDialects(row).join("|"),
      row.status,
      row.callsCount ?? 0,
      row.feedbackCount ?? 0,
      new Date(row.dispatchedAt ?? row.createdAt).toISOString(),
    ]
      .map((value) => `"${String(value).replace(/"/g, '""')}"`)
      .join(","),
  );
  const csv = [header.join(","), ...lines].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `echo-resilience-alert-report-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

function KpiTile({ icon: Icon, label, value, caption }) {
  return (
    <Card className="p-5">
      <div className="mb-3 flex items-center gap-2.5">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary">
          <Icon size={18} strokeWidth={2} />
        </div>
      </div>
      <div className="text-xs font-semibold tracking-wide text-muted">{label}</div>
      <div className="font-display text-2xl font-extrabold text-ink">{value}</div>
      {caption && <div className="mt-1 text-xs text-muted">{caption}</div>}
    </Card>
  );
}

// Single-hue horizontal bar list — magnitude ranking, not category identity,
// so one color is correct: no legend needed for a single series (dataviz skill, check 6).
function BarList({ data, color = "var(--color-primary)", formatValue = (value) => value.toLocaleString() }) {
  const max = Math.max(1, ...data.map((row) => row.value));
  const [hovered, setHovered] = useState(null);

  if (!data.length) return <p className="text-sm text-muted">No data yet.</p>;

  return (
    <div className="space-y-3">
      {data.map((row, index) => (
        <div
          key={row.label}
          className="group"
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered((current) => (current === index ? null : current))}
        >
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className={`font-medium ${hovered === index ? "text-ink" : "text-ink/80"}`}>{row.label}</span>
            <span className="font-bold tabular-nums text-ink">{formatValue(row.value)}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-canvas">
            <div
              className="h-full rounded-full transition-[width]"
              style={{
                width: `${Math.max(3, (row.value / max) * 100)}%`,
                backgroundColor: color,
                opacity: hovered === null || hovered === index ? 1 : 0.45,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// Line + area trend with a hover crosshair (dataviz skill check 5: ship the hover
// layer by default on any line/area). Single series, single hue, one axis.
function TrendArea({ data, color, formatValue = (value) => value.toLocaleString() }) {
  const svgRef = useRef(null);
  const [hoverIndex, setHoverIndex] = useState(null);

  const values = data.map((point) => point.value);
  const max = Math.max(1, ...values);
  const min = Math.min(0, ...values);
  const range = max - min || 1;

  const points = data.map((point, index) => ({
    x: data.length > 1 ? (index / (data.length - 1)) * 100 : 50,
    y: 34 - ((point.value - min) / range) * 28,
    ...point,
  }));

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const areaPath = `${linePath} L${points[points.length - 1]?.x ?? 0},36 L${points[0]?.x ?? 0},36 Z`;

  function handleMove(event) {
    const svg = svgRef.current;
    if (!svg || !points.length) return;
    const rect = svg.getBoundingClientRect();
    const fraction = (event.clientX - rect.left) / rect.width;
    const index = Math.round(fraction * (points.length - 1));
    setHoverIndex(Math.min(points.length - 1, Math.max(0, index)));
  }

  const active = hoverIndex !== null ? points[hoverIndex] : null;

  return (
    <div className="relative">
      <svg
        ref={svgRef}
        viewBox="0 0 100 40"
        preserveAspectRatio="none"
        className="h-40 w-full"
        onMouseMove={handleMove}
        onMouseLeave={() => setHoverIndex(null)}
      >
        <line x1="0" y1="36" x2="100" y2="36" stroke="var(--color-line)" strokeWidth="0.5" />
        <path d={areaPath} fill={color} opacity="0.14" stroke="none" />
        <path d={linePath} fill="none" stroke={color} strokeWidth="1.4" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" />
        {active && (
          <>
            <line x1={active.x} y1="2" x2={active.x} y2="36" stroke="var(--color-line)" strokeWidth="0.5" />
            <circle cx={active.x} cy={active.y} r="1.6" fill={color} stroke="var(--color-surface)" strokeWidth="0.8" />
          </>
        )}
      </svg>

      {active && (
        <div
          className="pointer-events-none absolute top-0 -translate-x-1/2 -translate-y-full rounded-lg border border-line bg-surface px-2.5 py-1.5 text-xs shadow-md"
          style={{ left: `${active.x}%` }}
        >
          <div className="font-bold text-ink">{formatValue(active.value)}</div>
          <div className="text-muted">{active.label}</div>
        </div>
      )}

      <div className="mt-1 flex justify-between text-xs text-muted">
        <span>{data[0]?.label}</span>
        <span>{data[data.length - 1]?.label}</span>
      </div>
    </div>
  );
}

function StatusBreakdown({ counts }) {
  const total = Math.max(1, Object.values(counts).reduce((sum, value) => sum + value, 0));
  const circumference = 2 * Math.PI * 30;
  let offset = 0;
  const segments = Object.entries(STATUS_META).map(([key, meta]) => {
    const value = counts[key] ?? 0;
    const length = (value / total) * circumference;
    const segment = { key, meta, value, length, offset };
    offset += length;
    return segment;
  });

  return (
    <div className="flex flex-wrap items-center gap-6">
      <svg width="88" height="88" viewBox="0 0 88 88" className="shrink-0 -rotate-90">
        <circle cx="44" cy="44" r="30" fill="none" stroke="var(--color-chip)" strokeWidth="11" />
        {segments.map(
          (segment) =>
            segment.value > 0 && (
              <circle
                key={segment.key}
                cx="44"
                cy="44"
                r="30"
                fill="none"
                stroke={segment.meta.color}
                strokeWidth="11"
                strokeDasharray={`${Math.max(0, segment.length - 1.5)} ${circumference}`}
                strokeDashoffset={-segment.offset}
                strokeLinecap="round"
              />
            ),
        )}
      </svg>
      <div className="space-y-2">
        {segments.map(({ key, meta, value }) => (
          <div key={key} className="flex items-center gap-2 text-sm">
            <meta.icon size={15} style={{ color: meta.color }} />
            <span className="text-ink">{meta.label}</span>
            <span className="font-bold tabular-nums text-ink">{value}</span>
            <span className="text-xs text-muted">({Math.round((value / total) * 100)}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AnalyticsPage() {
  const [history, setHistory] = useState(mockAlertHistory);
  const [regions, setRegions] = useState(mockRegions);
  const [status, setStatus] = useState("Loading analytics...");
  const [usingMock, setUsingMock] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      const [historyResult, regionsResult] = await Promise.all([
        api.getAlertHistory({ page: 1, limit: 200 }),
        api.getRegions(),
      ]);
      if (!isMounted) return;

      setHistory(historyResult.data.length ? historyResult.data : mockAlertHistory);
      setRegions(regionsResult.data.length ? regionsResult.data : mockRegions);
      const anyMock = historyResult.usingMock || regionsResult.usingMock;
      setUsingMock(anyMock);
      setStatus(anyMock ? "Backend unavailable - mock analytics active" : "Synced from /api/alert-history");
    }

    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const kpis = useMemo(() => {
    const totalCalls = history.reduce((sum, item) => sum + Number(item.callsCount ?? 0), 0);
    const totalFeedback = history.reduce((sum, item) => sum + Number(item.feedbackCount ?? 0), 0);
    const regionsReached = new Set(history.map((item) => getRegionName(item))).size;
    return { totalAlerts: history.length, totalCalls, totalFeedback, regionsReached };
  }, [history]);

  const hazardBars = useMemo(() => {
    const counts = new Map();
    history.forEach((item) => counts.set(getHazardName(item), (counts.get(getHazardName(item)) ?? 0) + 1));
    return [...counts.entries()].map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value);
  }, [history]);

  const regionBars = useMemo(() => {
    const totals = new Map();
    history.forEach((item) => {
      const name = getRegionName(item);
      totals.set(name, (totals.get(name) ?? 0) + Number(item.callsCount ?? 0));
    });
    return [...totals.entries()]
      .map(([label, value]) => ({ label, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);
  }, [history]);

  const dialectBars = useMemo(() => {
    const counts = new Map();
    history.forEach((item) => getDialects(item).forEach((dialect) => counts.set(dialect, (counts.get(dialect) ?? 0) + 1)));
    return [...counts.entries()].map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value);
  }, [history]);

  const statusCounts = useMemo(() => {
    const counts = { dispatched: 0, in_progress: 0, failed: 0 };
    history.forEach((item) => {
      const key = String(item.status ?? "").toLowerCase();
      if (counts[key] !== undefined) counts[key] += 1;
    });
    return counts;
  }, [history]);

  const trends = useMemo(() => {
    const byDate = new Map();
    [...history]
      .sort((a, b) => new Date(a.dispatchedAt ?? a.createdAt) - new Date(b.dispatchedAt ?? b.createdAt))
      .forEach((item) => {
        const label = shortDate(item.dispatchedAt ?? item.createdAt);
        const entry = byDate.get(label) ?? { label, calls: 0, feedback: 0 };
        entry.calls += Number(item.callsCount ?? 0);
        entry.feedback += Number(item.feedbackCount ?? 0);
        byDate.set(label, entry);
      });
    const points = [...byDate.values()];
    return {
      calls: points.map((point) => ({ label: point.label, value: point.calls })),
      feedback: points.map((point) => ({ label: point.label, value: point.feedback })),
    };
  }, [history]);

  const actions = (
    <button
      onClick={() => downloadCsv(history)}
      className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-semibold text-white hover:brightness-110"
    >
      <Download size={18} /> Export Report
    </button>
  );

  return (
    <AppLayout
      topBar={<TopBar title="Analytics & Reports" showSearch={false} actions={actions} />}
    >
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiTile icon={TriangleAlert} label="ALERTS DISPATCHED" value={kpis.totalAlerts.toLocaleString()} caption="From /api/alert-history" />
        <KpiTile icon={Phone} label="LIVES REACHED" value={formatCompact(kpis.totalCalls)} caption="Total calls placed" />
        <KpiTile icon={MessageCircle} label="FEEDBACK RECEIVED" value={formatCompact(kpis.totalFeedback)} caption="Community responses" />
        <KpiTile icon={MapPin} label="REGIONS REACHED" value={kpis.regionsReached} caption={`Of ${regions.length} total regions`} />
      </div>

      <div className="mb-5 grid grid-cols-1 items-start gap-5 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="mb-5 font-display text-lg font-extrabold text-ink">Alerts by Hazard Type</h2>
          <BarList data={hazardBars} />
        </Card>

        <Card className="p-6">
          <h2 className="mb-5 font-display text-lg font-extrabold text-ink">Alert Status Breakdown</h2>
          <StatusBreakdown counts={statusCounts} />
        </Card>
      </div>

      <div className="mb-5 grid grid-cols-1 items-start gap-5 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="mb-1 font-display text-lg font-extrabold text-ink">Calls Dispatched Trend</h2>
          <p className="mb-4 text-xs text-muted">Hover the line for exact values</p>
          <TrendArea data={trends.calls} color="var(--color-primary)" />
        </Card>

        <Card className="p-6">
          <h2 className="mb-1 font-display text-lg font-extrabold text-ink">Feedback Received Trend</h2>
          <p className="mb-4 text-xs text-muted">Hover the line for exact values</p>
          <TrendArea data={trends.feedback} color="var(--color-success)" />
        </Card>
      </div>

      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="mb-5 flex items-center gap-2 font-display text-lg font-extrabold text-ink">
            <MapPin size={18} className="text-primary" /> Top Regions by Reach
          </h2>
          <BarList data={regionBars} />
        </Card>

        <Card className="p-6">
          <h2 className="mb-5 flex items-center gap-2 font-display text-lg font-extrabold text-ink">
            <Languages size={18} className="text-primary" /> Dialect Reach
          </h2>
          <BarList data={dialectBars} formatValue={(value) => `${value} alert${value === 1 ? "" : "s"}`} />
        </Card>
      </div>

      {usingMock && <div className="mt-4 text-xs text-muted">{status}</div>}
    </AppLayout>
  );
}
