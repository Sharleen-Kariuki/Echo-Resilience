import { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Users,
  MapPin,
  TrendingUp,
  Trash2,
} from "lucide-react";
import AppLayout from "../components/layout/AppLayout";
import TopBar from "../components/layout/TopBar";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Modal from "../components/ui/Modal";
import { api, mockRegions, mockCommunities } from "../lib/api";

const PAGE_SIZE = 4;
const SOURCE_OPTIONS = ["self-registered", "admin-added"];
const STATUS_OPTIONS = ["active", "opted-out"];

const COLS = "grid grid-cols-[1.4fr_1.1fr_1fr_1fr_1fr_0.9fr_0.8fr] gap-3 items-center";

function formatDate(value) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString(undefined, { month: "short", day: "2-digit", year: "numeric" });
}

function statusTone(status) {
  return String(status).toLowerCase() === "active" ? "green" : "red";
}

function FilterSelect({ value, onChange, options }) {
  return (
    <div className="relative min-w-40">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full appearance-none rounded-xl border border-line bg-surface py-2.5 pl-4 pr-9 text-sm font-semibold text-ink outline-none focus:border-primary"
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

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold tracking-wide text-muted">{label}</span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-line bg-canvas px-3.5 py-2.5 text-sm text-ink outline-none focus:border-primary";

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

function AddCommunityModal({ open, onClose, regions, onCreated }) {
  const [name, setName] = useState("");
  const [regionId, setRegionId] = useState(regions[0]?.id ?? "");
  const [totalRegistered, setTotalRegistered] = useState("");
  const [source, setSource] = useState(SOURCE_OPTIONS[0]);
  const [status, setStatus] = useState(STATUS_OPTIONS[0]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) setRegionId(regions[0]?.id ?? "");
  }, [open, regions]);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!name || !regionId) {
      setError("Community name and region are required.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      await onCreated({
        name,
        regionId: Number(regionId),
        totalRegistered: Number(totalRegistered) || 0,
        source,
        status,
      });
      setName("");
      setTotalRegistered("");
      onClose();
    } catch (err) {
      console.error(err);
      setError("Could not save this community. It has been added locally instead.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="Add Community" description="Register a new community group and its coverage region.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="COMMUNITY NAME">
          <input value={name} onChange={(event) => setName(event.target.value)} className={inputClass} placeholder="e.g. Kibera Relief Network" />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="REGION">
            <select value={regionId} onChange={(event) => setRegionId(event.target.value)} className={inputClass}>
              {regions.map((region) => (
                <option key={region.id} value={region.id}>
                  {region.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="TOTAL REGISTERED">
            <input
              type="number"
              min="0"
              value={totalRegistered}
              onChange={(event) => setTotalRegistered(event.target.value)}
              className={inputClass}
              placeholder="0"
            />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="SOURCE">
            <select value={source} onChange={(event) => setSource(event.target.value)} className={inputClass}>
              {SOURCE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Field>
          <Field label="STATUS">
            <select value={status} onChange={(event) => setStatus(event.target.value)} className={inputClass}>
              {STATUS_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Field>
        </div>

        {error && <p className="text-sm text-danger">{error}</p>}

        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className="rounded-xl border border-line px-5 py-2.5 text-sm font-semibold text-muted hover:text-ink">
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:brightness-110 disabled:opacity-60"
          >
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
    if (!name) {
      setError("Region name is required.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      await onCreated({
        name,
        latitude: latitude ? Number(latitude) : undefined,
        longitude: longitude ? Number(longitude) : undefined,
      });
      setName("");
      setLatitude("");
      setLongitude("");
      onClose();
    } catch (err) {
      console.error(err);
      setError("Could not save this region. It has been added locally instead.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="Add Region" description="New regions become available for alerts, communities, and the feedback map.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="REGION NAME">
          <input value={name} onChange={(event) => setName(event.target.value)} className={inputClass} placeholder="e.g. Turkana Basin" />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="LATITUDE (optional)">
            <input value={latitude} onChange={(event) => setLatitude(event.target.value)} className={inputClass} placeholder="e.g. 3.1167" />
          </Field>
          <Field label="LONGITUDE (optional)">
            <input value={longitude} onChange={(event) => setLongitude(event.target.value)} className={inputClass} placeholder="e.g. 35.6" />
          </Field>
        </div>
        <p className="text-xs text-muted">Coordinates place this region's pin on the Feedback Map. Leave blank to add them later.</p>

        {error && <p className="text-sm text-danger">{error}</p>}

        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className="rounded-xl border border-line px-5 py-2.5 text-sm font-semibold text-muted hover:text-ink">
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:brightness-110 disabled:opacity-60"
          >
            {submitting ? "Saving..." : "Add Region"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default function CommunitiesPage() {
  const [communities, setCommunities] = useState(mockCommunities);
  const [regions, setRegions] = useState(mockRegions);
  const [search, setSearch] = useState("");
  const [regionId, setRegionId] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [loadStatus, setLoadStatus] = useState("Loading communities...");
  const [usingMock, setUsingMock] = useState(false);
  const [communityModalOpen, setCommunityModalOpen] = useState(false);
  const [regionModalOpen, setRegionModalOpen] = useState(false);
  const [reactivatingId, setReactivatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  async function loadAll() {
    const [communitiesResult, regionsResult] = await Promise.all([api.getCommunities(), api.getRegions()]);
    setCommunities(communitiesResult.data.length ? communitiesResult.data : mockCommunities);
    setRegions(regionsResult.data.length ? regionsResult.data : mockRegions);
    const anyMock = communitiesResult.usingMock || regionsResult.usingMock;
    setUsingMock(anyMock);
    setLoadStatus(anyMock ? "Backend unavailable - mock community data active" : "Synced from /api/communities");
  }

  useEffect(() => {
    let isMounted = true;
    loadAll().catch(() => {
      if (isMounted) setLoadStatus("Failed to load communities");
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const filtered = useMemo(() => {
    return communities.filter((item) => {
      if (regionId && String(item.region?.id ?? item.regionId) !== String(regionId)) return false;
      if (status && String(item.status).toLowerCase() !== status) return false;
      if (search) {
        const haystack = `${item.name} ${item.region?.name ?? ""}`.toLowerCase();
        if (!haystack.includes(search.toLowerCase())) return false;
      }
      return true;
    });
  }, [communities, regionId, status, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const stats = useMemo(() => {
    const totalRegistered = communities.reduce((sum, item) => sum + Number(item.totalRegistered ?? 0), 0);
    const active = communities.filter((item) => String(item.status).toLowerCase() === "active").length;
    const optedOut = communities.length - active;
    return { totalRegistered, active, optedOut, regionsCovered: regions.length };
  }, [communities, regions]);

  async function handleCreateCommunity(payload) {
    try {
      const created = await api.createCommunity(payload);
      setCommunities((current) => [
        { ...created, region: regions.find((region) => region.id === payload.regionId) ?? { name: "Region" } },
        ...current,
      ]);
    } catch (error) {
      setCommunities((current) => [
        {
          id: Date.now(),
          ...payload,
          region: regions.find((region) => region.id === payload.regionId) ?? { name: "Region" },
          registrationDate: new Date().toISOString(),
        },
        ...current,
      ]);
      throw error;
    }
  }

  async function handleCreateRegion(payload) {
    try {
      const created = await api.createRegion(payload);
      setRegions((current) => [...current, created]);
    } catch (error) {
      setRegions((current) => [...current, { id: Date.now(), totalRegistered: 0, ...payload }]);
      throw error;
    }
  }

  async function handleDelete(item) {
    if (!window.confirm(`Delete "${item.name}"? This can't be undone.`)) return;

    setDeletingId(item.id);
    try {
      await api.deleteCommunity(item.id);
    } catch (error) {
      console.error(error);
    } finally {
      setCommunities((current) => current.filter((row) => row.id !== item.id));
      setDeletingId(null);
    }
  }

  async function handleReactivate(id) {
    setReactivatingId(id);
    setCommunities((current) => current.map((item) => (item.id === id ? { ...item, status: "active" } : item)));
    try {
      await api.updateCommunity(id, { status: "active" });
    } catch (error) {
      console.error(error);
    } finally {
      setReactivatingId(null);
    }
  }

  const actions = (
    <button
      onClick={() => setCommunityModalOpen(true)}
      className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-semibold text-white hover:brightness-110"
    >
      <Plus size={18} /> Add Community
    </button>
  );

  return (
    <AppLayout
      topBar={<TopBar title="Communities" showSearch={false} actions={actions} />}
    >
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <p className="text-muted">Management of registered community members and regional coverage.</p>
        <button
          onClick={() => setRegionModalOpen(true)}
          className="flex items-center gap-2 rounded-xl border border-primary px-5 py-2.5 text-sm font-semibold text-primary hover:bg-primary-soft/40"
        >
          <Plus size={16} /> Add Region
        </button>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="p-5">
          <div className="mb-3 flex items-center gap-2 text-xs font-bold tracking-wide text-muted">
            <Users size={16} className="text-primary" /> TOTAL REGISTERED
          </div>
          <div className="font-display text-3xl font-extrabold text-primary">{stats.totalRegistered.toLocaleString()}</div>
        </Card>
        <Card className="p-5">
          <div className="mb-3 flex items-center gap-2 text-xs font-bold tracking-wide text-muted">
            <MapPin size={16} className="text-success" /> REGIONS COVERED
          </div>
          <div className="font-display text-3xl font-extrabold text-ink">{stats.regionsCovered}</div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-canvas">
            <div className="h-full rounded-full bg-success" style={{ width: `${Math.min(100, stats.regionsCovered * 4)}%` }} />
          </div>
        </Card>
        <Card className="p-5">
          <div className="mb-3 flex items-center gap-2 text-xs font-bold tracking-wide text-muted">
            <TrendingUp size={16} className="text-primary" /> STATUS BREAKDOWN
          </div>
          <StatusDonut active={stats.active} optedOut={stats.optedOut} />
        </Card>
      </div>

      <Card className="mb-5 flex flex-wrap items-center gap-3 p-4">
        <label className="flex min-w-56 flex-1 items-center gap-2.5 rounded-xl border border-line bg-canvas px-3.5 py-2.5 text-muted focus-within:border-primary">
          <Search size={16} />
          <input
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
            placeholder="Search by community or region..."
            className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted"
          />
        </label>
        <FilterSelect
          value={regionId}
          onChange={(value) => {
            setRegionId(value);
            setPage(1);
          }}
          options={[{ id: "", name: "All Regions" }, ...regions]}
        />
        <FilterSelect
          value={status}
          onChange={(value) => {
            setStatus(value);
            setPage(1);
          }}
          options={[{ id: "", name: "All Status" }, { id: "active", name: "Active" }, { id: "opted-out", name: "Opted-out" }]}
        />
      </Card>

      <Card className="mb-5 overflow-hidden p-0">
        <div className={`${COLS} bg-ink px-4 py-3 text-xs font-bold tracking-wide text-white/80`}>
          <span>COMMUNITY NAME</span>
          <span>REGION</span>
          <span>REGISTERED</span>
          <span>REG. DATE</span>
          <span>SOURCE</span>
          <span>STATUS</span>
          <span>ACTIONS</span>
        </div>

        {pageItems.length ? (
          pageItems.map((item) => (
            <div key={item.id} className={`${COLS} border-b border-line px-4 py-4 text-sm last:border-none`}>
              <span className="font-semibold text-ink">{item.name}</span>
              <span className="text-ink">{item.region?.name ?? "—"}</span>
              <span className="font-bold text-ink">{Number(item.totalRegistered ?? 0).toLocaleString()}</span>
              <span className="text-muted">{formatDate(item.registrationDate)}</span>
              <span>
                <span className="rounded-md bg-chip px-2 py-0.5 text-[11px] font-bold tracking-wide text-chip-ink">
                  {String(item.source ?? "—").toUpperCase()}
                </span>
              </span>
              <span>
                <Badge tone={statusTone(item.status)}>{String(item.status ?? "unknown").toUpperCase()}</Badge>
              </span>
              <span className="flex items-center gap-2">
                {String(item.status).toLowerCase() === "opted-out" && (
                  <button
                    onClick={() => handleReactivate(item.id)}
                    disabled={reactivatingId === item.id}
                    className="rounded-lg border border-primary px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary-soft/40 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {reactivatingId === item.id ? "Reactivating..." : "Reactivate"}
                  </button>
                )}
                <button
                  onClick={() => handleDelete(item)}
                  disabled={deletingId === item.id}
                  className="rounded-lg p-1.5 text-muted hover:bg-danger-soft hover:text-danger disabled:opacity-50"
                  aria-label={`Delete ${item.name}`}
                >
                  <Trash2 size={15} />
                </button>
              </span>
            </div>
          ))
        ) : (
          <div className="px-4 py-10 text-center text-sm text-muted">No communities match these filters.</div>
        )}
      </Card>

      <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs text-muted">
          {usingMock ? loadStatus : `Showing ${pageItems.length ? (page - 1) * PAGE_SIZE + 1 : 0} to ${(page - 1) * PAGE_SIZE + pageItems.length} of ${filtered.length} communities`}
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
