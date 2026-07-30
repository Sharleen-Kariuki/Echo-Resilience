import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Megaphone,
  Bell,
  SquarePen,
  Languages,
  Plus,
  X,
  Play,
  History,
  Send,
  ChevronDown,
  ChevronLeft,
  MessageSquare,
  Volume2,
  Loader2,
} from "lucide-react";
import Sidebar from "../components/layout/Sidebar";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Modal from "../components/ui/Modal";
import { api, resolveAudioUrl } from "../lib/api";

const DESCRIPTION_PLACEHOLDER =
  "e.g. Heavy convective precipitation exceeding 180 mm is expected across low-lying settlements, with elevated river overflow risk and road access disruption.";

// Matches the backend's fixed GET /api/dialects list (backend/src/routes/dialects.js)
// and what the AI pipeline can actually process: Somali/Oromo/Amharic/Swahili go
// through Gemini directly, Turkana through a separate template lookup.
const SUPPORTED_DIALECTS = ["Somali", "Oromo", "Amharic", "Swahili", "Turkana"];

function Select({
  label,
  options,
  value,
  onChange,
  getValue = (item) => item,
  getLabel = (item) => item,
  emptyLabel = "None available",
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold tracking-wide text-muted">{label}</span>
      <div className="relative">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          disabled={options.length === 0}
          className="w-full appearance-none rounded-md border border-line bg-canvas px-4 py-3 text-[15px] font-semibold text-ink outline-none focus:border-primary disabled:cursor-not-allowed disabled:opacity-60"
        >
          {options.length === 0 && <option value="">{emptyLabel}</option>}
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

function getResultValue(payload, keys) {
  const sources = [payload, payload?.data, payload?.historyRecord, payload?.aiResult, payload?.audioResult];
  for (const key of keys) {
    for (const source of sources) {
      if (source && source[key] !== undefined && source[key] !== null) return source[key];
    }
  }
  return undefined;
}

function getResultText(payload, keys) {
  return getResultValue(payload, keys) || "";
}

// The Gemini call behind simplify/translate/audio is a single request with no
// native progress events, so this fakes a reassuring percentage: climbs
// quickly at first then eases off approaching 92%, jumps to 100% on finish()
// so the bar never appears to "hang" while genuinely waiting on the network.
function useSimulatedProgress() {
  const [percent, setPercent] = useState(0);
  const timerRef = useRef(null);
  const resetTimeoutRef = useRef(null);

  function start() {
    clearInterval(timerRef.current);
    clearTimeout(resetTimeoutRef.current);
    setPercent(8);
    timerRef.current = setInterval(() => {
      setPercent((current) => (current >= 92 ? current : current + Math.max(0.5, (92 - current) * 0.1)));
    }, 250);
  }

  function finish() {
    clearInterval(timerRef.current);
    setPercent(100);
    resetTimeoutRef.current = setTimeout(() => setPercent(0), 900);
  }

  function reset() {
    clearInterval(timerRef.current);
    clearTimeout(resetTimeoutRef.current);
    setPercent(0);
  }

  return { percent, start, finish, reset };
}

function ProgressBar({ percent, label }) {
  return (
    <div className="w-full">
      <div className="mb-1 flex items-center justify-between text-xs font-semibold text-muted">
        <span>{label}</span>
        <span>{Math.round(percent)}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-line">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${Math.min(100, Math.max(0, percent))}%` }}
        />
      </div>
    </div>
  );
}

// The Python bridge's raw stderr trace is useful in the console but reads as
// a crash to a non-technical admin. Gemini free-tier rate limiting is by far
// the most common cause, so translate that one case into plain language.
function friendlyError(message) {
  if (!message) return message;
  if (/RESOURCE_EXHAUSTED|rate limit/i.test(message)) {
    return "Too many translation requests at once. Wait a minute before trying again — switching languages rapidly can hit this limit faster.";
  }
  return message;
}

function AddHazardTypeModal({ open, onClose, onCreated }) {
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    if (!name.trim()) {
      setError("Hazard type name is required.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      await onCreated(name.trim());
      setName("");
      onClose();
    } catch (err) {
      console.error(err);
      setError("Could not save this hazard type. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="Add Hazard Type" description="New hazard types become available immediately in the dropdown above.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold tracking-wide text-muted">HAZARD TYPE NAME</span>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded-md border border-line bg-canvas px-3.5 py-2.5 text-sm text-ink outline-none focus:border-primary"
            placeholder="e.g. Wildfire"
            autoFocus
          />
        </label>

        {error && <p className="text-sm text-danger">{error}</p>}

        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className="rounded-md border border-line px-5 py-2.5 text-sm font-semibold text-muted hover:text-ink">
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:brightness-110 disabled:opacity-60"
          >
            {submitting ? "Saving..." : "Add Hazard Type"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default function ClimateAlertsPage() {
  const navigate = useNavigate();
  const [hazardTypes, setHazardTypes] = useState([]);
  const [allRegions, setAllRegions] = useState([]);
  const [hazardTypeId, setHazardTypeId] = useState("");
  const [severity, setSeverity] = useState("High");
  const [regionIds, setRegionIds] = useState([]);
  const [description, setDescription] = useState("");
  const [dialects, setDialects] = useState(SUPPORTED_DIALECTS);
  const [dialect, setDialect] = useState(SUPPORTED_DIALECTS[0]);
  const [currentAlertId, setCurrentAlertId] = useState(null);
  const [preview, setPreview] = useState(null);
  // Caches a finished simplify/translate(/audio) result per dialect for the
  // current draft, so re-clicking a dialect pill reuses it instead of paying
  // for another Gemini call. Cleared whenever the inputs that feed the AI
  // pipeline (description, hazard type, severity) change.
  const [previewCache, setPreviewCache] = useState({});
  const skipCacheClear = useRef(true);
  const [translateAllRunning, setTranslateAllRunning] = useState(false);
  const [translateAllProgress, setTranslateAllProgress] = useState({ completed: 0, total: 0, currentDialect: "" });
  const [processError, setProcessError] = useState(null);
  const [audioUrl, setAudioUrl] = useState("");
  const [audioError, setAudioError] = useState(null);
  const [dispatchError, setDispatchError] = useState(null);
  const [status, setStatus] = useState("Loading options...");
  const [optionsLoading, setOptionsLoading] = useState(true);
  const [optionsError, setOptionsError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hazardModalOpen, setHazardModalOpen] = useState(false);
  const processProgress = useSimulatedProgress();
  const audioProgress = useSimulatedProgress();
  const dispatchProgress = useSimulatedProgress();

  useEffect(() => {
    let isMounted = true;

    async function loadOptions() {
      const [hazardsResult, regionsResult, dialectsResult] = await Promise.all([
        api.getHazardTypes(),
        api.getRegions(),
        api.getDialects(),
      ]);

      if (!isMounted) return;

      // Never substitute mock data here: if a call failed (usingMock), treat
      // it as "no options loaded" so the failure is visible instead of hidden
      // behind fabricated dropdown entries.
      const hazards = hazardsResult.usingMock ? [] : hazardsResult.data;
      const regions = regionsResult.usingMock ? [] : regionsResult.data;
      // Dialects are safe to fall back on: the mock list matches what the
      // backend actually advertises, and the preview switcher only ever
      // needs to reflect "what the API currently says it supports".
      const availableDialects = dialectsResult.data?.length ? dialectsResult.data : SUPPORTED_DIALECTS;

      setHazardTypes(hazards);
      setAllRegions(regions);
      setDialects(availableDialects);
      if (hazards[0]) setHazardTypeId(String(hazards[0].id));
      // Regions are intentionally left unselected — the admin must explicitly
      // choose which affected region(s) to target, not send to a silent default.
      if (availableDialects[0]) setDialect(availableDialects[0]);

      const failed = hazardsResult.usingMock || regionsResult.usingMock;
      setOptionsError(failed ? "Could not load hazard types or regions." : null);
      setStatus(failed ? "Could not load options right now" : "Ready");
      setOptionsLoading(false);
    }

    loadOptions();
    return () => {
      isMounted = false;
    };
  }, []);

  // The cached previews are only valid for the description/hazard/severity
  // combination they were generated from — invalidate them if any change.
  useEffect(() => {
    if (skipCacheClear.current) {
      skipCacheClear.current = false;
      return;
    }
    setPreviewCache({});
  }, [description, hazardTypeId, severity]);

  const selectedRegions = useMemo(
    () => allRegions.filter((region) => regionIds.includes(region.id)),
    [allRegions, regionIds],
  );

  // No fallback to allRegions[0]: until the admin picks a region, nothing is "selected".
  const selectedRegionId = selectedRegions[0]?.id;
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

  async function handleCreateHazardType(name) {
    const created = await api.createHazardType({ name });
    setHazardTypes((current) => [...current, created]);
    setHazardTypeId(String(created.id));
  }

  async function handleSaveDraft() {
    setIsSubmitting(true);
    setStatus("Saving draft...");
    try {
      const alertId = await ensureAlert();
      setStatus(`Draft saved as AL-${String(alertId).padStart(4, "0")}`);
    } catch (error) {
      console.error(error);
      setStatus(`Could not save draft: ${friendlyError(error.message) ?? "unknown error"}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  // Shared by the manual "GENERATE AUDIO" button and the auto-refresh after a
  // language switch. Returns whether it actually produced a playable file —
  // callers use that to decide what status text to show. Progress is managed
  // by the caller since it means something different in each context.
  // Returns the resolved audio URL on success (so callers can cache it), or
  // null on failure.
  async function generateAudioFor(alertId, targetDialect, translatedText) {
    try {
      if (!translatedText) {
        throw new Error("Run Simplify & Translate first so there's text to turn into audio.");
      }
      const result = await api.generateAlertAudio(alertId, { dialect: targetDialect, translatedText });
      const audioPath = getResultValue(result, ["audioUrl", "audio_url", "audio_path", "audioPath"]);
      const audioNote = getResultValue(result, ["audio_note", "audioNote"]);
      if (!audioPath) {
        throw new Error(audioNote || "Audio generation did not return an audio file for this dialect.");
      }
      const resolvedUrl = resolveAudioUrl(audioPath);
      setAudioUrl(resolvedUrl);
      setAudioError(null);
      return resolvedUrl;
    } catch (error) {
      console.error(error);
      setAudioUrl("");
      setAudioError(`Audio generation failed: ${friendlyError(error.message) ?? "unknown error"}`);
      return null;
    }
  }

  async function runSimplifyTranslate(targetDialect) {
    // Already generated this dialect for the current description/hazard/
    // severity combo this session — reuse it instead of paying for another
    // Gemini call (system prompt + few-shot examples + generation cost).
    const cached = previewCache[targetDialect];
    if (cached) {
      setProcessError(null);
      setAudioError(null);
      setPreview({
        simplifiedText: cached.simplifiedText,
        translatedText: cached.translatedText,
        dialect: targetDialect,
        needsHumanReview: cached.needsHumanReview,
      });
      setAudioUrl(cached.audioUrl || "");
      setStatus(
        cached.needsHumanReview
          ? `Loaded cached preview for ${targetDialect} (unverified — audio unavailable)`
          : `Loaded cached preview for ${targetDialect}${cached.audioUrl ? " with audio" : ""}`,
      );
      return;
    }

    setIsSubmitting(true);
    setProcessError(null);
    setAudioUrl("");
    setAudioError(null);
    processProgress.start();
    setStatus(`Switching to ${targetDialect} — running simplify/translate...`);
    try {
      const alertId = await ensureAlert();
      const result = await api.processAlert(alertId, { dialect: targetDialect });
      const simplifiedText = getResultText(result, ["simplifiedText", "simplified_text", "plainLanguageText"]);
      const translatedText = getResultText(result, ["translatedText", "translated_text", "translation"]);
      if (!simplifiedText && !translatedText) {
        throw new Error("Could not generate a simplified or translated version. Please try again.");
      }
      const needsHumanReview = Boolean(getResultValue(result, ["needs_human_review", "needsHumanReview"]));
      processProgress.finish();
      setPreview({ simplifiedText, translatedText, dialect: targetDialect, needsHumanReview });

      // Unverified text (e.g. Turkana fallback) never gets TTS server-side —
      // don't bother trying, the audio panel already explains why.
      if (needsHumanReview) {
        setPreviewCache((current) => ({
          ...current,
          [targetDialect]: { simplifiedText, translatedText, needsHumanReview, audioUrl: "" },
        }));
        setStatus(`Processed alert AL-${String(alertId).padStart(4, "0")} for ${targetDialect} (unverified — audio unavailable)`);
        return;
      }

      setStatus(`Generating audio for ${targetDialect}...`);
      audioProgress.start();
      const generatedAudioUrl = await generateAudioFor(alertId, targetDialect, translatedText);
      if (generatedAudioUrl) {
        audioProgress.finish();
      } else {
        audioProgress.reset();
      }
      setPreviewCache((current) => ({
        ...current,
        [targetDialect]: { simplifiedText, translatedText, needsHumanReview, audioUrl: generatedAudioUrl || "" },
      }));
      setStatus(
        generatedAudioUrl
          ? `Processed alert AL-${String(alertId).padStart(4, "0")} for ${targetDialect} with audio ready`
          : `Processed alert AL-${String(alertId).padStart(4, "0")} for ${targetDialect} (audio generation failed)`,
      );
    } catch (error) {
      console.error(error);
      processProgress.reset();
      setPreview(null);
      setProcessError(`Simplify & Translate failed: ${friendlyError(error.message) ?? "unknown error"}`);
      setStatus("Could not generate a preview");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleProcess() {
    await runSimplifyTranslate(dialect);
  }

  // Clicking a language pill in the Preview panel always updates the selected
  // dialect, and immediately re-runs simplify/translate (and, if the result
  // is verified, audio generation) for that language instead of waiting for
  // separate button presses.
  async function handleDialectClick(item) {
    setDialect(item);
    if (isSubmitting) return;
    if (!description || !hazardTypeId || regionIds.length === 0) {
      setStatus("Add a description, hazard type, and at least one affected region before switching languages.");
      return;
    }
    await runSimplifyTranslate(item);
  }

  // Runs simplify/translate(+audio) for every supported dialect, one at a
  // time. Sequential on purpose: firing all of them in parallel reliably
  // trips Gemini's free-tier rate limit (see friendlyError above), so each
  // dialect waits its turn with a short pause in between.
  async function handleTranslateAll() {
    if (translateAllRunning || isSubmitting) return;
    if (!description || !hazardTypeId || regionIds.length === 0) {
      setStatus("Add a description, hazard type, and at least one affected region before translating all languages.");
      return;
    }

    setTranslateAllRunning(true);
    setDispatchError(null);

    for (let i = 0; i < dialects.length; i += 1) {
      const targetDialect = dialects[i];
      setTranslateAllProgress({ completed: i, total: dialects.length, currentDialect: targetDialect });
      await runSimplifyTranslate(targetDialect);
      if (i < dialects.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }
    }

    setTranslateAllProgress({ completed: dialects.length, total: dialects.length, currentDialect: "" });
    setTranslateAllRunning(false);
    setStatus(`Translated all ${dialects.length} languages.`);
  }

  async function handleAudio() {
    setIsSubmitting(true);
    setAudioError(null);
    audioProgress.start();
    setStatus("Generating alert audio...");
    try {
      const alertId = await ensureAlert();
      const generatedAudioUrl = await generateAudioFor(alertId, dialect, preview?.translatedText);
      if (generatedAudioUrl) {
        audioProgress.finish();
        setPreviewCache((current) =>
          current[dialect] ? { ...current, [dialect]: { ...current[dialect], audioUrl: generatedAudioUrl } } : current,
        );
      } else {
        audioProgress.reset();
      }
      setStatus(
        generatedAudioUrl
          ? `Audio ready for ${dialect}`
          : "Could not generate audio - see error below.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDispatch() {
    setIsSubmitting(true);
    setDispatchError(null);
    dispatchProgress.start();
    setStatus("Dispatching alert to selected community...");
    try {
      const alertId = await ensureAlert();
      const result = await api.dispatchAlert(alertId, {
        regionId: selectedRegionId,
        dialect,
        generateAudio: true,
      });
      const resultStatus = getResultValue(result, ["status"]);
      if (resultStatus !== "dispatched") {
        throw new Error(`Alert saved but was not marked dispatched (status: ${resultStatus ?? "unknown"}).`);
      }

      // Success is confirmed by the backend's own status field, not just the
      // absence of a thrown error. Let the bar visibly hit 100% before
      // redirecting so the confirmation isn't just an instant page swap.
      dispatchProgress.finish();
      await new Promise((resolve) => setTimeout(resolve, 500));
      navigate("/alerts", {
        state: {
          dispatched: true,
          alertId,
          hazardName: selectedHazard?.name ?? "Alert",
          regionName: selectedRegion?.name ?? "the selected region",
          reachableCount,
          dialect,
        },
      });
    } catch (error) {
      console.error(error);
      dispatchProgress.reset();
      setDispatchError(`Send to Community failed: ${friendlyError(error.message) ?? "unknown error"}`);
      setStatus("Could not send this alert");
    } finally {
      setIsSubmitting(false);
    }
  }

  const missingRequirements = [
    !description && "a scientific description",
    !hazardTypeId && "a hazard type",
    regionIds.length === 0 && "at least one affected region",
  ].filter(Boolean);

  return (
    <div className="flex min-h-screen bg-canvas text-ink">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center gap-3 border-b border-line px-8 py-5">
          <Link
            to="/alerts"
            className="flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-primary"
          >
            <ChevronLeft size={18} /> Alert History
          </Link>
          <div className="h-6 w-px bg-line" />
          <Megaphone size={22} className="text-primary" />
          <h1 className="font-display text-2xl font-bold text-ink">
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
          {optionsError && (
            <div className="mb-6 rounded-md border border-danger/40 bg-danger-soft p-4 text-sm text-danger">
              {optionsError} Hazard type and region selection are unavailable right now. Please try again shortly.
            </div>
          )}

          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
            <Card className="p-7">
              <h2 className="mb-6 flex items-center gap-3 font-display text-xl font-bold">
                <SquarePen size={20} className="text-primary" />
                Hazard Parameters
              </h2>

              <div className="mb-5 grid grid-cols-2 gap-4">
                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <Select
                      label="HAZARD TYPE"
                      value={hazardTypeId}
                      onChange={setHazardTypeId}
                      options={hazardTypes}
                      getValue={(hazard) => hazard.id}
                      getLabel={(hazard) => hazard.name}
                      emptyLabel={optionsLoading ? "Loading..." : "None available"}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setHazardModalOpen(true)}
                    className="grid h-11.5 w-11.5 shrink-0 place-items-center rounded-md border border-primary text-primary hover:bg-primary-soft/40"
                    aria-label="Add hazard type"
                  >
                    <Plus size={18} />
                  </button>
                </div>
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
                <div className="flex flex-wrap items-center gap-2 rounded-md border border-line p-3">
                  {selectedRegions.map((region) => (
                    <span
                      key={region.id}
                      className="flex items-center gap-2 rounded-sm bg-primary px-3 py-1.5 text-sm font-semibold text-white"
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
                  SCIENTIFIC DESCRIPTION
                </span>
                <textarea
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder={DESCRIPTION_PLACEHOLDER}
                  className="min-h-44 w-full resize-none rounded-md border border-line bg-canvas p-4 font-mono text-sm text-ink outline-none placeholder:text-muted focus:border-primary"
                />
              </div>

              <button
                onClick={handleProcess}
                disabled={isSubmitting || translateAllRunning || !description || !hazardTypeId || regionIds.length === 0}
                className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-md bg-primary py-3.5 font-semibold text-white hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {processProgress.percent > 0 && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 bg-white/25 transition-[width] duration-300 ease-out"
                    style={{ width: `${Math.min(100, Math.max(0, processProgress.percent))}%` }}
                  />
                )}
                <span className="relative flex items-center gap-2">
                  {processProgress.percent > 0 ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Simplifying &amp; translating… {Math.round(processProgress.percent)}%
                    </>
                  ) : (
                    <>
                      <Languages size={18} /> Simplify &amp; Translate
                    </>
                  )}
                </span>
              </button>
            </Card>

            <Card className="border-dashed bg-canvas p-7">
              <div className="mb-5">
                <h2 className="mb-3 font-display text-xl font-bold">Preview</h2>
                <div className="flex flex-wrap gap-1 border border-line bg-canvas p-1">
                  {dialects.map((item) => (
                    <button
                      key={item}
                      onClick={() => handleDialectClick(item)}
                      disabled={isSubmitting || translateAllRunning}
                      className={`px-3 py-1 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
                        dialect === item ? "bg-surface text-primary" : "text-muted hover:text-ink"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-5">
                <button
                  type="button"
                  onClick={handleTranslateAll}
                  disabled={isSubmitting || translateAllRunning || !description || !hazardTypeId || regionIds.length === 0}
                  className="mb-2 flex items-center gap-2 rounded-md border border-primary px-4 py-2 text-xs font-bold tracking-wide text-primary hover:bg-primary-soft/40 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {translateAllRunning ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Languages size={14} />
                  )}
                  {translateAllRunning
                    ? `Translating ${translateAllProgress.completed + 1} of ${translateAllProgress.total}: ${translateAllProgress.currentDialect}...`
                    : "Translate All Languages"}
                </button>
                {translateAllRunning && (
                  <ProgressBar
                    percent={(translateAllProgress.completed / translateAllProgress.total) * 100}
                    label="Translating all languages"
                  />
                )}
              </div>

              <div className="rounded-md border border-line bg-surface p-6">
                {isSubmitting && (processProgress.percent > 0 || audioProgress.percent > 0) && (
                  <div className="mb-4 flex items-center gap-2 rounded-lg bg-primary-soft px-3 py-2 text-sm font-semibold text-primary">
                    <Loader2 size={16} className="animate-spin" />
                    {audioProgress.percent > 0
                      ? `Generating audio for ${dialect}...`
                      : preview && preview.dialect !== dialect
                        ? `Switching from ${preview.dialect} to ${dialect} — translating...`
                        : `Translating into ${dialect}...`}
                  </div>
                )}

                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <Badge tone="red">{severity.toUpperCase()} ALERT</Badge>
                  {preview?.needsHumanReview && (
                    <Badge tone="red">NEEDS REVIEW BEFORE SENDING</Badge>
                  )}
                  <span className="text-xs text-muted">
                    {isSubmitting
                      ? `Running for ${dialect}...`
                      : preview
                        ? `Preview (${preview.dialect ?? dialect})`
                        : "No preview yet"}
                  </span>
                </div>

                {preview ? (
                  <div className={`transition-opacity ${isSubmitting ? "opacity-40" : "opacity-100"}`}>
                    <p className="mb-4 font-display text-2xl font-bold leading-snug text-ink">
                      {preview.translatedText}
                    </p>
                    <p className="mb-6 text-[15px] leading-relaxed text-muted">{preview.simplifiedText}</p>
                  </div>
                ) : (
                  <p className={`mb-6 text-[15px] leading-relaxed ${processError ? "text-danger" : "text-muted"}`}>
                    {processError ??
                      "Run \"Simplify & Translate\" to generate a preview."}
                  </p>
                )}

                {audioProgress.percent > 0 && (
                  <div className="mb-4">
                    <ProgressBar percent={audioProgress.percent} label={`Generating audio (${dialect})`} />
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-3">
                  {preview?.needsHumanReview ? (
                    <span className="inline-flex items-center gap-2 text-xs font-bold tracking-wide text-muted">
                      <Volume2 size={14} /> Audio unavailable — unverified translation
                    </span>
                  ) : (
                    <button
                      onClick={handleAudio}
                      disabled={isSubmitting || translateAllRunning || !preview}
                      className="inline-flex items-center gap-2 rounded-md border border-line px-4 py-2.5 hover:bg-canvas disabled:opacity-60"
                    >
                      <Volume2 size={16} className="text-primary" />
                      <span className="text-xs font-bold tracking-wide text-ink">GENERATE AUDIO</span>
                    </button>
                  )}
                  {audioUrl && (
                    <audio controls autoPlay src={audioUrl} className="h-10 max-w-full">
                      <track kind="captions" />
                    </audio>
                  )}
                  {!audioUrl && !preview?.needsHumanReview && (
                    <span className="inline-flex items-center gap-2 text-xs font-bold tracking-wide text-muted">
                      <Play size={14} /> Voice synthesis pending
                    </span>
                  )}
                </div>
                {audioError && <p className="mt-3 text-sm text-danger">{audioError}</p>}
              </div>

              <div className="mt-4 flex items-start gap-3 border border-success bg-surface p-4 text-success">
                <MessageSquare size={18} className="mt-0.5 shrink-0" />
                <p className="text-sm">
                  This will reach <span className="font-bold">{reachableCount} registered numbers</span>{" "}
                  in <span className="underline">{selectedRegion?.name ?? "the selected region"}</span>.
                </p>
              </div>
            </Card>
          </div>
        </main>

        <footer className="flex flex-col gap-2 border-t border-line bg-canvas px-8 py-4">
          {dispatchError && <p className="text-sm text-danger">{dispatchError}</p>}
          {!dispatchError && missingRequirements.length > 0 && (
            <p className="text-xs text-muted">
              Add {missingRequirements.join(", ")} to enable these actions.
            </p>
          )}
          {dispatchProgress.percent > 0 && (
            <ProgressBar
              percent={dispatchProgress.percent}
              label={dispatchProgress.percent >= 100 ? "Sent! Redirecting to Alert History..." : "Sending to community..."}
            />
          )}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-muted">
              <History size={16} />
              {status}
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleSaveDraft}
                disabled={isSubmitting || translateAllRunning || !description || !hazardTypeId}
                className="rounded-md border border-primary bg-surface px-6 py-3 font-semibold text-primary hover:bg-primary-soft/40 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Save {selectedHazard?.name ?? "Alert"} Draft
              </button>
              <button
                onClick={handleDispatch}
                disabled={isSubmitting || translateAllRunning || !description || !hazardTypeId || regionIds.length === 0}
                className="flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-semibold text-white hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Send size={18} /> Send to Community
              </button>
            </div>
          </div>
        </footer>
      </div>

      <AddHazardTypeModal
        open={hazardModalOpen}
        onClose={() => setHazardModalOpen(false)}
        onCreated={handleCreateHazardType}
      />
    </div>
  );
}
