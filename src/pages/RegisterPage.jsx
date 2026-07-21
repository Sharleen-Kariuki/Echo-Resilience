import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import AuthShell from "../components/auth/AuthShell";
import { useAuth } from "../lib/auth";

const ROLE_OPTIONS = [
  { id: "viewer", name: "Viewer — read-only access" },
  { id: "admin", name: "Admin — manage alerts & communities" },
  { id: "superadmin", name: "Super Admin — full access" },
];

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      await register({ fullName, email, password, role });
      navigate("/", { replace: true });
    } catch (err) {
      console.error(err);
      setError(err.message || "Could not create this account.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthShell
      heading="Create Account"
      description="Register to manage EchoResilience alerts and community data."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-primary hover:underline">
            Sign In
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold tracking-wide text-muted">FULL NAME</span>
          <input
            required
            autoComplete="name"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            placeholder="Jane Doe"
            className="w-full rounded-xl border border-line bg-canvas px-3.5 py-2.5 text-sm text-ink outline-none focus:border-primary"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold tracking-wide text-muted">ADMINISTRATOR EMAIL</span>
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="admin@echoresilience.gov"
            className="w-full rounded-xl border border-line bg-canvas px-3.5 py-2.5 text-sm text-ink outline-none focus:border-primary"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold tracking-wide text-muted">SECURITY PASSWORD</span>
          <div className="relative">
            <Lock size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type={showPassword ? "text" : "password"}
              required
              minLength={8}
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••••••"
              className="w-full rounded-xl border border-line bg-canvas py-2.5 pl-9 pr-9 text-sm text-ink outline-none focus:border-primary"
            />
            <button
              type="button"
              onClick={() => setShowPassword((current) => !current)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold tracking-wide text-muted">CONFIRM PASSWORD</span>
          <input
            type={showPassword ? "text" : "password"}
            required
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="••••••••••••"
            className="w-full rounded-xl border border-line bg-canvas px-3.5 py-2.5 text-sm text-ink outline-none focus:border-primary"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold tracking-wide text-muted">ROLE</span>
          <select
            value={role}
            onChange={(event) => setRole(event.target.value)}
            className="w-full rounded-xl border border-line bg-canvas px-3.5 py-2.5 text-sm text-ink outline-none focus:border-primary"
          >
            {ROLE_OPTIONS.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </label>

        {error && <p className="text-sm text-danger">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 font-semibold text-white hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Creating account..." : "Create Account"} <ArrowRight size={16} />
        </button>
      </form>
    </AuthShell>
  );
}
