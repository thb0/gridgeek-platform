type MetricCardProps = {
  label: string;
  value: number;
  note: string;
};

export function MetricCard({ label, value, note }: MetricCardProps) {
  return (
    <article className="card shadow-sm border-0 h-100">
      <div className="card-body">
        <p className="text-uppercase small fw-semibold text-body-secondary mb-2">{label}</p>
        <p className="display-6 mb-1">{value}</p>
        <p className="mb-0 text-body-secondary small">{note}</p>
      </div>
    </article>
  );
}
