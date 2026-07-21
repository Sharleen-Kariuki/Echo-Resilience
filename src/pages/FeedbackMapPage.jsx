import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import {
  Filter,
  MapPin,
  CalendarDays,
  ChevronDown,
  Play,
  Pause,
  MoreVertical,
  FileSearch,
  Copy,
} from "lucide-react";
import AppLayout from "../components/layout/AppLayout";
import TopBar from "../components/layout/TopBar";
import Card from "../components/ui/Card";
import Modal from "../components/ui/Modal";
import { api, mockHazardTypes, mockRegions, mockFeedback } from "../lib/api";

const KENYA_CENTER = [0.5, 37.6];

const MARKER_TYPES = {
  priority: { label: "Priority Feedback", color: "var(--color-primary)" },
  critical: { label: "Critical Hazard", color: "var(--color-danger)" },
  resolved: { label: "Resolution Reported", color: "var(--color-success)" },
};

const DATE_RANGES = [
  { id: "7", name: "Last 7 Days" },
  { id: "30", name: "Last 30 Days" },
  { id: "1", name: "Today" },
];

function markerIcon(kind) {
  const color = MARKER_TYPES[kind].color;
  return L.divIcon({
    className: "",
    html: `<span style="
      display:block;width:26px;height:26px;border-radius:9999px;
      background:${color};border:3px solid #fff;
      box-shadow:0 2px 6px rgba(0,0,0,0.35);
    "></span>`,
    iconSize: [26, 26],
    iconAnchor: [13, 13],
    popupAnchor: [0, -14],
  });
}

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
  return item.region?.name ?? item.regionName ?? "Regional";
}

function getHazardName(item) {
  return item.hazardType?.name ?? item.hazardTypeName ?? "Climate Risk";
}

function getSeverity(item) {
  return item.severity ?? item.severityLevel ?? (String(item.status ?? "").toLowerCase() === "resolved" ? "Resolved" : "High");
}

function markerKind(item) {
  const severity = getSeverity(item).toLowerCase();
  if (severity === "resolved") return "resolved";
  if (severity === "critical" || severity === "urgent") return "critical";
  return "priority";
}

// Deterministic per-item offset so multiple reports in one region don't fully overlap.
function jitterCoords(region, id) {
  const angle = ((id * 47) % 360) * (Math.PI / 180);
  const distance = 0.03 + ((id * 13) % 5) * 0.012;
  return [region.latitude + Math.sin(angle) * distance, region.longitude + Math.cos(angle) * distance];
}

function FilterSelect({ value, onChange, options, icon: Icon }) {
  return (
    <div className="relative min-w-44">
      {Icon && <Icon size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`w-full appearance-none rounded-xl border border-line bg-surface py-2.5 pr-9 text-sm font-semibold text-ink outline-none focus:border-primary ${
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

function LogAudio({ src }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="flex items-center gap-2.5">
      <button
        onClick={() => setPlaying((current) => !current)}
        className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary text-white"
        aria-label={playing ? "Pause" : "Play"}
      >
        {playing ? <Pause size={12} /> : <Play size={12} />}
      </button>
      <div className="h-1.5 flex-1 rounded-full bg-line">
        <div className={`h-full rounded-full bg-primary ${playing ? "w-1/3" : "w-0"} transition-all`} />
      </div>
      {src ? (
        <audio src={src} controls className="hidden" />
      ) : (
        <span className="text-xs tabular-nums text-muted">0:14</span>
      )}
    </div>
  );
}

function FeedbackLogItem({ item, onViewDetails }) {
  const kind = markerKind(item);
  const isUrgent = kind === "critical";
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={`rounded-xl border p-4 ${isUrgent ? "border-danger/40 bg-danger-soft/30" : "border-line"}`}>
      <div className="mb-1.5 flex items-start justify-between gap-2">
        <span className="font-bold text-ink">{getRegionName(item)}</span>
        <div className="flex items-center gap-2">
          {isUrgent && <span className="text-xs font-bold tracking-wide text-danger">URGENT</span>}
          <span className="text-xs text-muted">{timeAgo(item.createdAt)}</span>
        </div>
      </div>

      <span className="mb-2 inline-block rounded-md bg-chip px-2 py-0.5 text-[11px] font-bold tracking-wide text-chip-ink">
        {getHazardName(item).toUpperCase()}
      </span>

      <p className="mb-3 text-sm italic leading-snug text-ink/80">
        &ldquo;{item.translationText ?? item.transcriptionText ?? "Community feedback received."}&rdquo;
      </p>

      <div className="flex items-center gap-2">
        <LogAudio src={item.audioFeedbackUrl} />
        <div className="relative shrink-0">
          <button
            onClick={() => setMenuOpen((current) => !current)}
            className="text-muted hover:text-ink"
            aria-label="More options"
          >
            <MoreVertical size={16} />
          </button>
          {menuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 top-full z-20 mt-1 w-44 rounded-lg border border-line bg-surface py-1 shadow-lg">
                <button
                  onClick={() => {
                    onViewDetails(item);
                    setMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-ink hover:bg-canvas"
                >
                  <FileSearch size={14} /> View full report
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(getRegionName(item));
                    setMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-ink hover:bg-canvas"
                >
                  <Copy size={14} /> Copy region name
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function FeedbackMapPage() {
  const [hazards, setHazards] = useState(mockHazardTypes);
  const [regions, setRegions] = useState(mockRegions);
  const [feedback, setFeedback] = useState(mockFeedback);
  const [draft, setDraft] = useState({ hazardTypeId: "", regionId: "", range: "7" });
  const [filters, setFilters] = useState({ hazardTypeId: "", regionId: "", range: "7" });
  const [status, setStatus] = useState("Loading feedback map...");
  const [usingMock, setUsingMock] = useState(false);
  const [detailItem, setDetailItem] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      const [hazardsResult, regionsResult, feedbackResult] = await Promise.all([
        api.getHazardTypes(),
        api.getRegions(),
        api.getFeedback({ page: 1, limit: 100 }),
      ]);

      if (!isMounted) return;

      setHazards(hazardsResult.data.length ? hazardsResult.data : mockHazardTypes);
      setRegions(regionsResult.data.length ? regionsResult.data : mockRegions);
      setFeedback(feedbackResult.data.length ? feedbackResult.data : mockFeedback);
      const anyMock = hazardsResult.usingMock || regionsResult.usingMock || feedbackResult.usingMock;
      setUsingMock(anyMock);
      setStatus(anyMock ? "Backend unavailable - mock feedback map active" : "Synced from /api/feedback");
    }

    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const regionById = useMemo(() => new Map(regions.map((region) => [region.id, region])), [regions]);

  const filtered = useMemo(() => {
    const rangeDays = Number(filters.range);
    const cutoff = Date.now() - rangeDays * 24 * 60 * 60 * 1000;

    return feedback.filter((item) => {
      if (filters.hazardTypeId && String(item.hazardTypeId) !== String(filters.hazardTypeId)) return false;
      if (filters.regionId && String(item.regionId) !== String(filters.regionId)) return false;
      if (new Date(item.createdAt).getTime() < cutoff) return false;
      return true;
    });
  }, [feedback, filters]);

  const markers = useMemo(() => {
    return filtered
      .map((item) => {
        const region = regionById.get(item.regionId);
        if (!region?.latitude || !region?.longitude) return null;
        return { item, position: jitterCoords(region, item.id) };
      })
      .filter(Boolean);
  }, [filtered, regionById]);

  return (
    <AppLayout
      topBar={
        <TopBar
          title="Feedback Map"
          showSearch={false}
          titleExtra={
            <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-bold tracking-wide text-primary">
              LIVE DATA
            </span>
          }
        />
      }
    >
      <Card className="mb-5 flex flex-wrap items-end gap-3 p-4">
        <FilterSelect
          icon={Filter}
          value={draft.hazardTypeId}
          onChange={(value) => setDraft((current) => ({ ...current, hazardTypeId: value }))}
          options={[{ id: "", name: "Hazard Type: All" }, ...hazards]}
        />
        <FilterSelect
          icon={MapPin}
          value={draft.regionId}
          onChange={(value) => setDraft((current) => ({ ...current, regionId: value }))}
          options={[{ id: "", name: "Region: All" }, ...regions]}
        />
        <FilterSelect
          icon={CalendarDays}
          value={draft.range}
          onChange={(value) => setDraft((current) => ({ ...current, range: value }))}
          options={DATE_RANGES}
        />
        <button
          onClick={() => setFilters(draft)}
          className="ml-auto rounded-xl bg-primary px-6 py-2.5 text-sm font-bold tracking-wide text-white hover:brightness-110"
        >
          APPLY FILTERS
        </button>
      </Card>

      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[2fr_1fr]">
        <Card className="relative overflow-hidden p-0">
          <div className="h-[600px] w-full">
            <MapContainer center={KENYA_CENTER} zoom={7} scrollWheelZoom className="h-full w-full">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {markers.map(({ item, position }) => (
                <Marker key={item.id} position={position} icon={markerIcon(markerKind(item))}>
                  <Popup>
                    <div className="text-sm">
                      <div className="font-bold">{getRegionName(item)}</div>
                      <div className="text-xs text-muted">{getHazardName(item)}</div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          <div className="absolute bottom-4 left-4 z-[1000] rounded-xl border border-line bg-surface/95 p-3.5 text-sm shadow-md">
            <div className="mb-2 text-xs font-bold tracking-wide text-muted">MAP LEGEND</div>
            {Object.entries(MARKER_TYPES).map(([key, { label, color }]) => (
              <div key={key} className="mt-1.5 flex items-center gap-2 first:mt-0">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
                {label}
              </div>
            ))}
          </div>
        </Card>

        <Card className="flex max-h-[600px] flex-col p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-extrabold text-ink">Feedback Log</h2>
            <span className="text-xs font-bold tracking-wide text-muted">{filtered.length} REPORTS</span>
          </div>

          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto">
            {filtered.length ? (
              filtered.map((item) => <FeedbackLogItem key={item.id} item={item} onViewDetails={setDetailItem} />)
            ) : (
              <p className="text-sm text-muted">No feedback matches these filters.</p>
            )}
          </div>
        </Card>
      </div>

      <div className="mt-4 text-xs text-muted">{usingMock ? status : null}</div>

      <Modal
        open={Boolean(detailItem)}
        onClose={() => setDetailItem(null)}
        title={detailItem ? getRegionName(detailItem) : ""}
        description={detailItem ? `${getHazardName(detailItem)} · ${timeAgo(detailItem.createdAt)}` : ""}
      >
        {detailItem && (
          <div className="space-y-4">
            <div>
              <div className="mb-1 text-xs font-semibold tracking-wide text-muted">TRANSCRIPTION</div>
              <p className="text-sm italic leading-relaxed text-ink/80">
                &ldquo;{detailItem.transcriptionText ?? detailItem.transcription ?? "Awaiting transcription."}&rdquo;
              </p>
            </div>
            <div>
              <div className="mb-1 text-xs font-semibold tracking-wide text-muted">ENGLISH TRANSLATION</div>
              <p className="text-sm leading-relaxed text-ink">
                &ldquo;{detailItem.translationText ?? detailItem.translation ?? "No translation available yet."}&rdquo;
              </p>
            </div>
            {detailItem.audioFeedbackUrl && (
              <audio controls src={detailItem.audioFeedbackUrl} className="w-full">
                <track kind="captions" />
              </audio>
            )}
          </div>
        )}
      </Modal>
    </AppLayout>
  );
}
