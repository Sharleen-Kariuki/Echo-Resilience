import { Search, Bell } from "lucide-react";
import { useAuth } from "../../lib/auth";

export default function TopBar({
  eyebrow,
  title,
  titleExtra,
  subtitle,
  searchPlaceholder = "Search alerts, regions, feedback…",
  showSearch = true,
  actions,
}) {
  return (
    <header className="flex flex-wrap items-center gap-4 px-8 pb-2 pt-6">
      {(eyebrow || title || subtitle) && (
        <div className="min-w-0 shrink-0">
          {eyebrow && (
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
              {eyebrow}
            </p>
          )}
          {title && (
            <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">
              {title}
            </h1>
          )}
          {subtitle && <p className="mt-0.5 text-sm text-muted">{subtitle}</p>}
        </div>
      )}
      {titleExtra}

      {showSearch && (
        <label className="flex max-w-sm flex-1 items-center gap-2 rounded-md border border-line bg-surface px-3.5 py-2 text-muted focus-within:border-primary/60 focus-within:ring-2 focus-within:ring-primary/15">
          <Search size={17} strokeWidth={2} />
          <input
            className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted"
            placeholder={searchPlaceholder}
            aria-label={searchPlaceholder}
          />
        </label>
      )}

      <div className="ml-auto flex items-center gap-3">
        {actions ?? <DefaultActions />}
      </div>
    </header>
  );
}

function DefaultActions() {
  const { user } = useAuth();
  const initials = (user?.fullName?.trim().split(/\s+/) ?? [])
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase() || "AU";

  return (
    <>
      <button
        className="relative rounded-lg p-2 text-ink hover:bg-surface focus-visible:outline-2 focus-visible:outline-primary"
        aria-label="Notifications"
      >
        <Bell size={19} strokeWidth={2} />
        <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-clay ring-2 ring-canvas" />
      </button>
      <div className="flex items-center gap-2.5 rounded-md border border-line bg-surface py-1 pl-1 pr-3">
        <div className="grid h-8 w-8 place-items-center rounded-md bg-primary font-mono text-[11px] font-semibold text-white">
          {initials}
        </div>
        <span className="hidden text-sm font-medium sm:inline">
          {user?.fullName ?? "Admin"}
        </span>
      </div>
    </>
  );
}
