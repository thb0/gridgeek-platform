type MetricCardProps = {
  label: string;
  value: number;
  note: string;
};

export function MetricCard({ label, value, note }: MetricCardProps) {
  return (
    <article className="card metric-card h-100">
      <div className="card-body p-4">
        <p className="metric-card-label">{label}</p>
        <p className="metric-card-value">{value}</p>
        <p className="metric-card-note mb-0">{note}</p>
      </div>
    </article>
  );
}
