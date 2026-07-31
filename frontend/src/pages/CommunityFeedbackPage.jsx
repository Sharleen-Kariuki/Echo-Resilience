import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  FileText,
  Droplet,
  Waves,
  Thermometer,
  Clock,
  Play,
  Pause,
  CheckCircle2,
  Calendar,
  ChevronDown,
  RefreshCw,
  Map,
} from "lucide-react";
import AppLayout from "../components/layout/AppLayout";
import TopBar from "../components/layout/TopBar";
import Card from "../components/ui/Card";
import Badge, { statusTone } from "../components/ui/Badge";
import { api, mockHazardTypes, mockRegions } from "../lib/api";

const TILE = {
  red: "bg-danger-soft text-danger",
  green: "bg-success-soft text-success",
};

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

function getRegionName(item) {
  return item.region?.name ?? item.regionName ?? "Community Region";
}

function getHazardName(item) {
  return item.hazardType?.name ?? item.hazardTypeName ?? "Climate Risk";
}

function downloadFeedbackCsv(rows) {
  const header = ["ID", "Region", "Hazard Type", "Dialect", "Severity", "Status", "Transcription", "Translation", "Date"];
  const lines = rows.map((row) =>
    [
      row.id,
      getRegionName(row),
      getHazardName(row),
      row.dialect ?? row.dialectHint ?? "",
      getSeverity(row),
      row.status ?? (row.processed ? "processed" : "pending"),
      row.transcriptionText ?? row.transcription ?? "",
      row.translationText ?? row.translation ?? "",
      new Date(row.createdAt ?? Date.now()).toISOString(),
    ]
      .map((value) => `"${String(value).replace(/"/g, '""')}"`)
      .join(","),
  );
  const csv = [header.join(","), ...lines].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `echo-resilience-feedback-report-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

function getSeverity(item) {
  return item.severity ?? item.severityLevel ?? (getHazardName(item).toLowerCase().includes("flood") ? "Critical" : "High");
}

function getIcon(item) {
  const hazard = getHazardName(item).toLowerCase();
  if (hazard.includes("flood") || hazard.includes("rain")) return Waves;
  if (hazard.includes("heat")) return Thermometer;
  return Droplet;
}

function AudioPlayer({ duration = "0:24", progress = 0.35, src }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="flex items-center gap-3 rounded-md bg-canvas p-3">
      <button
        onClick={() => setPlaying((current) => !current)}
        className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary text-white"
        aria-label={playing ? "Pause" : "Play"}
      >
        {playing ? <Pause size={16} /> : <Play size={16} />}
      </button>
      <div className="h-1.5 flex-1 rounded-full bg-line">
        <div className="h-full rounded-full bg-primary" style={{ width: `${progress * 100}%` }} />
      </div>
      {src ? (
        <audio src={src} controls className="h-9 max-w-40">
          <track kind="captions" />
        </audio>
      ) : (
        <span className="text-sm tabular-nums text-muted">{duration}</span>
      )}
    </div>
  );
}

function AvatarGroup({ people }) {
  const colors = ["bg-primary", "bg-success"];
  return (
    <div className="flex -space-x-2">
      {people.map((person, index) => (
        <span
          key={person}
          className={`grid h-7 w-7 place-items-center rounded-full border-2 border-surface text-[11px] font-bold text-white ${colors[index % 2]}`}
        >
          {person}
        </span>
      ))}
    </div>
  );
}

function FeedbackCard({ item, onProcess, onResolve, resolving }) {
  const Icon = getIcon(item);
  const severity = getSeverity(item);
  const isCritical = severity.toLowerCase() === "critical";
  const isResolved = item.status === "resolved";
  const isProcessed = item.processed || item.status === "processed" || isResolved;
  const action = isProcessed
    ? { label: resolving ? "Resolving..." : "Mark as Resolved", icon: CheckCircle2, tone: "success", onClick: () => onResolve(item) }
    : { label: "Process Audio", icon: RefreshCw, tone: "primary", onClick: () => onProcess(item) };
  const ActionIcon = action.icon;
  const actionColor = action.tone === "success" ? "text-success" : "text-primary";
  const assignees = item.assignees ?? (isCritical ? ["JD", "AK"] : []);

  return (
    <Card className="flex flex-col overflow-hidden">
      <div className="flex items-start gap-3 p-5">
        <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-md ${isCritical ? TILE.red : TILE.green}`}>
          <Icon size={20} />
        </div>
        <div className="min-w-0">
          <div className="font-bold text-ink">{getRegionName(item)}</div>
          <div className="mt-0.5 flex items-center gap-1.5 text-xs text-muted">
            <Clock size={13} /> {timeAgo(item.createdAt)} - {item.dialect ?? item.dialectHint ?? "Local dialect"}
          </div>
        </div>
        <div className="ml-auto">
          <Badge tone={statusTone(severity)}>{severity.toUpperCase()}</Badge>
        </div>
      </div>

      <div className="flex-1 px-5">
        <AudioPlayer src={item.audioFeedbackUrl} />

        <div className="grid grid-cols-2 gap-4 py-4">
          <div>
            <div className="mb-1.5 text-[11px] font-semibold tracking-wide text-muted">
              AI TRANSCRIPTION
            </div>
            <p className="text-sm italic leading-relaxed text-ink/70">
              &ldquo;{item.transcriptionText ?? item.transcription ?? "Awaiting transcription."}&rdquo;
            </p>
          </div>
          <div>
            <div className="mb-1.5 text-[11px] font-semibold tracking-wide text-muted">
              ENGLISH TRANSLATION
            </div>
            <p className="text-sm leading-relaxed text-ink">
              &ldquo;{item.translationText ?? item.translation ?? "No translation available yet."}&rdquo;
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pb-4">
          {[getHazardName(item)].filter(Boolean).map((tag) => (
            <span key={tag} className="rounded-md bg-chip px-2.5 py-1 text-xs font-medium text-chip-ink">
              #{String(tag).replace(/\s+/g, "_").toLowerCase()}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-line bg-canvas/60 px-5 py-3">
        {isResolved ? (
          <span className="flex items-center gap-2 text-sm font-semibold text-success">
            <CheckCircle2 size={16} /> Resolved
          </span>
        ) : (
          <button
            onClick={action.onClick}
            disabled={resolving}
            className={`flex items-center gap-2 text-sm font-semibold ${actionColor} hover:underline disabled:cursor-not-allowed disabled:opacity-60`}
          >
            <ActionIcon size={16} /> {action.label}
          </button>
        )}
        {assignees.length > 0 ? <AvatarGroup people={assignees} /> : <span className="text-sm italic text-muted">No one assigned</span>}
      </div>
    </Card>
  );
}

function HotspotCard({ feedback, onOpenMap }) {
  const criticalCount = feedback.filter((item) => getSeverity(item).toLowerCase() === "critical").length;
  const resolvedCount = feedback.filter((item) => String(item.status).toLowerCase() === "resolved").length;

  return (
    <Card className="flex flex-col p-5">
      <div className="font-display text-lg font-bold text-ink">Hotspot summary</div>
      <div className="text-sm text-muted">Critical and resolved reports across all regions</div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="border border-line p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-danger">
            <span className="h-2 w-2 rounded-full bg-danger" /> Critical
          </div>
          <div className="mt-1 font-display text-2xl font-bold text-ink">{criticalCount}</div>
        </div>
        <div className="border border-line p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-success">
            <span className="h-2 w-2 rounded-full bg-success" /> Resolved
          </div>
          <div className="mt-1 font-display text-2xl font-bold text-ink">{resolvedCount}</div>
        </div>
      </div>

      <button
        onClick={onOpenMap}
        className="mt-4 flex items-center justify-center gap-2 rounded-md border border-line py-2.5 text-sm font-semibold text-primary hover:bg-canvas"
      >
        <Map size={16} /> View on feedback map
      </button>
    </Card>
  );
}

function FilterBar({ filters, setFilters, regions, hazards }) {
  return (
    <Card className="mb-6 flex flex-wrap items-end gap-5 p-5">
      <FilterSelect
        label="Region"
        value={filters.regionId}
        onChange={(regionId) => setFilters((current) => ({ ...current, regionId }))}
        options={[{ id: "", name: "All Regions" }, ...regions]}
      />
      <FilterSelect
        label="Hazard Type"
        value={filters.hazardTypeId}
        onChange={(hazardTypeId) => setFilters((current) => ({ ...current, hazardTypeId }))}
        options={[{ id: "", name: "All Hazards" }, ...hazards]}
      />

      <div>
        <div className="mb-2 text-xs font-semibold tracking-wide text-muted">Severity</div>
        <div className="flex gap-2">
          {["Critical", "High", "All"].map((severity) => (
            <button
              key={severity}
              onClick={() => setFilters((current) => ({ ...current, severity }))}
              className={`rounded-lg border px-4 py-2 text-sm font-semibold transition-colors ${
                filters.severity === severity
                  ? "border-primary bg-primary text-white"
                  : "border-line bg-surface text-muted hover:text-ink"
              }`}
            >
              {severity}
            </button>
          ))}
        </div>
      </div>

      <FilterSelect
        label="Date Range"
        value={filters.range}
        onChange={(range) => setFilters((current) => ({ ...current, range }))}
        options={[
          { id: "7", name: "Last 7 Days" },
          { id: "30", name: "Last 30 Days" },
          { id: "1", name: "Today" },
        ]}
        icon={Calendar}
      />
    </Card>
  );
}

function FilterSelect({ label, options, value, onChange, icon: Icon }) {
  return (
    <label className="block min-w-44">
      <span className="mb-2 block text-xs font-semibold tracking-wide text-muted">{label}</span>
      <div className="relative">
        {Icon && (
          <Icon size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
        )}
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={`w-full appearance-none rounded-md border border-line bg-surface py-2.5 pr-9 text-[15px] font-semibold text-ink outline-none focus:border-primary ${
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
    </label>
  );
}

export default function CommunityFeedbackPage() {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState([]);
  const [regions, setRegions] = useState(mockRegions);
  const [hazards, setHazards] = useState(mockHazardTypes);
  const [filters, setFilters] = useState({ regionId: "", hazardTypeId: "", severity: "All", range: "7" });
  const [status, setStatus] = useState("Loading feedback...");
  const [usingMock, setUsingMock] = useState(false);
  const [resolvingId, setResolvingId] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadLists() {
      const [regionsResult, hazardsResult] = await Promise.all([api.getRegions(), api.getHazardTypes()]);
      if (!isMounted) return;
      setRegions(regionsResult.data.length ? regionsResult.data : mockRegions);
      setHazards(hazardsResult.data.length ? hazardsResult.data : mockHazardTypes);
      setUsingMock(regionsResult.usingMock || hazardsResult.usingMock);
    }

    loadLists();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadFeedback() {
      setStatus("Refreshing feedback...");
      const result = await api.getFeedback({
        regionId: filters.regionId,
        hazardTypeId: filters.hazardTypeId,
        page: 1,
        limit: 20,
      });

      if (!isMounted) return;

      const filteredData =
        filters.severity === "All"
          ? result.data
          : result.data.filter((item) => getSeverity(item).toLowerCase() === filters.severity.toLowerCase());

      setFeedback(filteredData);
      setUsingMock((current) => current || result.usingMock);
      setStatus(result.usingMock ? "Showing sample data" : "Up to date");
    }

    loadFeedback();
    return () => {
      isMounted = false;
    };
  }, [filters]);

  async function handleProcess(item) {
    setStatus(`Processing feedback #${item.id}...`);
    try {
      const result = await api.processFeedback(item.id, {
        audio_local_path: item.audioFeedbackUrl,
        dialect_hint: item.dialect,
      });
      const updated = result?.feedbackLog;
      setFeedback((current) =>
        current.map((row) => (row.id === item.id ? { ...row, ...updated, status: "processed" } : row)),
      );
      setStatus(`Processed feedback #${item.id}`);
    } catch (error) {
      console.error(error);
      setUsingMock(true);
      setFeedback((current) => current.map((row) => (row.id === item.id ? { ...row, status: "processed" } : row)));
      setStatus("Could not process this feedback - marked processed locally");
    }
  }

  async function handleResolve(item) {
    setResolvingId(item.id);
    try {
      await api.updateFeedback(item.id, { status: "resolved" });
      setStatus(`Marked feedback #${item.id} as resolved`);
    } catch (error) {
      console.error(error);
      setStatus("Could not update this feedback online - marked resolved locally");
    } finally {
      setFeedback((current) => current.map((row) => (row.id === item.id ? { ...row, status: "resolved" } : row)));
      setResolvingId(null);
    }
  }

  const liveReports = useMemo(() => feedback.length, [feedback]);

  const actions = (
    <>
      <button className="rounded-lg p-1.5 text-ink hover:bg-surface" aria-label="Notifications">
        <Bell size={20} />
      </button>
      <button
        onClick={() => downloadFeedbackCsv(feedback)}
        className="flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 font-semibold text-white hover:brightness-110"
      >
        <FileText size={18} /> Export Report
      </button>
    </>
  );

  return (
    <AppLayout
      topBar={<TopBar searchPlaceholder="Search feedback records..." actions={actions} />}
    >
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-ink">
            Community Feedback
          </h1>
          <p className="mt-1 text-muted">
            {usingMock ? "Showing sample data until live records are available." : status}
          </p>
        </div>
        <span className="inline-flex items-center gap-2 border border-success/25 bg-success-soft px-4 py-2 text-sm font-semibold text-success">
          <span className="h-2 w-2 rounded-full bg-success" />
          Live Reports: <span className="font-bold">{liveReports} Today</span>
        </span>
      </div>

      <FilterBar filters={filters} setFilters={setFilters} regions={regions} hazards={hazards} />

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
        {feedback.map((item) => (
          <FeedbackCard
            key={item.id}
            item={item}
            onProcess={handleProcess}
            onResolve={handleResolve}
            resolving={resolvingId === item.id}
          />
        ))}
        <HotspotCard feedback={feedback} onOpenMap={() => navigate("/feedback-map")} />
      </div>
    </AppLayout>
  );
}
