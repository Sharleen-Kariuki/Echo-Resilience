import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Calendar,
  MessageSquare,
  Globe2,
  History,
  TrendingUp,
  Languages,
  CheckCircle2,
  X,
} from "lucide-react";
import AppLayout from "../components/layout/AppLayout";
import TopBar from "../components/layout/TopBar";
import Card from "../components/ui/Card";
import Badge, { statusTone } from "../components/ui/Badge";
import Modal from "../components/ui/Modal";
import { api, mockRegions, resolveAudioUrl } from "../lib/api";

const PAGE_SIZE = 5;

const COLS = "grid grid-cols-[1.2fr_1.1fr_1.2fr_1.3fr_0.9fr_0.8fr_0.8fr] gap-3 items-center";

const STATUS_OPTIONS = [
  { id: "", name: "All Status" },
  { id: "dispatched", name: "Delivered" },
  { id: "in_progress", name: "In Progress" },
  { id: "failed", name: "Failed" },
];

function getHazardName(item) {
  return item.hazardType?.name ?? item.hazardTypeName ?? "Climate Alert";
}

function getRegionName(item) {
  return item.region?.name ?? item.regionName ?? "Regional";
}

function getDialects(item) {
  if (Array.isArray(item.dialects) && item.dialects.length) return item.dialects;
  return item.dialect ? [item.dialect] : [];
}

function statusLabel(status) {
  const map = {
    dispatched: "DELIVERED",
    delivered: "DELIVERED",
    in_progress: "IN PROGRESS",
    pending: "PENDING",
    failed: "FAILED",
  };
  return map[String(status).toLowerCase()] ?? String(status ?? "PENDING").toUpperCase();
}

function formatDate(value) {
  if (!value) return { day: "—", time: "" };
  const date = new Date(value);
  const day = date.toLocaleDateString(undefined, { month: "short", day: "2-digit", year: "numeric" });
  const time = `${date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit", hour12: false })} GMT`;
  return { day, time };
}

function FilterSelect({ value, onChange, options, icon: Icon }) {
  return (
    <div className="relative">
      {Icon && <Icon size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`w-full appearance-none rounded-md border border-line bg-surface py-2.5 pr-9 text-sm font-semibold text-ink outline-none focus:border-primary ${
          Icon ? "pl-9" : "pl-4"
        }`}
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted" />
    </div>
  );
}

function HistoryRow({ item, onSelect }) {
  const { day, time } = formatDate(item.dispatchedAt ?? item.createdAt);
  const dialects = getDialects(item);
  const inProgress = String(item.status).toLowerCase() === "in_progress";

  return (
    <div
      onClick={() => onSelect(item)}
      className={`${COLS} cursor-pointer border-b border-line px-3 py-4 text-sm last:border-none hover:bg-canvas/60`}
    >
      <div>
        <div className="font-semibold text-ink">{day}</div>
        <div className="text-xs text-muted">{time}</div>
      </div>
      <div className="font-medium text-ink">{getHazardName(item)}</div>
      <div className="text-ink">{getRegionName(item)}</div>
      <div className="flex flex-wrap gap-1.5">
        {dialects.length ? (
          dialects.map((dialect) => (
            <span key={dialect} className="rounded-md bg-chip px-2 py-0.5 text-[11px] font-bold tracking-wide text-chip-ink">
              {dialect.toUpperCase()}
            </span>
          ))
        ) : (
          <span className="text-xs text-muted">—</span>
        )}
      </div>
      <div>
        <Badge tone={statusTone(statusLabel(item.status))}>{statusLabel(item.status)}</Badge>
      </div>
      <div className="font-bold text-ink">{Number(item.callsCount ?? 0).toLocaleString()}</div>
      <div className="flex items-center gap-1.5 text-ink">
        <MessageSquare size={14} className="text-muted" />
        {inProgress ? <span className="text-muted">--</span> : Number(item.feedbackCount ?? 0).toLocaleString()}
      </div>
    </div>
  );
}

function SummaryCard({ icon: Icon, label, value, caption, dark }) {
  return (
    <Card className={`flex items-center gap-4 p-5 ${dark ? "border-none bg-ink text-white" : ""}`}>
      {Icon && (
        <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-md ${dark ? "bg-white/10 text-white" : "bg-primary-soft text-primary"}`}>
          <Icon size={20} />
        </div>
      )}
      <div className="min-w-0">
        <div className={`text-xs font-semibold tracking-wide ${dark ? "text-white/60" : "text-muted"}`}>{label}</div>
        <div className={`font-display text-2xl font-bold ${dark ? "text-white" : "text-primary"}`}>{value}</div>
        {caption && <div className={`mt-0.5 text-xs ${dark ? "text-white/60" : "text-muted"}`}>{caption}</div>}
      </div>
    </Card>
  );
}

function AlertDetailModal({ item, onClose }) {
  const [detail, setDetail] = useState(item);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!item) return;
    let isMounted = true;
    setDetail(item);
    setLoading(true);

    api
      .getAlertHistoryItem(item.id)
      .then((result) => {
        if (isMounted && result) setDetail({ ...item, ...result });
      })
      .catch(() => {
        // Endpoint unreachable or record not on the backend yet — keep the row's own data.
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [item]);

  if (!item) return null;
  const { day, time } = formatDate(detail.dispatchedAt ?? detail.createdAt);
  const dialects = getDialects(detail);

  return (
    <Modal open={Boolean(item)} onClose={onClose} title={getHazardName(detail)} description={`${day} · ${time} · ${getRegionName(detail)}`}>
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone={statusTone(statusLabel(detail.status))}>{statusLabel(detail.status)}</Badge>
          {dialects.map((dialect) => (
            <span key={dialect} className="rounded-md bg-chip px-2 py-0.5 text-[11px] font-bold tracking-wide text-chip-ink">
              {dialect.toUpperCase()}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-md bg-canvas p-4">
            <div className="text-xs font-semibold tracking-wide text-muted">CALLS PLACED</div>
            <div className="font-display text-xl font-bold text-primary">{Number(detail.callsCount ?? 0).toLocaleString()}</div>
          </div>
          <div className="rounded-md bg-canvas p-4">
            <div className="text-xs font-semibold tracking-wide text-muted">FEEDBACK RECEIVED</div>
            <div className="font-display text-xl font-bold text-primary">{Number(detail.feedbackCount ?? 0).toLocaleString()}</div>
          </div>
        </div>

        {detail.simplifiedText && (
          <div>
            <div className="mb-1 text-xs font-semibold tracking-wide text-muted">SIMPLIFIED MESSAGE</div>
            <p className="text-sm leading-relaxed text-ink">{detail.simplifiedText}</p>
          </div>
        )}

        {detail.translatedText && (
          <div>
            <div className="mb-1 text-xs font-semibold tracking-wide text-muted">TRANSLATED MESSAGE</div>
            <p className="text-sm leading-relaxed text-ink">{detail.translatedText}</p>
          </div>
        )}

        {detail.audioUrl && (
          <audio controls src={resolveAudioUrl(detail.audioUrl)} className="w-full">
            <track kind="captions" />
          </audio>
        )}

        {Array.isArray(detail.feedbackLogs) && detail.feedbackLogs.length > 0 && (
          <div>
            <div className="mb-1.5 text-xs font-semibold tracking-wide text-muted">
              FEEDBACK LOGS ({detail.feedbackLogs.length})
            </div>
            <div className="max-h-40 space-y-2 overflow-y-auto">
              {detail.feedbackLogs.map((log) => (
                <div key={log.id} className="rounded-lg border border-line p-2.5 text-sm text-ink/80">
                  {log.translationText ?? "Feedback recorded."}
                </div>
              ))}
            </div>
          </div>
        )}

        {loading && <p className="text-xs text-muted">Refreshing…</p>}
      </div>
    </Modal>
  );
}

export default function AlertHistoryPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [dispatchBanner, setDispatchBanner] = useState(location.state?.dispatched ? location.state : null);
  const [history, setHistory] = useState([]);
  const [regions, setRegions] = useState(mockRegions);
  const [search, setSearch] = useState("");
  const [regionId, setRegionId] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [date, setDate] = useState("");
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("Loading alert history...");
  const [usingMock, setUsingMock] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    // Clear the navigation state right away so a refresh (or navigating back
    // here later) doesn't re-show a stale "dispatched" banner.
    if (location.state?.dispatched) {
      navigate(location.pathname, { replace: true, state: null });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      const [historyResult, regionsResult] = await Promise.all([
        api.getAlertHistory({ page: 1, limit: 50 }),
        api.getRegions(),
      ]);

      if (!isMounted) return;

      setHistory(historyResult.data);
      setRegions(regionsResult.data.length ? regionsResult.data : mockRegions);
      setUsingMock(historyResult.usingMock || regionsResult.usingMock);
      setStatus(historyResult.usingMock ? "Showing sample data" : "Up to date");
    }

    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const filtered = useMemo(() => {
    return history.filter((item) => {
      if (regionId && String(item.regionId) !== String(regionId)) return false;
      if (statusFilter && String(item.status).toLowerCase() !== statusFilter) return false;
      if (date) {
        const itemDate = new Date(item.dispatchedAt ?? item.createdAt).toISOString().slice(0, 10);
        if (itemDate !== date) return false;
      }
      if (search) {
        const haystack = `${getHazardName(item)} ${getRegionName(item)} ${getDialects(item).join(" ")}`.toLowerCase();
        if (!haystack.includes(search.toLowerCase())) return false;
      }
      return true;
    });
  }, [history, regionId, statusFilter, date, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const stats = useMemo(() => {
    if (!history.length) {
      return { topHazard: "—", topDialect: "—", topDialectCaption: "", totalCalls: "0", regionCount: 0 };
    }

    const hazardCounts = new Map();
    const dialectCounts = new Map();
    let totalCalls = 0;
    const regionSet = new Set();

    history.forEach((item) => {
      const hazard = getHazardName(item);
      hazardCounts.set(hazard, (hazardCounts.get(hazard) ?? 0) + 1);
      getDialects(item).forEach((dialect) => dialectCounts.set(dialect, (dialectCounts.get(dialect) ?? 0) + 1));
      totalCalls += Number(item.callsCount ?? 0);
      regionSet.add(getRegionName(item));
    });

    const topHazard = [...hazardCounts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—";
    const [topDialect, dialectHits] = [...dialectCounts.entries()].sort((a, b) => b[1] - a[1])[0] ?? ["—", 0];
    const dialectPct = dialectHits ? Math.round((dialectHits / history.length) * 100) : 0;

    return {
      topHazard,
      topDialect,
      topDialectCaption: dialectHits ? `Used in ${dialectPct}% of delivered alerts` : "",
      totalCalls: totalCalls.toLocaleString(),
      regionCount: regionSet.size,
    };
  }, [history]);

  const actions = (
    <button
      onClick={() => navigate("/alerts/new")}
      className="flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 font-semibold text-white hover:brightness-110"
    >
      <Plus size={18} /> New Alert
    </button>
  );

  return (
    <AppLayout
      topBar={<TopBar title="Alert History" searchPlaceholder="Search alert logs..." actions={actions} />}
    >
      {dispatchBanner && (
        <div className="mb-5 flex items-start gap-3 border border-success bg-surface p-4 text-success">
          <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
          <p className="flex-1 text-sm">
            <span className="font-bold">{dispatchBanner.hazardName}</span> dispatched in{" "}
            <span className="font-bold">{dispatchBanner.dialect}</span> to{" "}
            <span className="font-bold">{Number(dispatchBanner.reachableCount ?? 0).toLocaleString()} registered numbers</span>{" "}
            in <span className="underline">{dispatchBanner.regionName}</span>.
          </p>
          <button onClick={() => setDispatchBanner(null)} aria-label="Dismiss" className="shrink-0 text-success hover:opacity-70">
            <X size={16} />
          </button>
        </div>
      )}

      <Card className="mb-5 flex flex-wrap items-center gap-3 p-4">
        <label className="flex min-w-56 flex-1 items-center gap-2.5 rounded-md border border-line bg-canvas px-3.5 py-2.5 text-muted focus-within:border-primary">
          <Search size={16} />
          <input
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
            placeholder="Search alert logs..."
            className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted"
          />
        </label>

        <div className="w-40">
          <FilterSelect
            value={regionId}
            onChange={(value) => {
              setRegionId(value);
              setPage(1);
            }}
            options={[{ id: "", name: "All Regions" }, ...regions]}
          />
        </div>

        <div className="w-40">
          <FilterSelect
            value={statusFilter}
            onChange={(value) => {
              setStatusFilter(value);
              setPage(1);
            }}
            options={STATUS_OPTIONS}
          />
        </div>

        <div className="relative w-44">
          <Calendar size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="date"
            value={date}
            onChange={(event) => {
              setDate(event.target.value);
              setPage(1);
            }}
            className="w-full rounded-md border border-line bg-surface py-2.5 pl-9 pr-3 text-sm font-semibold text-ink outline-none focus:border-primary"
          />
        </div>
      </Card>

      <Card className="mb-5 overflow-hidden p-0">
        <div className={`${COLS} border-b border-line bg-canvas/60 px-3 py-3 text-xs font-bold tracking-wide text-muted`}>
          <span>DATE &amp; TIME</span>
          <span>HAZARD TYPE</span>
          <span>REGION</span>
          <span>DIALECT(S)</span>
          <span>STATUS</span>
          <span>CALLS</span>
          <span>FEEDBACK</span>
        </div>

        {pageItems.length ? (
          pageItems.map((item) => <HistoryRow key={item.id} item={item} onSelect={setSelectedItem} />)
        ) : (
          <div className="px-3 py-10 text-center text-sm text-muted">No alert history matches these filters.</div>
        )}
      </Card>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs text-muted">
          {usingMock ? status : `Showing ${pageItems.length ? (page - 1) * PAGE_SIZE + 1 : 0} to ${(page - 1) * PAGE_SIZE + pageItems.length} of ${filtered.length} entries`}
        </span>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            disabled={page === 1}
            className="grid h-8 w-8 place-items-center rounded-lg border border-line text-muted hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Previous page"
          >
            <ChevronLeft size={16} />
          </button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => setPage(pageNumber)}
              className={`grid h-8 w-8 place-items-center rounded-lg text-sm font-semibold ${
                pageNumber === page ? "bg-primary text-white" : "text-muted hover:bg-canvas hover:text-ink"
              }`}
            >
              {pageNumber}
            </button>
          ))}
          <button
            onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
            disabled={page === totalPages}
            className="grid h-8 w-8 place-items-center rounded-lg border border-line text-muted hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Next page"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <SummaryCard icon={TrendingUp} label="MOST ACTIVE HAZARD" value={stats.topHazard} caption="Across all recorded alerts" />
        <SummaryCard icon={Languages} label="TOP DIALECT REACH" value={stats.topDialect} caption={stats.topDialectCaption} />
        <SummaryCard icon={Globe2} label="TOTAL LIVES NOTIFIED" value={stats.totalCalls} caption={`Across ${stats.regionCount} regions`} dark />
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs text-muted">
        <History size={14} /> {status}
      </div>

      <AlertDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </AppLayout>
  );
}
