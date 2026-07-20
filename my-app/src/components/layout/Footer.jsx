const LINKS = ["Privacy Policy", "Terms of Service", "Help Center", "API Documentation"];

export default function Footer() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-5 px-8 py-6">
      <span className="text-sm font-semibold text-ink">
        © 2024 EchoResilience Humanitarian Network. All rights reserved.
      </span>
      <nav className="flex flex-wrap gap-x-8 gap-y-2">
        {LINKS.map((label) => (
          <a
            key={label}
            href="#"
            onClick={(e) => e.preventDefault()}
            className="text-sm text-muted hover:text-primary"
          >
            {label}
          </a>
        ))}
      </nav>
    </footer>
  );
}