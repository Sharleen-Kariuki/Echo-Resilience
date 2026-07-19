import { useState } from "react";
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
} from "lucide-react";
import Sidebar from "../components/layout/Sidebar";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";

// Sample preview copy per language (swap for the real translation API later).
const PREVIEW = {
  Somali: {
    heading:
      "Digniin degdeg ah: Abaarta ka jirta Marsabit North ayaa gaartay heerkii ugu sarreeyay. Fadlan u guura xeryaha biyaha leh.",
    body: "Abaarta hadda jirta waxay u baahan tahay tallaabo degdeg ah. Ha u safrin dhulka oomanaha ah. Isha biyaha ugu dhow waa Marsabit Central.",
  },
  Oromo: {
    heading:
      "Beeksisa ariifachiisaa: Goggogsi Marsabit North keessatti sadarkaa ol'aanaa gaʼeera. Maaloo gara bakka bishaan jirutti godaanaa.",
    body: "Goggogsi ammaa tarkaanfii ariifachiisaa barbaachisa. Lafa gogaa keessa hin deeminaa. Madda bishaanii dhihoo Marsabit Central dha.",
  },
  Turkana: {
    heading:
      "Alarm a lomeyen: Akoro a Marsabit North etamakina alakan a nabo. Tolimu kide alakara a ngakipi.",
    body: "Akoro na ejai ekitala ayong akiyar a lomeyen. Sube kilimun a nakwap a ngamesekin. Ngakipi a nakinae ejai Marsabit Central.",
  },
};

function Select({ label, options, value, onChange }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold tracking-wide text-muted">{label}</span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-xl border border-line bg-canvas px-4 py-3 text-[15px] font-semibold text-ink outline-none focus:border-primary"
        >
          {options.map((o) => (
            <option key={o}>{o}</option>
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

export default function ClimateAlertsPage() {
  const [hazard, setHazard] = useState("Drought");
  const [severity, setSeverity] = useState("Critical");
  const [regions, setRegions] = useState(["Marsabit North", "Laisamis"]);
  const [description, setDescription] = useState("");
  const [lang, setLang] = useState("Somali");

  const removeRegion = (r) => setRegions((rs) => rs.filter((x) => x !== r));

  return (
    <div className="flex min-h-screen bg-canvas text-ink">
      <Sidebar user={{ name: "Admin User", detail: "Regional Lead", initials: "AU" }} />

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Header */}
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
            <span className="text-[15px] font-semibold text-muted">Draft #829</span>
          </div>
        </header>

        {/* Content: form + preview */}
        <main className="flex-1 px-8 py-6">
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
            {/* ---- Left: Hazard Parameters ---- */}
            <Card className="p-7">
              <h2 className="mb-6 flex items-center gap-3 font-display text-xl font-extrabold">
                <SquarePen size={20} className="text-primary" />
                Hazard Parameters
              </h2>

              <div className="mb-5 grid grid-cols-2 gap-4">
                <Select
                  label="HAZARD TYPE"
                  value={hazard}
                  onChange={setHazard}
                  options={["Drought", "Flood", "Heat Wave", "Storm Surge", "Air Quality"]}
                />
                <Select
                  label="SEVERITY LEVEL"
                  value={severity}
                  onChange={setSeverity}
                  options={["Critical", "High", "Moderate", "Low"]}
                />
              </div>

              {/* Affected region multi-select */}
              <div className="mb-5">
                <span className="mb-2 block text-xs font-semibold tracking-wide text-muted">
                  AFFECTED REGION (MULTI-SELECT)
                </span>
                <div className="flex flex-wrap items-center gap-2 rounded-xl border border-line p-3">
                  {regions.map((r) => (
                    <span
                      key={r}
                      className="flex items-center gap-2 rounded-full bg-primary px-3 py-1.5 text-sm font-semibold text-white"
                    >
                      {r}
                      <button onClick={() => removeRegion(r)} aria-label={`Remove ${r}`}>
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                  <button className="flex items-center gap-1 px-2 py-1 text-sm font-semibold text-primary hover:underline">
                    <Plus size={16} /> Add Region
                  </button>
                </div>
              </div>

              {/* Raw description */}
              <div className="mb-6">
                <span className="mb-2 block text-xs font-semibold tracking-wide text-muted">
                  RAW SCIENTIFIC DESCRIPTION
                </span>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter meteorological data, satellite observations, and technical risk metrics..."
                  className="min-h-44 w-full resize-none rounded-xl border border-line bg-canvas p-4 font-mono text-sm text-ink outline-none placeholder:text-muted focus:border-primary"
                />
              </div>

              <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-semibold text-white shadow-sm hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                <Sparkles size={18} /> Simplify &amp; Translate
              </button>
            </Card>

            {/* ---- Right: Preview ---- */}
            <Card className="border-dashed bg-canvas p-7">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="font-display text-xl font-extrabold">Preview</h2>
                <div className="flex gap-1 rounded-full bg-surface p-1">
                  {Object.keys(PREVIEW).map((l) => (
                    <button
                      key={l}
                      onClick={() => setLang(l)}
                      className={`rounded-full px-3 py-1 text-sm font-semibold transition-colors ${
                        lang === l ? "bg-primary-soft text-primary" : "text-muted hover:text-ink"
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              {/* Translated alert card */}
              <div className="rounded-xl border border-line bg-surface p-6">
                <div className="mb-4 flex items-center gap-3">
                  <Badge tone="red">CRITICAL ALERT</Badge>
                  <span className="text-xs text-muted">Translation: Human-Verified AI</span>
                </div>

                <p className="mb-4 font-display text-2xl font-bold leading-snug text-ink">
                  {PREVIEW[lang].heading}
                </p>
                <p className="mb-6 text-[15px] leading-relaxed text-muted">{PREVIEW[lang].body}</p>

                {/* Voice synthesis */}
                <div className="inline-flex items-center gap-3 rounded-full border border-line py-2 pl-2 pr-5">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-white">
                    <Play size={16} />
                  </span>
                  <span className="text-xs font-bold tracking-wide text-ink">VOICE SYNTHESIS</span>
                  <span className="flex items-end gap-0.5">
                    {[8, 14, 6, 11].map((h, i) => (
                      <span key={i} className="w-1 rounded-full bg-primary" style={{ height: h }} />
                    ))}
                  </span>
                </div>
              </div>

              {/* Reach note */}
              <div className="mt-4 flex items-start gap-3 rounded-xl bg-success-soft p-4 text-success">
                <MessageSquare size={18} className="mt-0.5 shrink-0" />
                <p className="text-sm">
                  This will reach <span className="font-bold">340 registered numbers</span> in{" "}
                  <span className="underline">{regions[0] ?? "the selected region"}</span>.
                </p>
              </div>
            </Card>
          </div>
        </main>

        {/* Bottom action bar */}
        <footer className="flex items-center justify-between gap-4 border-t border-line bg-canvas px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-muted">
            <History size={16} />
            Last saved: Today at 09:42 AM
          </div>
          <div className="flex gap-3">
            <button className="rounded-xl border border-primary bg-surface px-6 py-3 font-semibold text-primary hover:bg-primary-soft/40">
              Save as Draft
            </button>
            <button className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white hover:brightness-110">
              <Send size={18} /> Send to Community
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}