import { MessagesSquare, Send } from "lucide-react";
import Card from "../../components/ui/Card";

function Tag({ label }) {
  const tone = label === "URGENT" ? "bg-danger-soft text-danger" : "bg-chip text-chip-ink";
  return (
    <span className={`rounded-md px-2.5 py-1 text-[11px] font-bold tracking-wide ${tone}`}>
      {label}
    </span>
  );
}

export default function LiveFeedbackPanel({ feedback }) {
  return (
    <Card className="flex flex-col p-6">
      <div className="mb-4.5 flex items-center justify-between">
        <h2 className="flex items-center gap-3 font-display text-xl font-extrabold text-ink">
          <MessagesSquare size={22} className="text-success" />
          Live Feedback
        </h2>
        <span className="h-3 w-3 rounded-full bg-success shadow-[0_0_0_4px_var(--color-success-soft)]" />
      </div>

      <div className="flex flex-1 flex-col gap-3.5">
        {feedback.map((f) => (
          <div
            key={f.id}
            className={
              f.highlight
                ? "rounded-2xl bg-primary-soft/40 p-4 shadow-[inset_4px_0_0_var(--color-success)]"
                : "rounded-2xl border border-line p-4"
            }
          >
            <div className="mb-2 flex items-baseline justify-between">
              <span className="text-[15px] font-bold">{f.name}</span>
              <span className="text-xs text-muted">{f.time}</span>
            </div>
            <p className="mb-3 text-[15px] italic leading-snug text-ink/80">“{f.quote}”</p>
            <div className="flex flex-wrap gap-2">
              {f.tags.map((t) => (
                <Tag key={t} label={t} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Reply box */}
      <div className="mt-4 flex items-center gap-2 rounded-xl border border-line py-1.5 pl-4 pr-1.5">
        <input
          className="min-w-0 flex-1 bg-transparent text-[15px] outline-none placeholder:text-muted"
          placeholder="Post official response..."
          aria-label="Post official response"
        />
        <button
          className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary text-white hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          aria-label="Send response"
        >
          <Send size={18} />
        </button>
      </div>
    </Card>
  );
}