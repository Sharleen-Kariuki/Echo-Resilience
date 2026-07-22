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
import Logo from "../ui/Logo";

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
    detail: authUser ? (ROLE_LABELS[authUser.role] ?? authUser.role) : "Administrator",
    initials: authUser ? initialsFor(authUser.fullName).toUpperCase() : "AU",
  };

  function handleSignOut() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <aside className="hidden w-70 shrink-0 flex-col bg-sidebar px-5 py-6 md:flex">
      {/* Brand */}
      <div className="mb-10 flex items-center gap-3 px-1">
        <Logo size={36} />
        <div>
          <div className="font-display text-lg font-semibold leading-none tracking-tight text-sidebar-ink">
            Echo<span className="text-primary">Resilience</span>
          </div>
          <div className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-sidebar-muted">
            Climate Admin
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex flex-1 flex-col gap-1">
        {NAV.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3.5 border-l-2 px-4 py-2.5 text-[15px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                isActive
                  ? "border-primary font-semibold text-sidebar-ink"
                  : "border-transparent text-sidebar-muted hover:border-sidebar-line hover:text-sidebar-ink"
              }`
            }
          >
            <Icon size={18} strokeWidth={2} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User card */}
      <div className="flex items-center gap-3 border-t border-sidebar-line pt-4">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-primary-soft font-mono text-xs font-semibold text-primary">
          {user.initials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-semibold text-sidebar-ink">{user.name}</div>
          <div className="truncate text-xs text-sidebar-muted">{user.detail}</div>
        </div>
        <button
          onClick={handleSignOut}
          className="rounded-md p-1.5 text-sidebar-muted hover:bg-sidebar-line hover:text-sidebar-ink focus-visible:outline-2 focus-visible:outline-primary"
          aria-label="Sign out"
        >
          <LogOut size={18} />
        </button>
      </div>
    </aside>
  );
}