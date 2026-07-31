// Shared brand mark — used on the auth screens and in the sidebar so the
// product reads as one identity everywhere it appears.
export default function Logo({ size = 40, className = "" }) {
  return (
    <div
      className={`grid shrink-0 place-items-center rounded-md bg-primary ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 24 24" width={size * 0.62} height={size * 0.62} aria-hidden="true">
        <path
          d="M12 3C7 3 3.5 6.5 3.5 12c0 4 2.5 7 6 8 0-4 1.5-7 5-9-2.5 3-3.5 6-3.5 9 4-1 8-4.5 8-10C19 6 16 3 12 3Z"
          fill="#fff"
        />
      </svg>
    </div>
  );
}
