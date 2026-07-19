// The white rounded container that wraps nearly every block in the app.
export default function Card({ className = "", children, ...props }) {
  return (
    <div
      className={`rounded-card border border-line bg-surface ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}