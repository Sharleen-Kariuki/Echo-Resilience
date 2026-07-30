import Logo from "../ui/Logo";

// Shared card chrome for Login/Register — logo, brand, and heading, matching
// the app's Sidebar brand block so the auth pages read as part of the same product.
export default function AuthShell({ heading, description, children, footer }) {
  return (
    <div className="grid min-h-screen place-items-center bg-canvas px-4 py-10">
      <div className="w-full max-w-sm border border-line bg-surface p-8">
        <div className="mb-6 flex flex-col items-center text-center">
          <Logo size={56} className="mb-4" />
          <div className="font-display text-2xl font-bold text-primary">EchoResilience</div>
          <div className="mt-1 text-xs font-semibold tracking-widest text-muted">ENVIRONMENTAL ADMINISTRATION</div>
        </div>

        <div className="mb-6 border-t border-line pt-6">
          <h1 className="font-display text-xl font-bold text-ink">{heading}</h1>
          {description && <p className="mt-1 text-sm text-muted">{description}</p>}
        </div>

        {children}

        {footer && <div className="mt-6 border-t border-line pt-5 text-center text-sm text-muted">{footer}</div>}
      </div>
    </div>
  );
}
