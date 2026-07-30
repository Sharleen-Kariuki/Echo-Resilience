export default function Card({ className = "", children, ...props }) {
  return (
    <div className={`border border-line bg-surface ${className}`} {...props}>
      {children}
    </div>
  );
}
