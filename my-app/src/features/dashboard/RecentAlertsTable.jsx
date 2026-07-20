import { AlertOctagon } from "lucide-react";
import Card from "../../components/ui/Card";
import Badge, { statusTone } from "../../components/ui/Badge";

const COLS = "grid grid-cols-[1fr_1.1fr_1.2fr_1fr_0.9fr] gap-3 items-center";

export default function RecentAlertsTable({ alerts }) {
  return (
    <Card className="p-6">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="flex items-center gap-3 font-display text-xl font-extrabold text-ink">
          <AlertOctagon size={22} className="text-primary" />
          Recent Alerts
        </h2>
        <button className="font-bold text-primary hover:underline">View All</button>
      </div>

      {/* Header row */}
      <div className={`${COLS} border-b border-line px-2 py-3.5 text-[13px] font-semibold text-muted`}>
        <span>Alert ID</span>
        <span>Type</span>
        <span>Region</span>
        <span>Status</span>
        <span>Time</span>
      </div>

      {/* Data rows */}
      {alerts.map((a) => (
        <div key={a.id} className={`${COLS} border-b border-line px-2 py-4.5 text-[15px] last:border-none`}>
          <span className="font-bold text-primary">{a.id}</span>
          <span>{a.type}</span>
          <span>{a.region}</span>
          <span>
            <Badge tone={statusTone(a.status)}>{a.status}</Badge>
          </span>
          <span className="text-sm text-muted">{a.time}</span>
        </div>
      ))}
    </Card>
  );
}