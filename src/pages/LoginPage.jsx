import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import AuthShell from "../components/auth/AuthShell";
import { useAuth } from "../lib/auth";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showForgotHint, setShowForgotHint] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await login(email, password, remember);
      navigate(location.state?.from?.pathname ?? "/", { replace: true });
    } catch (err) {
      console.error(err);
      const isTechnical = !err.message || /request failed|failed to fetch|networkerror/i.test(err.message);
      setError(isTechnical ? "Couldn't sign you in right now. Please try again." : err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthShell
      heading="Sign In"
      description="Access the resilience dashboard and climate data."
      footer={
        <>
          New to the administration?{" "}
          <Link to="/register" className="font-bold text-primary hover:underline">
            Register account
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold tracking-wide text-muted">ADMINISTRATOR EMAIL</span>
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-md border border-line bg-canvas px-3.5 py-2.5 text-sm text-ink outline-none focus:border-primary placeholder:text-muted/70"
          />
        </label>

        <label className="block">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-xs font-semibold tracking-wide text-muted">SECURITY PASSWORD</span>
            <button
              type="button"
              onClick={() => setShowForgotHint((current) => !current)}
              className="text-xs font-semibold text-primary hover:underline"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <Lock size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type={showPassword ? "text" : "password"}
              required
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••••••"
              className="w-full rounded-md border border-line bg-canvas py-2.5 pl-9 pr-9 text-sm text-ink outline-none focus:border-primary"
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
          {showForgotHint && (
            <p className="mt-1.5 text-xs text-muted">Contact your system administrator to reset your password.</p>
          )}
        </label>

        <label className="flex items-center gap-2 text-sm text-ink">
          <input
            type="checkbox"
            checked={remember}
            onChange={(event) => setRemember(event.target.checked)}
            className="h-4 w-4 rounded border-line accent-[var(--color-primary)]"
          />
          Remember this session
        </label>

        {error && <p className="text-sm text-danger">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-primary py-3 font-semibold text-white hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Signing in..." : "Sign In"} <ArrowRight size={16} />
        </button>
      </form>
    </AuthShell>
  );
}
