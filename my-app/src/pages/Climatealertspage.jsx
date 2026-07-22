import { useEffect, useMemo, useState } from "react";
import {
  Megaphone,
  Bell,
  SquarePen,
  Sparkles,
  Plus,
  X,
  Play,
  History,
  Send,
  ChevronDown,
  MessageSquare,
  Volume2,
} from "lucide-react";
import Sidebar from "../components/layout/Sidebar";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import { api, mockDialects, mockHazardTypes, mockRegions } from "../lib/api";

const DEFAULT_DESCRIPTION =
  "Heavy convective precipitation exceeding 180 mm is expected across low-lying settlements, with elevated river overflow risk and road access disruption.";

const FALLBACK_PREVIEW = {
  simplifiedText:
    "A dangerous flood may happen soon. Move away from river banks and follow local officials.",
  translatedText:
    "Khatarta fatahaaddu way sarreysaa. Ka fogow webiyada oo raac tilmaamaha masuuliyiinta.",
};

function Select({ label, options, value, onChange, getValue = (item) => item, getLabel = (item) => item }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold tracking-wide text-muted">{label}</span>
      <div className="relative">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full appearance-none rounded-xl border border-line bg-canvas px-4 py-3 text-[15px] font-semibold text-ink outline-none focus:border-primary"
        >
          {options.map((option) => (
            <option key={getValue(option)} value={getValue(option)}>
              {getLabel(option)}
            </option>
          ))}
        </select>
        <ChevronDown
          size={18}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted"
        />
      </div>
    </label>
  );
}

function getResultText(payload, keys) {
  for (const key of keys) {
    if (payload?.[key]) return payload[key];
    if (payload?.data?.[key]) return payload.data[key];
  }
  return "";
}

export default function ClimateAlertsPage() {
  const [hazardTypes, setHazardTypes] = useState(mockHazardTypes);
  const [allRegions, setAllRegions] = useState(mockRegions);
  const [dialects, setDialects] = useState(mockDialects);
  const [hazardTypeId, setHazardTypeId] = useState(String(mockHazardTypes[0].id));
  const [severity, setSeverity] = useState("High");
  const [regionIds, setRegionIds] = useState([mockRegions[0].id]);
  const [description, setDescription] = useState(DEFAULT_DESCRIPTION);
  const [dialect, setDialect] = useState(mockDialects[0]);
  const [currentAlertId, setCurrentAlertId] = useState(null);
  const [preview, setPreview] = useState(FALLBACK_PREVIEW);
  const [audioUrl, setAudioUrl] = useState("");
  const [status, setStatus] = useState("Loading API options...");
  const [usingMock, setUsingMock] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadOptions() {
      const [hazardsResult, regionsResult, dialectsResult] = await Promise.all([
        api.getHazardTypes(),
        api.getRegions(),
        api.getDialects(),
      ]);

      if (!isMounted) return;

      setHazardTypes(hazardsResult.data.length ? hazardsResult.data : mockHazardTypes);
      setAllRegions(regionsResult.data.length ? regionsResult.data : mockRegions);
      setDialects(dialectsResult.data.length ? dialectsResult.data : mockDialects);
      setHazardTypeId(String((hazardsResult.data[0] ?? mockHazardTypes[0]).id));
      setRegionIds([(regionsResult.data[0] ?? mockRegions[0]).id]);
      setDialect((dialectsResult.data[0] ?? mockDialects[0]));
      setUsingMock(hazardsResult.usingMock || regionsResult.usingMock || dialectsResult.usingMock);
      setStatus(
        hazardsResult.usingMock || regionsResult.usingMock || dialectsResult.usingMock
          ? "Backend unavailable - mock options active"
          : "Connected to Echo-Resilience API",
      );
    }

    loadOptions();
    return () => {
      isMounted = false;
    };
  }, []);

  const selectedRegions = useMemo(
    () => allRegions.filter((region) => regionIds.includes(region.id)),
    [allRegions, regionIds],
  );

  const selectedRegionId = selectedRegions[0]?.id ?? allRegions[0]?.id;
  const selectedRegion = allRegions.find((region) => region.id === selectedRegionId);
  const selectedHazard = hazardTypes.find((hazard) => String(hazard.id) === String(hazardTypeId));
  const reachableCount = selectedRegions.reduce(
    (total, region) => total + Number(region.totalRegistered ?? region.registeredCount ?? 0),
    0,
  );

  function addRegion(id) {
    const numericId = Number(id);
    setRegionIds((current) => (current.includes(numericId) ? current : [...current, numericId]));
  }

  function removeRegion(id) {
    setRegionIds((current) => current.filter((regionId) => regionId !== id));
  }

  async function ensureAlert() {
    if (currentAlertId) return currentAlertId;

    const created = await api.createAlert({
      hazardTypeId: Number(hazardTypeId),
      severityLevel: severity,
      rawScientificDescription: description,
      regionIds,
    });
    const alertId = created.id ?? created.alert?.id ?? created.data?.id;
    setCurrentAlertId(alertId);
    return alertId;
  }

  async function handleProcess() {
    setIsSubmitting(true);
    setStatus("Creating alert and running simplify/translate...");
    try {
      const alertId = await ensureAlert();
      const result = await api.processAlert(alertId, { regionId: selectedRegionId, dialect });
      setPreview({
        simplifiedText:
          getResultText(result, ["simplifiedText", "simplified_text", "plainLanguageText"]) ||
          FALLBACK_PREVIEW.simplifiedText,
        translatedText:
          getResultText(result, ["translatedText", "translated_text", "translation"]) ||
          FALLBACK_PREVIEW.translatedText,
      });
      setStatus(`Processed alert AL-${String(alertId).padStart(4, "0")} for ${dialect}`);
    } catch (error) {
      console.error(error);
      setPreview(FALLBACK_PREVIEW);
      setUsingMock(true);
      setStatus("Process endpoint failed - showing mock preview");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleAudio() {
    setIsSubmitting(true);
    setStatus("Generating alert audio...");
    try {
      const alertId = await ensureAlert();
      await api.generateAlertAudio(alertId, { regionId: selectedRegionId, dialect });
      setAudioUrl(api.getAlertAudioUrl(alertId, dialect));
      setStatus(`Audio ready from /api/alerts/${alertId}/audio/${dialect}`);
    } catch (error) {
      console.error(error);
      setUsingMock(true);
      setStatus("Audio endpoint failed - preview remains text only");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDispatch() {
    setIsSubmitting(true);
    setStatus("Dispatching alert to selected community...");
    try {
      const alertId = await ensureAlert();
      const result = await api.dispatchAlert(alertId, {
        regionId: selectedRegionId,
        dialect,
        generateAudio: true,
      });
      setPreview({
        simplifiedText:
          getResultText(result, ["simplifiedText", "simplified_text", "plainLanguageText"]) ||
          preview.simplifiedText,
        translatedText:
          getResultText(result, ["translatedText", "translated_text", "translation"]) ||
          preview.translatedText,
      });
      setAudioUrl(api.getAlertAudioUrl(alertId, dialect));
      setStatus(`Dispatched alert AL-${String(alertId).padStart(4, "0")} via /api/alerts/:id/dispatch`);
    } catch (error) {
      console.error(error);
      setUsingMock(true);
      setStatus("Dispatch endpoint failed - mock confirmation active");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen bg-canvas text-ink">
      <Sidebar user={{ name: "Admin User", detail: "Regional Lead", initials: "AU" }} />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center gap-3 border-b border-line px-8 py-5">
          <Megaphone size={22} className="text-primary" />
          <h1 className="font-display text-2xl font-extrabold text-ink">
            Create New Resilience Alert
          </h1>
          <div className="ml-auto flex items-center gap-4">
            <button className="relative rounded-lg p-1.5 text-ink hover:bg-surface" aria-label="Notifications">
              <Bell size={20} />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-danger" />
            </button>
            <div className="h-7 w-px bg-line" />
            <span className="text-[15px] font-semibold text-muted">
              {currentAlertId ? `Draft AL-${String(currentAlertId).padStart(4, "0")}` : "New Draft"}
            </span>
          </div>
        </header>

        <main className="flex-1 px-8 py-6">
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
            <Card className="p-7">
              <h2 className="mb-6 flex items-center gap-3 font-display text-xl font-extrabold">
                <SquarePen size={20} className="text-primary" />
                Hazard Parameters
              </h2>

              <div className="mb-5 grid grid-cols-2 gap-4">
                <Select
                  label="HAZARD TYPE"
                  value={hazardTypeId}
                  onChange={setHazardTypeId}
                  options={hazardTypes}
                  getValue={(hazard) => hazard.id}
                  getLabel={(hazard) => hazard.name}
                />
                <Select
                  label="SEVERITY LEVEL"
                  value={severity}
                  onChange={setSeverity}
                  options={["Critical", "High", "Moderate", "Low"]}
                />
              </div>

              <div className="mb-5">
                <span className="mb-2 block text-xs font-semibold tracking-wide text-muted">
                  AFFECTED REGION
                </span>
                <div className="flex flex-wrap items-center gap-2 rounded-xl border border-line p-3">
                  {selectedRegions.map((region) => (
                    <span
                      key={region.id}
                      className="flex items-center gap-2 rounded-full bg-primary px-3 py-1.5 text-sm font-semibold text-white"
                    >
                      {region.name}
                      <button onClick={() => removeRegion(region.id)} aria-label={`Remove ${region.name}`}>
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                  <select
                    value=""
                    onChange={(event) => addRegion(event.target.value)}
                    className="rounded-lg border border-line bg-surface px-2 py-1 text-sm font-semibold text-primary outline-none"
                    aria-label="Add region"
                  >
                    <option value="">Add Region</option>
                    {allRegions.map((region) => (
                      <option key={region.id} value={region.id}>
                        {region.name}
                      </option>
                    ))}
                  </select>
                  <Plus size={16} className="text-primary" />
                </div>
              </div>

              <div className="mb-6">
                <span className="mb-2 block text-xs font-semibold tracking-wide text-muted">
                  RAW SCIENTIFIC DESCRIPTION
                </span>
                <textarea
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Enter meteorological data, satellite observations, and technical risk metrics..."
                  className="min-h-44 w-full resize-none rounded-xl border border-line bg-canvas p-4 font-mono text-sm text-ink outline-none placeholder:text-muted focus:border-primary"
                />
              </div>

              <button
                onClick={handleProcess}
                disabled={isSubmitting || !description || regionIds.length === 0}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-semibold text-white shadow-sm hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Sparkles size={18} /> Simplify &amp; Translate
              </button>
            </Card>

            <Card className="border-dashed bg-canvas p-7">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="font-display text-xl font-extrabold">Preview</h2>
                <div className="flex gap-1 rounded-full bg-surface p-1">
                  {dialects.map((item) => (
                    <button
                      key={item}
                      onClick={() => setDialect(item)}
                      className={`rounded-full px-3 py-1 text-sm font-semibold transition-colors ${
                        dialect === item ? "bg-primary-soft text-primary" : "text-muted hover:text-ink"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-line bg-surface p-6">
                <div className="mb-4 flex items-center gap-3">
                  <Badge tone="red">{severity.toUpperCase()} ALERT</Badge>
                  <span className="text-xs text-muted">
                    {usingMock ? "Mock-assisted preview" : "Echo-Resilience API preview"}
                  </span>
                </div>

                <p className="mb-4 font-display text-2xl font-bold leading-snug text-ink">
                  {preview.translatedText}
                </p>
                <p className="mb-6 text-[15px] leading-relaxed text-muted">{preview.simplifiedText}</p>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={handleAudio}
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-3 rounded-full border border-line py-2 pl-2 pr-5 disabled:opacity-60"
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-white">
                      <Volume2 size={16} />
                    </span>
                    <span className="text-xs font-bold tracking-wide text-ink">GENERATE AUDIO</span>
                  </button>
                  {audioUrl && (
                    <audio controls src={audioUrl} className="h-10 max-w-full">
                      <track kind="captions" />
                    </audio>
                  )}
                  {!audioUrl && (
                    <span className="inline-flex items-center gap-2 text-xs font-bold tracking-wide text-muted">
                      <Play size={14} /> Voice synthesis pending
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-4 flex items-start gap-3 rounded-xl bg-success-soft p-4 text-success">
                <MessageSquare size={18} className="mt-0.5 shrink-0" />
                <p className="text-sm">
                  This will reach <span className="font-bold">{reachableCount || 340} registered numbers</span>{" "}
                  in <span className="underline">{selectedRegion?.name ?? "the selected region"}</span>.
                </p>
              </div>
            </Card>
          </div>
        </main>

        <footer className="flex items-center justify-between gap-4 border-t border-line bg-canvas px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-muted">
            <History size={16} />
            {status}
          </div>
          <div className="flex gap-3">
            <button className="rounded-xl border border-primary bg-surface px-6 py-3 font-semibold text-primary hover:bg-primary-soft/40">
              {selectedHazard?.name ?? "Alert"} Draft
            </button>
            <button
              onClick={handleDispatch}
              disabled={isSubmitting || !description || regionIds.length === 0}
              className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send size={18} /> Send to Community
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
