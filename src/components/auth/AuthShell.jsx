// Shared card chrome for Login/Register — logo, brand, and heading, matching
// the app's Sidebar brand block so the auth pages read as part of the same product.
export default function AuthShell({ heading, description, children, footer }) {
  return (
    <div className="grid min-h-screen place-items-center bg-canvas px-4 py-10">
      <div className="w-full max-w-sm rounded-card border border-line bg-surface p-8 shadow-sm">
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-primary">
            <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
              <path
                d="M12 3C7 3 3.5 6.5 3.5 12c0 4 2.5 7 6 8 0-4 1.5-7 5-9-2.5 3-3.5 6-3.5 9 4-1 8-4.5 8-10C19 6 16 3 12 3Z"
                fill="#fff"
              />
            </svg>
          </div>
          <div className="font-display text-2xl font-extrabold text-primary">EchoResilience</div>
          <div className="mt-1 text-xs font-semibold tracking-widest text-muted">ENVIRONMENTAL ADMINISTRATION</div>
        </div>

        <div className="mb-6 border-t border-line pt-6">
          <h1 className="font-display text-xl font-extrabold text-ink">{heading}</h1>
          {description && <p className="mt-1 text-sm text-muted">{description}</p>}
        </div>

        {children}

        {footer && <div className="mt-6 border-t border-line pt-5 text-center text-sm text-muted">{footer}</div>}
      </div>
    </div>
  );
}
