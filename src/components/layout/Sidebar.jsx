import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  TriangleAlert,
  MessageSquare,
  Map,
  Users,
  BarChart3,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../lib/auth";

const NAV = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/alerts", label: "Climate Alerts", icon: TriangleAlert },
  { to: "/feedback", label: "Community Feedback", icon: MessageSquare },
  { to: "/feedback-map", label: "Feedback Map", icon: Map },
  { to: "/communities", label: "Communities", icon: Users },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
];

const ROLE_LABELS = { superadmin: "Super Admin", admin: "Admin", viewer: "Viewer" };

function initialsFor(fullName) {
  const parts = fullName?.trim().split(/\s+/) ?? [];
  return (parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "") || "AU";
}

// `user` prop is an optional override; by default the signed-in account
// (from AuthProvider) drives the name/role/initials shown here.
export default function Sidebar({ user: userOverride }) {
  const { user: authUser, logout } = useAuth();
  const navigate = useNavigate();

  const user = userOverride ?? {
    name: authUser?.fullName ?? "Admin User",
    detail: authUser ? (ROLE_LABELS[authUser.role] ?? authUser.role) : "admin@echo.org",
    initials: authUser ? initialsFor(authUser.fullName).toUpperCase() : "AU",
  };

  function handleSignOut() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <aside className="hidden w-70 shrink-0 flex-col border-r border-line bg-sidebar px-5 py-6 md:flex">
      {/* Brand */}
      <div className="mb-10 flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary">
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path
              d="M12 3C7 3 3.5 6.5 3.5 12c0 4 2.5 7 6 8 0-4 1.5-7 5-9-2.5 3-3.5 6-3.5 9 4-1 8-4.5 8-10C19 6 16 3 12 3Z"
              fill="#fff"
            />
          </svg>
        </div>
        <div>
          <div className="font-display text-lg font-extrabold leading-none text-primary">
            EchoResilience
          </div>
          <div className="mt-1 text-xs text-muted">Climate Admin</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex flex-1 flex-col gap-1.5">
        {NAV.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3.5 rounded-xl px-4 py-3 text-[15px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                isActive
                  ? "bg-primary-soft font-semibold text-primary shadow-[inset_3px_0_0_var(--color-primary)]"
                  : "text-muted hover:bg-primary-soft/40 hover:text-ink"
              }`
            }
          >
            <Icon size={20} strokeWidth={2} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User card */}
      <div className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-3">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary text-xs font-bold text-white">
          {user.initials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-bold text-ink">{user.name}</div>
          <div className="truncate text-xs text-muted">{user.detail}</div>
        </div>
        <button
          onClick={handleSignOut}
          className="rounded-lg p-1.5 text-ink hover:bg-canvas focus-visible:outline-2 focus-visible:outline-primary"
          aria-label="Sign out"
        >
          <LogOut size={18} />
        </button>
      </div>
    </aside>
  );
}