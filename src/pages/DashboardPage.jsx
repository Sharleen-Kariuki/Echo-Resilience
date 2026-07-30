import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertOctagon,
  MessagesSquare,
  Send,
  Trash2,
  ArrowRight,
  ArrowUpRight,
  TriangleAlert,
} from "lucide-react";
import AppLayout from "../components/layout/AppLayout";
import TopBar from "../components/layout/TopBar";
import Card from "../components/ui/Card";
import Badge, { statusTone } from "../components/ui/Badge";
import Modal from "../components/ui/Modal";
import { api } from "../lib/api";

const COLS = "grid grid-cols-[0.85fr_1fr_1fr_0.9fr_0.7fr_2.5rem] gap-3 items-center";

function timeAgo(value) {
  if (!value) return "Just now";
  const seconds = Math.max(1, Math.floor((Date.now() - new Date(value).getTime()) / 1000));
  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

function todayLabel() {
  const date = new Date();
  const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
  const month = date.toLocaleDateString("en-US", { month: "long" });
  return `${weekday.toUpperCase()} ${date.getDate()} ${month.toUpperCase()}`;
}

function getHazardName(alert) {
  return alert.hazardType?.name ?? alert.hazardTypeName ?? alert.type ?? "Climate alert";
}

function getAlertRegions(alert) {
  if (Array.isArray(alert.regions)) return alert.regions;
  if (Array.isArray(alert.alertRegions)) return alert.alertRegions.map((entry) => entry.region).filter(Boolean);
  return [];
}

function getRegionName(item) {
  return item.region?.name ?? item.regions?.[0]?.name ?? item.regionName ?? "Unassigned";
}

function buildStats(alerts, feedback, regions, history) {
  const activeAlerts = alerts.filter((alert) => {
    const status = String(alert.status ?? alert.severityLevel ?? "").toLowerCase();
    return !["resolved", "closed", "complete"].includes(status);
  }).length;

  const unanswered = feedback.filter((item) => !item.adminResponse).length;

  return [
    {
      label: "Active alerts",
      value: String(activeAlerts),
      detail: activeAlerts === 1 ? "Needs review" : activeAlerts ? "Need attention" : "All clear",
      valueTone: activeAlerts > 0 ? "text-clay" : "text-ink",
    },
    {
      label: "Calls dispatched",
      value: history.length.toLocaleString(),
      detail: "Today",
    },
    {
      label: "Community reports",
      value: feedback.length.toLocaleString(),
      detail: unanswered ? `${unanswered} unread` : "All caught up",
    },
    {
      label: "Regions monitored",
      value: regions.length.toLocaleString(),
      detail: regions.length === 1 ? "District" : "Districts",
    },
  ];
}

function StatCard({ label, value, detail, valueTone = "text-ink" }) {
  return (
    <Card className="p-5">
      <div className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</div>
      <div className={`mt-2 font-display text-[2rem] font-semibold leading-none tracking-tight ${valueTone}`}>
        {value}
      </div>
      <div className="mt-1.5 text-xs text-muted">{detail}</div>
    </Card>
  );
}

function RecentAlertsTable({ alerts, onViewAll, onSelect, onDelete, deletingId }) {
  return (
    <Card className="flex min-h-0 flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b border-line px-5 py-4">
        <div>
          <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-ink">
            <AlertOctagon size={17} className="text-clay" strokeWidth={2.25} />
            Recent alerts
          </h2>
          <p className="mt-0.5 text-xs text-muted">Latest dispatches across all regions</p>
        </div>
        <button
          onClick={onViewAll}
          className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-glow"
        >
          View all
          <ArrowRight size={14} />
        </button>
      </div>

      <div className={`${COLS} border-b border-line/70 bg-canvas/50 px-5 py-2.5 text-xs font-medium text-muted`}>
        <span>ID</span>
        <span>Hazard</span>
        <span>Region</span>
        <span>Status</span>
        <span>Age</span>
        <span />
      </div>

      {alerts.length === 0 ? (
        <div className="flex flex-1 items-center justify-center py-16">
          <p className="text-sm text-muted">No alerts recorded yet.</p>
        </div>
      ) : (
        <div className="min-h-0 flex-1 overflow-y-auto">
          {alerts.map((alert) => (
              <div
                key={alert.id}
                onClick={() => onSelect(alert.id)}
                className={`${COLS} cursor-pointer border-b border-line/60 px-5 py-3 text-sm transition-colors last:border-none hover:bg-primary-soft/25`}
              >
                <span className="font-mono text-xs font-medium text-ink/80">
                  AL-{String(alert.id).padStart(4, "0")}
                </span>
                <span className="font-medium text-ink">{getHazardName(alert)}</span>
                <span className="text-muted">{getRegionName(alert)}</span>
                <span>
                  <Badge tone={statusTone(alert.status ?? alert.severityLevel)}>
                    {alert.status ?? alert.severityLevel ?? "Active"}
                  </Badge>
                </span>
                <span className="text-xs text-muted">{timeAgo(alert.createdAt ?? alert.updatedAt)}</span>
                <span>
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      onDelete(alert.id);
                    }}
                    disabled={deletingId === alert.id}
                    className="rounded-md p-1.5 text-muted transition-colors hover:bg-danger-soft hover:text-danger disabled:opacity-50"
                    aria-label={`Delete alert AL-${String(alert.id).padStart(4, "0")}`}
                  >
                    <Trash2 size={15} />
                  </button>
                </span>
              </div>
            ))}
        </div>
      )}
    </Card>
  );
}

function AlertDetailModal({ alertId, onClose }) {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!alertId) return;
    let isMounted = true;
    setDetail(null);
    setLoading(true);

    api
      .getAlert(alertId)
      .then((result) => {
        if (isMounted) setDetail(result);
      })
      .catch(() => {})
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [alertId]);

  if (!alertId) return null;

  return (
    <Modal
      open={Boolean(alertId)}
      onClose={onClose}
      title={detail ? getHazardName(detail) : `Alert AL-${String(alertId).padStart(4, "0")}`}
      description={detail ? `AL-${String(detail.id).padStart(4, "0")} · ${getRegionName(detail)}` : undefined}
    >
      {loading && <p className="text-sm text-muted">Loading alert details…</p>}

      {!loading && !detail && (
        <p className="text-sm text-muted">Couldn&apos;t load this alert. Try again in a moment.</p>
      )}

      {detail && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone={statusTone(detail.status ?? detail.severityLevel)}>
              {detail.status ?? detail.severityLevel ?? "Active"}
            </Badge>
            <span className="text-xs text-muted">{timeAgo(detail.createdAt)}</span>
          </div>

          <div>
            <div className="mb-1.5 text-xs font-medium text-muted">Scientific description</div>
            <p className="text-sm leading-relaxed text-ink">{detail.rawScientificDescription ?? "—"}</p>
          </div>

          <div>
            <div className="mb-1.5 text-xs font-medium text-muted">Affected regions</div>
            <div className="flex flex-wrap gap-1.5">
              {getAlertRegions(detail).map((region) => (
                <span
                  key={region.id}
                  className="border border-line bg-chip px-2.5 py-0.5 text-xs font-medium text-chip-ink"
                >
                  {region.name}
                </span>
              ))}
              {!getAlertRegions(detail).length && (
                <span className="text-sm text-muted">No regions recorded.</span>
              )}
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}

function Tag({ label }) {
  const urgent =
    String(label).toUpperCase() === "URGENT" || String(label).toLowerCase() === "critical";
  return (
    <span
      className={`border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${
        urgent ? "border-danger/30 bg-danger-soft text-danger" : "border-line bg-chip text-chip-ink"
      }`}
    >
      {label}
    </span>
  );
}

function LiveFeedbackPanel({ feedback, onRespond, sendingId, onOpenInbox }) {
  const [message, setMessage] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const activeId = selectedId ?? feedback[0]?.id ?? null;

  function handleSend() {
    if (!message.trim() || !activeId) return;
    onRespond(activeId, message.trim());
    setMessage("");
  }

  return (
    <Card className="flex min-h-0 flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b border-line px-5 py-4">
        <div>
          <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-ink">
            <MessagesSquare size={17} className="text-success" strokeWidth={2.25} />
            Community feedback
          </h2>
          <p className="mt-0.5 text-xs text-muted">Incoming field reports</p>
        </div>
        <button
          onClick={onOpenInbox}
          className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-glow"
        >
          Open inbox
        </button>
      </div>

      <div className="min-h-0 flex-1 space-y-2 overflow-y-auto p-3">
        {feedback.length === 0 ? (
          <div className="flex h-full items-center justify-center py-12">
            <p className="text-sm text-muted">No feedback received yet.</p>
          </div>
        ) : (
          feedback.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              className={`w-full rounded-lg p-3.5 text-left transition-all ${
                item.id === activeId
                  ? "bg-accent-soft/60 ring-1 ring-accent/30"
                  : "hover:bg-canvas/80"
              }`}
            >
              <div className="mb-1.5 flex items-baseline justify-between gap-2">
                <span className="text-sm font-semibold text-ink">{getRegionName(item)}</span>
                <span className="shrink-0 text-[11px] text-muted">{timeAgo(item.createdAt)}</span>
              </div>
              <p className="mb-2 line-clamp-2 text-sm leading-relaxed text-ink/85">
                {item.translationText ?? item.quote ?? "Community feedback received."}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {((item.tags ?? [item.severity]).filter(Boolean)).map((tag) => (
                  <Tag key={tag} label={tag} />
                ))}
              </div>
              {item.adminResponse && (
                <p className="mt-2.5 rounded-md bg-success-soft/70 px-2.5 py-2 text-xs leading-relaxed text-success">
                  <span className="font-semibold">You replied:</span> {item.adminResponse}
                </p>
              )}
            </button>
          ))
        )}
      </div>

      <div className="border-t border-line p-3">
        <div className="flex items-center gap-2 rounded-lg border border-line bg-canvas/50 py-1 pl-3 pr-1 focus-within:border-accent/50 focus-within:ring-2 focus-within:ring-accent/15">
          <input
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && handleSend()}
            className="min-w-0 flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-muted disabled:cursor-not-allowed"
            placeholder="Write an official response…"
            aria-label="Reply to community feedback"
            disabled={!activeId}
          />
          <button
            onClick={handleSend}
            disabled={!activeId || !message.trim() || sendingId === activeId}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-accent text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Send reply"
          >
            <Send size={15} />
          </button>
        </div>
      </div>
    </Card>
  );
}

export default function DashboardPage() {
  const navigate = useNavigate();
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

  const [sendingId, setSendingId] = useState(null);
  const [selectedAlertId, setSelectedAlertId] = useState(null);
  const [deletingAlertId, setDeletingAlertId] = useState(null);

  const activeCount = stats[0]?.value ?? "0";
  const hasActiveAlerts = Number(activeCount) > 0;

  async function handleDeleteAlert(id) {
    const label = `AL-${String(id).padStart(4, "0")}`;
    if (!window.confirm(`Delete alert ${label}? This can't be undone.`)) return;

    setDeletingAlertId(id);
    try {
      await api.deleteAlert(id);
    } catch (error) {
      console.error(error);
    } finally {
      setDashboardData((current) => ({
        ...current,
        alerts: current.alerts.filter((alert) => alert.id !== id),
      }));
      setDeletingAlertId(null);
    }
  }

  async function handleRespond(id, message) {
    setSendingId(id);
    try {
      await api.updateFeedback(id, { adminResponse: message });
    } catch (error) {
      console.error(error);
    } finally {
      setDashboardData((current) => ({
        ...current,
        feedback: current.feedback.map((item) =>
          item.id === id ? { ...item, adminResponse: message, respondedAt: new Date().toISOString() } : item,
        ),
      }));
      setSendingId(null);
    }
  }

  const headerActions = (
    <>
      <button
        onClick={() => navigate("/alerts")}
        className={`flex items-center gap-2 border bg-surface px-3.5 py-1.5 text-sm font-medium ${
          hasActiveAlerts ? "border-clay text-clay hover:bg-clay-soft" : "border-line text-chip-ink hover:bg-canvas"
        }`}
      >
        {hasActiveAlerts && <TriangleAlert size={14} strokeWidth={2.5} />}
        {hasActiveAlerts ? `${activeCount} active alert${activeCount === "1" ? "" : "s"}` : "Systems normal"}
      </button>
      <button
        onClick={() => navigate("/alerts/new")}
        className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:brightness-110"
      >
        New alert
        <ArrowUpRight size={15} strokeWidth={2.5} />
      </button>
    </>
  );

  return (
    <AppLayout
      fitViewport
      topBar={
        <TopBar
          eyebrow={todayLabel()}
          title="Operations overview"
          subtitle={dashboardData.usingMock ? "Preview mode — sample data loaded" : undefined}
          showSearch={false}
          actions={headerActions}
        />
      }
    >
      <div className="flex h-full min-h-0 flex-col gap-5">
        <section className="grid shrink-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </section>

        <section className="grid min-h-0 flex-1 grid-cols-1 gap-5 lg:grid-cols-[1.6fr_1fr]">
          <RecentAlertsTable
            alerts={dashboardData.alerts}
            onViewAll={() => navigate("/alerts")}
            onSelect={setSelectedAlertId}
            onDelete={handleDeleteAlert}
            deletingId={deletingAlertId}
          />
          <LiveFeedbackPanel
            feedback={dashboardData.feedback}
            onRespond={handleRespond}
            sendingId={sendingId}
            onOpenInbox={() => navigate("/feedback")}
          />
        </section>
      </div>

      <AlertDetailModal alertId={selectedAlertId} onClose={() => setSelectedAlertId(null)} />
    </AppLayout>
  );
}
