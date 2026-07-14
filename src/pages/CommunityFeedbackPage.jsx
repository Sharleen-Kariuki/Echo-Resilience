import { useState } from "react";
import {
  Bell,
  FileText,
  Droplet,
  Waves,
  Thermometer,
  Clock,
  Play,
  Pause,
  CornerUpLeft,
  CheckCircle2,
  Share2,
  Calendar,
  ChevronDown,
} from "lucide-react";
import AppLayout from "../components/layout/AppLayout";
import TopBar from "../components/layout/TopBar";
import Card from "../components/ui/Card";
import Badge, { statusTone } from "../components/ui/Badge";

/* ---------------- data (swap for API later) ---------------- */

const FEEDBACK = [
  {
    id: 1,
    region: "Zinder Plateau",
    severity: "CRITICAL",
    icon: Droplet,
    tone: "red",
    time: "2 hours ago",
    dialect: "Hausa Dialect",
    duration: "0:24",
    progress: 0.35,
    transcription: "Ruwa ya kare a rijiya tun makonni biyu da suka wuce...",
    translation: "The water in our community wells ran dry two weeks ago. Cattle are suffering.",
    tags: ["drought", "water_security"],
    action: { label: "Assign Action", icon: CornerUpLeft, tone: "primary" },
    assignees: ["JD", "AK"],
  },
  {
    id: 2,
    region: "Lamu Coastal District",
    severity: "MODERATE",
    icon: Waves,
    tone: "green",
    time: "5 hours ago",
    dialect: "Swahili",
    duration: "0:12",
    progress: 0.15,
    transcription: "Mvua kubwa imesababisha barabara ya kuelekea soko kufungwa...",
    translation: "Heavy rain has caused the market access road to be blocked by mud.",
    tags: [],
    action: { label: "Mark as Resolved", icon: CheckCircle2, tone: "success" },
    assignees: [],
  },
  {
    id: 3,
    region: "Arba Minch",
    severity: "HIGH",
    icon: Thermometer,
    tone: "red",
    time: "8 hours ago",
    dialect: "Amharic",
    duration: "0:45",
    progress: 0.6,
    transcription: "መቀቀቱ በጣም እያሸመረ ነው፣ ህጻናት እና አረጋውያን እየታመሙ ነው...",
    translation: "The heat is increasing rapidly. Children and elderly are falling ill. We need cool zones.",
    tags: [],
    action: { label: "Forward to Health Dept", icon: Share2, tone: "primary" },
    assignees: ["MS"],
  },
];

const TILE = {
  red: "bg-danger-soft text-danger",
  green: "bg-success-soft text-success",
};

/* ---------------- local pieces ---------------- */

function AudioPlayer({ duration, progress }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="flex items-center gap-3 rounded-xl bg-canvas p-3">
      <button
        onClick={() => setPlaying((p) => !p)}
        className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary text-white"
        aria-label={playing ? "Pause" : "Play"}
      >
        {playing ? <Pause size={16} /> : <Play size={16} />}
      </button>
      <div className="h-1.5 flex-1 rounded-full bg-line">
        <div className="h-full rounded-full bg-primary" style={{ width: `${progress * 100}%` }} />
      </div>
      <span className="text-sm tabular-nums text-muted">{duration}</span>
    </div>
  );
}

function AvatarGroup({ people }) {
  const colors = ["bg-primary", "bg-success"];
  return (
    <div className="flex -space-x-2">
      {people.map((p, i) => (
        <span
          key={p}
          className={`grid h-7 w-7 place-items-center rounded-full border-2 border-surface text-[11px] font-bold text-white ${colors[i % 2]}`}
        >
          {p}
        </span>
      ))}
    </div>
  );
}

function FeedbackCard({ item }) {
  const { icon: Icon, action } = item;
  const ActionIcon = action.icon;
  const actionColor = action.tone === "success" ? "text-success" : "text-primary";
  return (
    <Card className="flex flex-col overflow-hidden">
      {/* header */}
      <div className="flex items-start gap-3 p-5">
        <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${TILE[item.tone]}`}>
          <Icon size={20} />
        </div>
        <div className="min-w-0">
          <div className="font-bold text-ink">{item.region}</div>
          <div className="mt-0.5 flex items-center gap-1.5 text-xs text-muted">
            <Clock size={13} /> {item.time} • {item.dialect}
          </div>
        </div>
        <div className="ml-auto">
          <Badge tone={statusTone(item.severity)}>{item.severity}</Badge>
        </div>
      </div>

      {/* body */}
      <div className="flex-1 px-5">
        <AudioPlayer duration={item.duration} progress={item.progress} />

        <div className="grid grid-cols-2 gap-4 py-4">
          <div>
            <div className="mb-1.5 text-[11px] font-semibold tracking-wide text-muted">
              AI TRANSCRIPTION
            </div>
            <p className="text-sm italic leading-relaxed text-ink/70">&ldquo;{item.transcription}&rdquo;</p>
          </div>
          <div>
            <div className="mb-1.5 text-[11px] font-semibold tracking-wide text-muted">
              ENGLISH TRANSLATION
            </div>
            <p className="text-sm leading-relaxed text-ink">&ldquo;{item.translation}&rdquo;</p>
          </div>
        </div>

        {item.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pb-4">
            {item.tags.map((t) => (
              <span key={t} className="rounded-md bg-chip px-2.5 py-1 text-xs font-medium text-chip-ink">
                #{t}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* footer */}
      <div className="mt-auto flex items-center justify-between border-t border-line bg-canvas/60 px-5 py-3">
        <button className={`flex items-center gap-2 text-sm font-semibold ${actionColor} hover:underline`}>
          <ActionIcon size={16} /> {action.label}
        </button>
        {item.assignees.length > 0 ? (
          <AvatarGroup people={item.assignees} />
        ) : (
          <span className="text-sm italic text-muted">No one assigned</span>
        )}
      </div>
    </Card>
  );
}

function HotspotCard() {
  return (
    <Card className="overflow-hidden">
      <div className="p-5">
        <div className="font-display text-lg font-extrabold text-ink">Hotspot Visualization</div>
        <div className="text-sm text-muted">Real-time feedback clustering</div>
      </div>
      <div
        className="relative mx-5 mb-5 h-72 overflow-hidden rounded-xl border border-line"
        style={{
          backgroundColor: "#edf0ea",
          backgroundImage:
            "radial-gradient(circle at 58% 42%, rgba(176,67,43,0.40), transparent 34%)," +
            "radial-gradient(circle at 38% 68%, rgba(31,122,84,0.32), transparent 32%)," +
            "radial-gradient(circle at 74% 66%, rgba(176,67,43,0.28), transparent 30%)," +
            "radial-gradient(circle at 25% 30%, rgba(31,122,84,0.20), transparent 26%)",
        }}
      >
        {/* legend */}
        <div className="absolute bottom-3 right-3 rounded-lg border border-line bg-surface/95 px-3 py-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-primary" /> Critical Reports
          </div>
          <div className="mt-1.5 flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-success" /> Resolved Issues
          </div>
        </div>
      </div>
    </Card>
  );
}

function FilterBar() {
  const [severity, setSeverity] = useState("All");
  return (
    <Card className="mb-6 flex flex-wrap items-end gap-5 p-5">
      <FilterSelect label="Region" options={["All Regions", "Marsabit North", "Laisamis"]} />
      <FilterSelect label="Hazard Type" options={["All Hazards", "Drought", "Flood", "Heat Wave"]} />

      <div>
        <div className="mb-2 text-xs font-semibold tracking-wide text-muted">Severity</div>
        <div className="flex gap-2">
          {["Critical", "High", "All"].map((s) => (
            <button
              key={s}
              onClick={() => setSeverity(s)}
              className={`rounded-lg border px-4 py-2 text-sm font-semibold transition-colors ${
                severity === s
                  ? "border-primary bg-primary text-white"
                  : "border-line bg-surface text-muted hover:text-ink"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <FilterSelect label="Date Range" options={["Last 7 Days", "Last 30 Days", "Today"]} icon={Calendar} />
    </Card>
  );
}

function FilterSelect({ label, options, icon: Icon }) {
  return (
    <label className="block min-w-44">
      <span className="mb-2 block text-xs font-semibold tracking-wide text-muted">{label}</span>
      <div className="relative">
        {Icon && (
          <Icon size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
        )}
        <select
          className={`w-full appearance-none rounded-xl border border-line bg-surface py-2.5 pr-9 text-[15px] font-semibold text-ink outline-none focus:border-primary ${
            Icon ? "pl-9" : "pl-4"
          }`}
        >
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
        <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted" />
      </div>
    </label>
  );
}

/* ---------------- page ---------------- */

export default function CommunityFeedbackPage() {
  const actions = (
    <>
      <button className="rounded-lg p-1.5 text-ink hover:bg-surface" aria-label="Notifications">
        <Bell size={20} />
      </button>
      <button className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-semibold text-white hover:brightness-110">
        <FileText size={18} /> Export Report
      </button>
    </>
  );

  return (
    <AppLayout
      user={{ name: "Admin User", detail: "admin@echoresilience.org", initials: "AU" }}
      topBar={<TopBar searchPlaceholder="Search feedback records..." actions={actions} />}
    >
      {/* title row */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-primary">
            Community Feedback
          </h1>
          <p className="mt-1 text-muted">
            Review and manage localized climate reporting from across active regions.
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-success-soft px-4 py-2 text-sm font-semibold text-success">
          <span className="h-2 w-2 rounded-full bg-success" />
          Live Reports: <span className="font-bold">142 Today</span>
        </span>
      </div>

      <FilterBar />

      {/* cards grid */}
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
        {FEEDBACK.map((item) => (
          <FeedbackCard key={item.id} item={item} />
        ))}
        <HotspotCard />
      </div>
    </AppLayout>
  );
}