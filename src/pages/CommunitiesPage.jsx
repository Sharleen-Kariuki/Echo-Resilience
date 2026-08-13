import { useEffect, useMemo, useState } from "react";
import {
  Users,
  MapPin,
  Phone,
  Languages,
  Building2,
  Plus,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  History,
  Trash2,
  Loader2,
  X,
} from "lucide-react";
import AppLayout from "../components/layout/AppLayout";
import TopBar from "../components/layout/TopBar";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Modal from "../components/ui/Modal";
import { api } from "../lib/api";

const PAGE_SIZE = 6;
const SOURCE_OPTIONS = ["self-registered", "admin-added"];
const STATUS_OPTIONS = ["active", "opted-out"];

// Same fixed list ClimateAlertsPage uses (backend/src/routes/dialects.js). A
// member's language is not free text: it decides which translated and
// synthesised version of an alert they receive, so it has to be one the
// pipeline can actually produce.
const SUPPORTED_DIALECTS = ["Somali", "Oromo", "Amharic", "Swahili", "Turkana"];

// The granularity below a region — what "the exact community they come from"
// means on the ground. Regions are for dispatch targeting; these are for
// knowing who is actually inside one.
const COMMUNITY_TYPES = ["village", "estate", "ward", "sub-location", "settlement", "camp"];

const MEMBER_COLS = "grid grid-cols-[1.5fr_1.4fr_0.9fr_1.2fr_0.8fr_0.7fr] gap-4 items-center";
const COMMUNITY_COLS = "grid grid-cols-[1.4fr_1.1fr_1fr_1fr_1fr_0.9fr_0.8fr] gap-3 items-center";

function formatDate(value) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString(undefined, { month: "short", day: "2-digit", year: "numeric" });
}

function statusTone(status) {
  return String(status).toLowerCase() === "active" ? "green" : "red";
}

// Create and list routes don't return identically shaped records, so read
// defensively rather than assuming one field name.
function getRecordValue(payload, keys) {
  const sources = [payload, payload?.data, payload?.member, payload?.community];
  for (const key of keys) {
    for (const source of sources) {
      if (source && source[key] !== undefined && source[key] !== null) return source[key];
    }
  }
  return undefined;
}

// Field staff enter numbers four different ways (0712…, 712…, 254712…,
// +254712…). Store one canonical form so the same person can't be registered
// twice under two spellings, and so the SMS dispatcher gets something it can
// send to without further parsing.
function normalizePhone(raw) {
  const trimmed = String(raw ?? "").replace(/[^\d+]/g, "");
  if (!trimmed) return "";
  if (trimmed.startsWith("+")) return trimmed;
  if (trimmed.startsWith("254")) return `+${trimmed}`;
  if (trimmed.startsWith("0")) return `+254${trimmed.slice(1)}`;
  if (trimmed.length === 9) return `+254${trimmed}`;
  return `+${trimmed}`;
}

function isValidPhone(raw) {
  return /^\+\d{9,15}$/.test(normalizePhone(raw));
}

function formatPhone(raw) {
  const value = normalizePhone(raw);
  if (!value) return "—";
  return value.replace(/^(\+\d{3})(\d{3})(\d{3})(\d+)$/, "$1 $2 $3 $4");
}

// Same intent as ClimateAlertsPage's friendlyError: a raw fetch or Prisma
// message reads as a crash to a non-technical admin. Translate the two cases
// that actually come up on this page into something actionable.
function friendlyError(message) {
  if (!message) return "unknown error";
  if (/unique|duplicate|already exists/i.test(message)) {
    return "That phone number is already on the register. Search for it before adding a duplicate.";
  }
  if (/failed to fetch|networkerror|network/i.test(message)) {
    return "No connection to the server. The record is kept on this device — reload once you're back online to resync.";
  }
  return message;
}

function regionNameOf(item, regions) {
  return (
    regions.find((region) => String(region.id) === String(item.regionId))?.name ??
    item.region?.name ??
    item.regionName ??
    "—"
  );
}

function communityNameOf(member, communities) {
  return (
    communities.find((community) => String(community.id) === String(member.communityId))?.name ??
    member.communityName ??
    "Unassigned"
  );
}

function Select({
  label,
  options,
  value,
  onChange,
  getValue = (item) => item,
  getLabel = (item) => item,
  emptyLabel = "None available",
  size = "md",
}) {
  const sizing = size === "sm" ? "px-3.5 py-2.5 text-sm" : "px-4 py-3 text-[15px]";
  return (
    <label className="block">
      {label && <span className="mb-2 block text-xs font-semibold tracking-wide text-muted">{label}</span>}
      <div className="relative">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          disabled={options.length === 0}
          className={`w-full appearance-none rounded-md border border-line bg-canvas ${sizing} pr-9 font-semibold text-ink outline-none focus:border-primary disabled:cursor-not-allowed disabled:opacity-60`}
        >
          {options.length === 0 && <option value="">{emptyLabel}</option>}
          {options.map((option) => (
            <option key={getValue(option)} value={getValue(option)}>
              {getLabel(option)}
            </option>
          ))}
        </select>
        <ChevronDown size={18} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted" />
      </div>
    </label>
  );
}

const inputClass =
  "w-full rounded-md border border-line bg-canvas px-4 py-3 text-[15px] text-ink outline-none placeholder:text-muted focus:border-primary";

function TextField({ label, hint, ...props }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold tracking-wide text-muted">{label}</span>
      <input className={inputClass} {...props} />
      {hint && <span className="mt-1.5 block text-[11px] text-muted">{hint}</span>}
    </label>
  );
}

// Same switcher treatment as the dialect pills in ClimateAlertsPage.
function PillTabs({ value, onChange, options, disabled = false }) {
  return (
    <div className="flex flex-wrap gap-1 border border-line bg-canvas p-1">
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          onClick={() => onChange(option.id)}
          disabled={disabled}
          className={`px-3 py-1 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
            value === option.id ? "bg-surface text-primary" : "text-muted hover:text-ink"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

function StatusDonut({ active, optedOut }) {
  const total = Math.max(1, active + optedOut);
  const activePct = Math.round((active / total) * 100);
  const circumference = 2 * Math.PI * 30;
  const activeLength = (activePct / 100) * circumference;

  return (
    <div className="flex items-center gap-4">
      <svg width="76" height="76" viewBox="0 0 76 76" className="shrink-0 -rotate-90">
        <circle cx="38" cy="38" r="30" fill="none" stroke="var(--color-chip)" strokeWidth="10" />
        <circle
          cx="38"
          cy="38"
          r="30"
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="10"
          strokeDasharray={`${activeLength} ${circumference}`}
          strokeLinecap="round"
        />
      </svg>
      <div className="space-y-1.5 text-sm">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-primary" /> Active <span className="font-bold">{activePct}%</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-chip-ink" /> Opted-out{" "}
          <span className="font-bold">{100 - activePct}%</span>
        </div>
      </div>
    </div>
  );
}

function BreakdownBars({ entries, total, emptyLabel }) {
  if (!entries.length) return <p className="text-sm text-muted">{emptyLabel}</p>;
  const max = Math.max(...entries.map(([, count]) => count), 1);

  return (
    <div className="space-y-2.5">
      {entries.map(([label, count]) => (
        <div key={label}>
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="truncate font-semibold text-ink">{label}</span>
            <span className="shrink-0 pl-2 text-muted">
              {count} · {Math.round((count / Math.max(1, total)) * 100)}%
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-line">
            <div className="h-full rounded-full bg-primary" style={{ width: `${(count / max) * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * The community-of-origin panel. Either attach the member to a community that
 * already exists, or register the exact one they name right here — otherwise
 * everyone from an unlisted village silently ends up filed under a
 * region-level catch-all, and dispatch loses the granularity this was meant
 * to gain. Styled after the AFFECTED REGION picker in ClimateAlertsPage.
 */
function CommunityOriginPanel({ regions, communities, value, onChange }) {
  const { mode, communityId, draft } = value;
  const selected = communities.find((item) => String(item.id) === String(communityId));

  const setDraftField = (field, fieldValue) => onChange({ ...value, draft: { ...draft, [field]: fieldValue } });

  return (
    <div>
      <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
        <span className="flex items-center gap-2 text-xs font-semibold tracking-wide text-muted">
          <Building2 size={14} className="text-primary" /> COMMUNITY OF ORIGIN
        </span>
        <PillTabs
          value={mode}
          onChange={(next) => onChange({ ...value, mode: next })}
          options={[
            { id: "existing", label: "Existing" },
            { id: "new", label: "Register new" },
          ]}
        />
      </div>

      <div className="rounded-md border border-line p-3">
        {mode === "existing" ? (
          <div className="flex flex-wrap items-center gap-2">
            {selected && (
              <span className="flex items-center gap-2 rounded-sm bg-primary px-3 py-1.5 text-sm font-semibold text-white">
                {selected.name}
                <button
                  type="button"
                  onClick={() => onChange({ ...value, communityId: "" })}
                  aria-label={`Remove ${selected.name}`}
                >
                  <X size={14} />
                </button>
              </span>
            )}
            <select
              value=""
              onChange={(event) => onChange({ ...value, communityId: event.target.value })}
              className="rounded-lg border border-line bg-surface px-2 py-1 text-sm font-semibold text-primary outline-none"
              aria-label="Choose community"
            >
              <option value="">{selected ? "Change community" : "Choose community"}</option>
              {communities.map((community) => (
                <option key={community.id} value={community.id}>
                  {community.name}
                  {community.region?.name ? ` — ${community.region.name}` : ""}
                </option>
              ))}
            </select>
            {!selected && <span className="text-xs text-muted">Not listed? Switch to “Register new”.</span>}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <TextField
              label="COMMUNITY NAME"
              value={draft.name}
              onChange={(event) => setDraftField("name", event.target.value)}
              placeholder="e.g. Laini Saba Youth Group"
            />
            <Select
              label="TYPE"
              value={draft.type}
              onChange={(next) => setDraftField("type", next)}
              options={COMMUNITY_TYPES}
            />
            <Select
              label="REGION"
              value={draft.regionId}
              onChange={(next) => setDraftField("regionId", next)}
              options={regions}
              getValue={(region) => region.id}
              getLabel={(region) => region.name}
              emptyLabel="No regions loaded"
            />
            <TextField
              label="LEADER CONTACT"
              value={draft.leaderPhone}
              onChange={(event) => setDraftField("leaderPhone", event.target.value)}
              placeholder="Optional"
            />
            <p className="col-span-2 text-[11px] text-muted">
              Created when you save the member, and on the Communities tab straight after.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function RegisterMemberModal({ open, onClose, regions, communities, dialects, onCreated }) {
  const emptyOrigin = {
    mode: "existing",
    communityId: "",
    draft: { name: "", type: COMMUNITY_TYPES[0], regionId: "", leaderPhone: "" },
  };

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [language, setLanguage] = useState(dialects[0] ?? "");
  const [regionId, setRegionId] = useState("");
  const [locality, setLocality] = useState("");
  const [source, setSource] = useState(SOURCE_OPTIONS[1]);
  const [status, setStatus] = useState(STATUS_OPTIONS[0]);
  const [origin, setOrigin] = useState(emptyOrigin);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    setRegionId(regions[0]?.id ?? "");
    setLanguage(dialects[0] ?? "");
    setOrigin(emptyOrigin);
    setError("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, regions, dialects]);

  async function handleSubmit(event) {
    event.preventDefault();

    const problem =
      (!fullName.trim() && "Enter the member's name.") ||
      (!isValidPhone(phone) && "Enter a reachable phone number, e.g. 0712 345 678.") ||
      (!regionId && "Select the region this member is in.") ||
      (origin.mode === "existing" &&
        !origin.communityId &&
        "Choose the community they come from, or register a new one.") ||
      (origin.mode === "new" && !origin.draft.name.trim() && "A new community needs a name.") ||
      (origin.mode === "new" && !origin.draft.regionId && "A new community needs a region.");

    if (problem) {
      setError(problem);
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      await onCreated({
        fullName: fullName.trim(),
        phone: normalizePhone(phone),
        language,
        regionId: Number(regionId),
        locality: locality.trim(),
        source,
        status,
        origin,
      });
      setFullName("");
      setPhone("");
      setLocality("");
      setOrigin(emptyOrigin);
      onClose();
    } catch (err) {
      console.error(err);
      setError(friendlyError(err.message));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Register Member"
      description="Who they are, how to reach them, and exactly where they come from."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <TextField
            label="FULL NAME"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            placeholder="e.g. Amina Wanjiru"
          />
          <TextField
            label="PHONE NUMBER"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="0712 345 678"
            inputMode="tel"
            hint={phone && isValidPhone(phone) ? `Saved as ${normalizePhone(phone)}` : "Alerts are sent to this number."}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Select
            label="LANGUAGE SPOKEN"
            value={language}
            onChange={setLanguage}
            options={dialects}
            emptyLabel="No languages loaded"
          />
          <Select
            label="REGION"
            value={regionId}
            onChange={setRegionId}
            options={regions}
            getValue={(region) => region.id}
            getLabel={(region) => region.name}
            emptyLabel="No regions loaded"
          />
        </div>

        <TextField
          label="LOCATION"
          value={locality}
          onChange={(event) => setLocality(event.target.value)}
          placeholder="e.g. Laini Saba, Kibera"
          hint="Ward, estate, or village — as precise as they gave it."
        />

        <CommunityOriginPanel regions={regions} communities={communities} value={origin} onChange={setOrigin} />

        <div className="grid grid-cols-2 gap-4">
          <Select label="SOURCE" value={source} onChange={setSource} options={SOURCE_OPTIONS} />
          <Select label="STATUS" value={status} onChange={setStatus} options={STATUS_OPTIONS} />
        </div>

        {error && <p className="text-sm text-danger">{error}</p>}

        <div className="flex justify-end gap-3 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-line px-5 py-2.5 text-sm font-semibold text-muted hover:text-ink"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting && <Loader2 size={15} className="animate-spin" />}
            {submitting ? "Saving..." : "Register Member"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

function AddCommunityModal({ open, onClose, regions, onCreated }) {
  const [name, setName] = useState("");
  const [regionId, setRegionId] = useState("");
  const [type, setType] = useState(COMMUNITY_TYPES[0]);
  const [source, setSource] = useState(SOURCE_OPTIONS[0]);
  const [status, setStatus] = useState(STATUS_OPTIONS[0]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) setRegionId(regions[0]?.id ?? "");
  }, [open, regions]);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!name.trim() || !regionId) {
      setError("A community needs a name and a region.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      await onCreated({ name: name.trim(), regionId: Number(regionId), type, source, status });
      setName("");
      onClose();
    } catch (err) {
      console.error(err);
      setError(friendlyError(err.message));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add Community"
      description="Register a community group and the region it sits in."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <TextField
          label="COMMUNITY NAME"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="e.g. Kibera Relief Network"
          autoFocus
        />
        <div className="grid grid-cols-2 gap-4">
          <Select
            label="REGION"
            value={regionId}
            onChange={setRegionId}
            options={regions}
            getValue={(region) => region.id}
            getLabel={(region) => region.name}
            emptyLabel="No regions loaded"
          />
          <Select label="TYPE" value={type} onChange={setType} options={COMMUNITY_TYPES} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Select label="SOURCE" value={source} onChange={setSource} options={SOURCE_OPTIONS} />
          <Select label="STATUS" value={status} onChange={setStatus} options={STATUS_OPTIONS} />
        </div>

        {error && <p className="text-sm text-danger">{error}</p>}

        <div className="flex justify-end gap-3 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-line px-5 py-2.5 text-sm font-semibold text-muted hover:text-ink"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting && <Loader2 size={15} className="animate-spin" />}
            {submitting ? "Saving..." : "Add Community"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

function AddRegionModal({ open, onClose, onCreated }) {
  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    if (!name.trim()) {
      setError("Enter a region name.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      await onCreated({
        name: name.trim(),
        latitude: latitude ? Number(latitude) : undefined,
        longitude: longitude ? Number(longitude) : undefined,
      });
      setName("");
      setLatitude("");
      setLongitude("");
      onClose();
    } catch (err) {
      console.error(err);
      setError(friendlyError(err.message));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add Region"
      description="New regions become available for alerts, communities, and the feedback map."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <TextField
          label="REGION NAME"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="e.g. Turkana Basin"
          autoFocus
        />
        <div className="grid grid-cols-2 gap-4">
          <TextField
            label="LATITUDE"
            value={latitude}
            onChange={(event) => setLatitude(event.target.value)}
            placeholder="Optional — e.g. 3.1167"
          />
          <TextField
            label="LONGITUDE"
            value={longitude}
            onChange={(event) => setLongitude(event.target.value)}
            placeholder="Optional — e.g. 35.6"
          />
        </div>
        <p className="text-xs text-muted">Coordinates place this region's pin on the Feedback Map.</p>

        {error && <p className="text-sm text-danger">{error}</p>}

        <div className="flex justify-end gap-3 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-line px-5 py-2.5 text-sm font-semibold text-muted hover:text-ink"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting && <Loader2 size={15} className="animate-spin" />}
            {submitting ? "Saving..." : "Add Region"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default function CommunitiesPage() {
  const [tab, setTab] = useState("members");
  const [breakdown, setBreakdown] = useState("language");

  const [members, setMembers] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [regions, setRegions] = useState([]);
  const [dialects, setDialects] = useState(SUPPORTED_DIALECTS);

  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);

  const [status, setStatus] = useState("Loading register...");
  const [loadError, setLoadError] = useState(null);
  const [memberModalOpen, setMemberModalOpen] = useState(false);
  const [communityModalOpen, setCommunityModalOpen] = useState(false);
  const [regionModalOpen, setRegionModalOpen] = useState(false);
  const [busyId, setBusyId] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadAll() {
      const [membersResult, communitiesResult, regionsResult, dialectsResult] = await Promise.all([
        api.getMembers ? api.getMembers() : Promise.resolve({ data: [], usingMock: true, unwired: true }),
        api.getCommunities(),
        api.getRegions(),
        api.getDialects(),
      ]);

      if (!isMounted) return;

      // Offline samples make the register usable during UI development. The
      // availability message below explicitly distinguishes them from live
      // recipient records so they cannot be mistaken for dispatch coverage.
      setMembers(membersResult.data);
      // Communities and regions have representative local data for demo and
      // offline development. Keep it visible, but retain the availability
      // warning below so it is never mistaken for live backend data.
      setCommunities(communitiesResult.data);
      setRegions(regionsResult.data);

      // Dialects are safe to fall back on: the constant mirrors what the
      // backend advertises, and this list only ever reflects "which languages
      // the pipeline supports".
      setDialects(dialectsResult.data?.length ? dialectsResult.data : SUPPORTED_DIALECTS);

      const failed = [
        membersResult.unwired ? "member records (GET /api/members isn't wired up yet)" : null,
        membersResult.usingMock && !membersResult.unwired ? "member records" : null,
        communitiesResult.usingMock ? "communities" : null,
        regionsResult.usingMock ? "regions" : null,
      ].filter(Boolean);

      setLoadError(failed.length ? `Could not load live ${failed.join(", ")}. Sample data may be displayed.` : null);
      setStatus(failed.length ? "Showing sample data where live records are unavailable" : "Up to date");
    }

    loadAll().catch((error) => {
      if (!isMounted) return;
      setLoadError(`Could not load the register: ${friendlyError(error.message)}`);
      setStatus("Load failed");
    });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setPage(1);
  }, [tab, search, regionFilter, languageFilter, statusFilter]);

  const filteredMembers = useMemo(() => {
    return members.filter((item) => {
      if (regionFilter && String(item.regionId ?? item.region?.id) !== String(regionFilter)) return false;
      if (statusFilter && String(item.status).toLowerCase() !== statusFilter) return false;
      if (languageFilter && String(item.language).toLowerCase() !== languageFilter.toLowerCase()) return false;
      if (search) {
        // Include the normalized number so "0712…" still finds a "+254712…" record.
        const haystack = [
          item.fullName,
          item.phone,
          normalizePhone(item.phone),
          item.language,
          item.locality,
          communityNameOf(item, communities),
          regionNameOf(item, regions),
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(search.toLowerCase())) return false;
      }
      return true;
    });
  }, [members, regionFilter, statusFilter, languageFilter, search, communities, regions]);

  const filteredCommunities = useMemo(() => {
    return communities.filter((item) => {
      if (regionFilter && String(item.region?.id ?? item.regionId) !== String(regionFilter)) return false;
      if (statusFilter && String(item.status).toLowerCase() !== statusFilter) return false;
      if (search && !`${item.name} ${item.region?.name ?? ""}`.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [communities, regionFilter, statusFilter, search]);

  const isMembers = tab === "members";
  const filtered = isMembers ? filteredMembers : filteredCommunities;
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const stats = useMemo(() => {
    const tally = (list, key) =>
      Object.entries(
        list.reduce((acc, item) => {
          const value = key(item) || "Unrecorded";
          acc[value] = (acc[value] ?? 0) + 1;
          return acc;
        }, {}),
      ).sort((a, b) => b[1] - a[1]);

    const activeMembers = members.filter((item) => String(item.status).toLowerCase() === "active").length;
    const activeCommunities = communities.filter((item) => String(item.status).toLowerCase() === "active").length;

    return {
      totalMembers: members.length,
      reachable: members.filter((item) => isValidPhone(item.phone)).length,
      activeMembers,
      optedOutMembers: members.length - activeMembers,
      byLanguage: tally(members, (item) => item.language),
      byLocation: tally(members, (item) => regionNameOf(item, regions)),
      totalRegistered: communities.reduce((sum, item) => sum + Number(item.totalRegistered ?? 0), 0),
      activeCommunities,
      optedOutCommunities: communities.length - activeCommunities,
    };
  }, [members, communities, regions]);

  const languageOptions = useMemo(
    () => [...new Set([...members.map((item) => item.language).filter(Boolean), ...dialects])],
    [members, dialects],
  );

  function clearFilters() {
    setSearch("");
    setRegionFilter("");
    setLanguageFilter("");
    setStatusFilter("");
  }

  async function handleCreateCommunity(payload) {
    try {
      const created = await api.createCommunity(payload);
      const record = {
        ...created,
        region: regions.find((region) => region.id === payload.regionId) ?? { name: "Region" },
      };
      setCommunities((current) => [record, ...current]);
      setStatus(`Added ${payload.name}`);
      return record;
    } catch (error) {
      // Keep it on screen so the admin doesn't lose what they typed, but say
      // plainly that it hasn't reached the server.
      const record = {
        id: `local-${Date.now()}`,
        ...payload,
        region: regions.find((region) => region.id === payload.regionId) ?? { name: "Region" },
        registrationDate: new Date().toISOString(),
        unsynced: true,
      };
      setCommunities((current) => [record, ...current]);
      setStatus(`${payload.name} is on this device only — not yet on the server`);
      throw error;
    }
  }

  async function handleCreateMember({ origin, ...payload }) {
    let communityId = origin.communityId;
    let communityName = communities.find((item) => String(item.id) === String(origin.communityId))?.name ?? "";

    if (origin.mode === "new") {
      communityName = origin.draft.name.trim();
      const created = await handleCreateCommunity({
        name: communityName,
        regionId: Number(origin.draft.regionId),
        type: origin.draft.type,
        leaderPhone: origin.draft.leaderPhone ? normalizePhone(origin.draft.leaderPhone) : undefined,
        source: "admin-added",
        status: "active",
      });
      communityId = getRecordValue(created, ["id"]);
    }

    const local = {
      id: `local-${Date.now()}`,
      ...payload,
      communityId,
      communityName,
      regionName: regions.find((region) => String(region.id) === String(payload.regionId))?.name,
      registrationDate: new Date().toISOString(),
    };

    if (!api.createMember) {
      setMembers((current) => [{ ...local, unsynced: true }, ...current]);
      setStatus(`${payload.fullName} is on this device only — POST /api/members isn't wired up yet`);
      return;
    }

    try {
      const created = await api.createMember({ ...payload, communityId });
      setMembers((current) => [{ ...local, ...(created?.data ?? created ?? {}) }, ...current]);
      setStatus(`Registered ${payload.fullName}`);
    } catch (error) {
      setMembers((current) => [{ ...local, unsynced: true }, ...current]);
      throw error;
    }
  }

  async function handleCreateRegion(payload) {
    try {
      const created = await api.createRegion(payload);
      setRegions((current) => [...current, created]);
      setStatus(`Added ${payload.name}`);
    } catch (error) {
      setRegions((current) => [
        ...current,
        { id: `local-${Date.now()}`, totalRegistered: 0, ...payload, unsynced: true },
      ]);
      setStatus(`${payload.name} is on this device only — not yet on the server`);
      throw error;
    }
  }

  async function handleDelete(item) {
    const label = isMembers ? item.fullName : item.name;
    if (!window.confirm(`Remove "${label}" from the register? This can't be undone.`)) return;

    setBusyId(item.id);
    try {
      if (isMembers) {
        if (api.deleteMember) await api.deleteMember(item.id);
      } else {
        await api.deleteCommunity(item.id);
      }
      setStatus(`Removed ${label}`);
    } catch (error) {
      console.error(error);
      setStatus(`Removed ${label} here, but the server rejected it: ${friendlyError(error.message)}`);
    } finally {
      (isMembers ? setMembers : setCommunities)((current) => current.filter((row) => row.id !== item.id));
      setBusyId(null);
    }
  }

  async function handleReactivate(item) {
    setBusyId(item.id);
    const setter = isMembers ? setMembers : setCommunities;
    setter((current) => current.map((row) => (row.id === item.id ? { ...row, status: "active" } : row)));
    try {
      if (isMembers) {
        if (api.updateMember) await api.updateMember(item.id, { status: "active" });
      } else {
        await api.updateCommunity(item.id, { status: "active" });
      }
      setStatus(`Reactivated ${isMembers ? item.fullName : item.name}`);
    } catch (error) {
      console.error(error);
      setStatus(`Could not reactivate: ${friendlyError(error.message)}`);
    } finally {
      setBusyId(null);
    }
  }

  const actions = (
    <button
      onClick={() => (isMembers ? setMemberModalOpen(true) : setCommunityModalOpen(true))}
      className="flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 font-semibold text-white hover:brightness-110"
    >
      <Plus size={18} /> {isMembers ? "Register Member" : "Add Community"}
    </button>
  );

  const breakdownEntries = breakdown === "language" ? stats.byLanguage : stats.byLocation;

  return (
    <AppLayout topBar={<TopBar title="Communities" showSearch={false} actions={actions} />}>
      {loadError && (
        <div className="mb-6 rounded-md border border-danger/40 bg-danger-soft p-4 text-sm text-danger">{loadError}</div>
      )}

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <PillTabs
          value={tab}
          onChange={setTab}
          options={[
            { id: "members", label: `Members (${members.length})` },
            { id: "communities", label: `Communities (${communities.length})` },
          ]}
        />
        <button
          onClick={() => setRegionModalOpen(true)}
          className="flex items-center gap-2 rounded-md border border-primary px-5 py-2.5 text-sm font-semibold text-primary hover:bg-primary-soft/40"
        >
          <Plus size={16} /> Add Region
        </button>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Card className="p-6">
          <span className="mb-3 flex items-center gap-2 text-xs font-semibold tracking-wide text-muted">
            <Users size={16} className="text-primary" /> {isMembers ? "TOTAL MEMBERS" : "TOTAL REGISTERED"}
          </span>
          <p className="font-display text-3xl font-bold text-primary">
            {(isMembers ? stats.totalMembers : stats.totalRegistered).toLocaleString()}
          </p>
          {isMembers && (
            <p className="mt-2 flex items-center gap-1.5 text-xs text-muted">
              <Phone size={13} className="text-success" /> {stats.reachable} with a number alerts can reach
            </p>
          )}
        </Card>

        <Card className="p-6">
          <span className="mb-3 flex items-center gap-2 text-xs font-semibold tracking-wide text-muted">
            <MapPin size={16} className="text-success" /> REGIONS COVERED
          </span>
          <p className="font-display text-3xl font-bold text-ink">{regions.length}</p>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-line">
            <div className="h-full rounded-full bg-success" style={{ width: `${Math.min(100, regions.length * 4)}%` }} />
          </div>
        </Card>

        {!isMembers && (
          <Card className="p-6">
            <>
              <span className="mb-3 flex items-center gap-2 text-xs font-semibold tracking-wide text-muted">
                <Building2 size={16} className="text-primary" /> STATUS BREAKDOWN
              </span>
              <StatusDonut active={stats.activeCommunities} optedOut={stats.optedOutCommunities} />
            </>
          </Card>
        )}
      </div>

      {isMembers && (
        <details className="group mb-5 rounded-md border border-line bg-surface">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-3.5 text-sm font-semibold text-ink marker:content-none">
            <span className="flex items-center gap-2">
              <Languages size={16} className="text-primary" /> Member breakdown
              <span className="font-normal text-muted">View language, location, or consent insights</span>
            </span>
            <ChevronDown size={18} className="shrink-0 text-muted transition-transform group-open:rotate-180" />
          </summary>
          <div className="border-t border-line p-5">
            <div className="mb-5 w-full sm:w-56">
              <Select
                label="SHOW BREAKDOWN BY"
                value={breakdown}
                onChange={setBreakdown}
                options={[
                  { id: "language", name: "Language" },
                  { id: "location", name: "Location" },
                  { id: "status", name: "Status" },
                ]}
                getValue={(option) => option.id}
                getLabel={(option) => option.name}
              />
            </div>
            {breakdown === "status" ? (
              <StatusDonut active={stats.activeMembers} optedOut={stats.optedOutMembers} />
            ) : (
              <BreakdownBars
                entries={breakdownEntries.slice(0, 5)}
                total={stats.totalMembers}
                emptyLabel="Nothing recorded yet."
              />
            )}
          </div>
        </details>
      )}

      <div className="mb-5 flex flex-wrap items-center gap-3">
        <label className="flex min-w-64 flex-1 items-center gap-2.5 rounded-md border border-line bg-canvas px-4 py-2.5 text-muted focus-within:border-primary">
          <Search size={16} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={isMembers ? "Search by name, number, place, or community..." : "Search by community or region..."}
            className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted"
          />
        </label>

        <div className="w-44">
          <Select
            size="sm"
            value={regionFilter}
            onChange={setRegionFilter}
            options={[{ id: "", name: "All regions" }, ...regions]}
            getValue={(region) => region.id}
            getLabel={(region) => region.name}
          />
        </div>

        {isMembers && (
          <div className="w-44">
            <Select
              size="sm"
              value={languageFilter}
              onChange={setLanguageFilter}
              options={[{ id: "", name: "All languages" }, ...languageOptions.map((item) => ({ id: item, name: item }))]}
              getValue={(item) => item.id}
              getLabel={(item) => item.name}
            />
          </div>
        )}

        <div className="w-40">
          <Select
            size="sm"
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              { id: "", name: "All status" },
              { id: "active", name: "Active" },
              { id: "opted-out", name: "Opted-out" },
            ]}
            getValue={(item) => item.id}
            getLabel={(item) => item.name}
          />
        </div>
      </div>

      <Card className="mb-5 overflow-hidden p-0">
        {isMembers ? (
          <div className={`${MEMBER_COLS} bg-ink px-5 py-3 text-xs font-semibold tracking-wide text-white/80`}>
            <span>MEMBER</span>
            <span>LOCATION</span>
            <span>LANGUAGE</span>
            <span>COMMUNITY</span>
            <span>STATUS</span>
            <span className="text-right">ACTIONS</span>
          </div>
        ) : (
          <div className={`${COMMUNITY_COLS} bg-ink px-5 py-3 text-xs font-semibold tracking-wide text-white/80`}>
            <span>COMMUNITY</span>
            <span>REGION</span>
            <span>REGISTERED</span>
            <span>REG. DATE</span>
            <span>SOURCE</span>
            <span>STATUS</span>
            <span className="text-right">ACTIONS</span>
          </div>
        )}

        {pageItems.length === 0 && (
          <div className="px-5 py-12 text-center text-sm text-muted">
            {(isMembers ? members : communities).length === 0 ? (
              loadError ? (
                "Nothing to show while those records are unavailable."
              ) : (
                <>
                  {isMembers ? "Nobody is registered yet." : "No communities yet."}{" "}
                  <button
                    onClick={() => (isMembers ? setMemberModalOpen(true) : setCommunityModalOpen(true))}
                    className="font-semibold text-primary hover:underline"
                  >
                    {isMembers ? "Register the first member" : "Add the first community"}
                  </button>
                </>
              )
            ) : (
              <>
                No {isMembers ? "members" : "communities"} match these filters.{" "}
                <button onClick={clearFilters} className="font-semibold text-primary hover:underline">
                  Clear filters
                </button>
              </>
            )}
          </div>
        )}

        {isMembers
          ? pageItems.map((item) => (
              <div key={item.id} className={`${MEMBER_COLS} border-t border-line px-5 py-4 text-sm`}>
                <div className="min-w-0">
                  <p className="truncate font-semibold text-ink">{item.fullName}</p>
                  <p className={`text-xs ${isValidPhone(item.phone) ? "text-muted" : "text-danger"}`}>
                    {formatPhone(item.phone)}
                  </p>
                </div>
                <div className="min-w-0">
                  <p className="truncate text-ink">{item.locality || "—"}</p>
                  <p className="text-xs text-muted">{regionNameOf(item, regions)}</p>
                </div>
                <span className="truncate rounded-sm bg-chip px-2 py-0.5 text-center text-[11px] font-semibold tracking-wide text-chip-ink">
                  {String(item.language ?? "—").toUpperCase()}
                </span>
                <span className="min-w-0 truncate text-ink">{communityNameOf(item, communities)}</span>
                <span>
                  <Badge tone={statusTone(item.status)}>{String(item.status ?? "unknown").toUpperCase()}</Badge>
                </span>
                <span className="flex items-center justify-end gap-1">
                  {String(item.status).toLowerCase() === "opted-out" && (
                    <button
                      onClick={() => handleReactivate(item)}
                      disabled={busyId === item.id}
                      className="rounded-md border border-primary px-2.5 py-1 text-xs font-semibold text-primary hover:bg-primary-soft/40 disabled:opacity-60"
                    >
                      Reactivate
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(item)}
                    disabled={busyId === item.id}
                    className="rounded-md p-1.5 text-muted hover:bg-danger-soft hover:text-danger disabled:opacity-50"
                    aria-label={`Remove ${item.fullName}`}
                  >
                    <Trash2 size={15} />
                  </button>
                </span>
              </div>
            ))
          : pageItems.map((item) => (
              <div key={item.id} className={`${COMMUNITY_COLS} border-t border-line px-5 py-4 text-sm`}>
                <div className="min-w-0">
                  <p className="truncate font-semibold text-ink">{item.name}</p>
                  {item.type && <p className="text-xs text-muted">{item.type}</p>}
                </div>
                <span className="truncate text-ink">{item.region?.name ?? regionNameOf(item, regions)}</span>
                <span className="font-semibold text-ink">
                  {Number(
                    item.totalRegistered ?? members.filter((row) => String(row.communityId) === String(item.id)).length,
                  ).toLocaleString()}
                </span>
                <span className="text-muted">{formatDate(item.registrationDate)}</span>
                <span className="truncate rounded-sm bg-chip px-2 py-0.5 text-center text-[11px] font-semibold tracking-wide text-chip-ink">
                  {String(item.source ?? "—").toUpperCase()}
                </span>
                <span>
                  <Badge tone={statusTone(item.status)}>{String(item.status ?? "unknown").toUpperCase()}</Badge>
                </span>
                <span className="flex items-center justify-end gap-1">
                  {String(item.status).toLowerCase() === "opted-out" && (
                    <button
                      onClick={() => handleReactivate(item)}
                      disabled={busyId === item.id}
                      className="rounded-md border border-primary px-2.5 py-1 text-xs font-semibold text-primary hover:bg-primary-soft/40 disabled:opacity-60"
                    >
                      Reactivate
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(item)}
                    disabled={busyId === item.id}
                    className="rounded-md p-1.5 text-muted hover:bg-danger-soft hover:text-danger disabled:opacity-50"
                    aria-label={`Delete ${item.name}`}
                  >
                    <Trash2 size={15} />
                  </button>
                </span>
              </div>
            ))}
      </Card>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="flex items-center gap-2 text-sm text-muted">
          <History size={16} />
          {status}
          {filtered.length > 0 && (
            <span className="text-xs">
              · showing {(page - 1) * PAGE_SIZE + 1}–{(page - 1) * PAGE_SIZE + pageItems.length} of {filtered.length}
            </span>
          )}
        </span>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            disabled={page === 1}
            className="grid h-8 w-8 place-items-center rounded-md border border-line text-muted hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Previous page"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="px-1 text-xs font-semibold text-muted">
            {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
            disabled={page === totalPages}
            className="grid h-8 w-8 place-items-center rounded-md border border-line text-muted hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Next page"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <RegisterMemberModal
        open={memberModalOpen}
        onClose={() => setMemberModalOpen(false)}
        regions={regions}
        communities={communities}
        dialects={dialects}
        onCreated={handleCreateMember}
      />
      <AddCommunityModal
        open={communityModalOpen}
        onClose={() => setCommunityModalOpen(false)}
        regions={regions}
        onCreated={handleCreateCommunity}
      />
      <AddRegionModal open={regionModalOpen} onClose={() => setRegionModalOpen(false)} onCreated={handleCreateRegion} />
    </AppLayout>
  );
}
