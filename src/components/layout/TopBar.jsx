import { Search, Bell } from "lucide-react";
import { useAuth } from "../../lib/auth";

// Built as a shell with slots so every page can reuse it:
//   - `title`            left-side heading (Dashboard shows "Welcome back, Admin")
//   - `searchPlaceholder` the search input copy
//   - `actions`          right-side node (defaults to bell + profile)
// Other pages will pass their own `actions` (Export Report, region picker, etc.).
export default function TopBar({
  title,
  titleExtra,
  searchPlaceholder = "Global search...",
  showSearch = true,
  actions,
}) {
  return (
    <header className="flex flex-wrap items-center gap-5 px-8 py-6">
      {title && (
        <h1 className="font-display text-2xl font-extrabold tracking-tight text-primary">
          {title}
        </h1>
      )}
      {titleExtra}

      {showSearch && (
        <label className="flex max-w-md flex-1 items-center gap-2.5 rounded-full border border-line bg-surface px-4 py-2.5 text-muted focus-within:border-primary">
          <Search size={18} />
          <input
            className="min-w-0 flex-1 bg-transparent text-[15px] text-ink outline-none placeholder:text-muted"
            placeholder={searchPlaceholder}
            aria-label={searchPlaceholder}
          />
        </label>
      )}

      <div className="ml-auto flex items-center gap-4">
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
        className="rounded-lg p-1.5 text-ink hover:bg-surface focus-visible:outline-2 focus-visible:outline-primary"
        aria-label="Notifications"
      >
        <Bell size={20} />
      </button>
      <div className="h-7 w-px bg-line" />
      <div className="flex items-center gap-2.5">
        <div className="grid h-9 w-9 place-items-center rounded-full bg-primary text-xs font-bold text-white">
          {initials}
        </div>
        <span className="hidden text-[15px] font-semibold sm:inline">
          {user?.fullName ?? "Admin Profile"}
        </span>
      </div>
    </>
  );
}