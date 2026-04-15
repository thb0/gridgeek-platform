type StatusBadgeProps = {
  value: string | null | undefined;
};

export function StatusBadge({ value }: StatusBadgeProps) {
  if (!value) {
    return <span className="status-badge status-badge-muted">N/A</span>;
  }

  return <span className={`status-badge ${statusClassName(value)}`}>{value}</span>;
}

function statusClassName(value: string) {
  const normalized = value.toLowerCase();

  if (normalized.includes("accepted") || normalized.includes("energised") || normalized.includes("received")) {
    return "status-badge-good";
  }

  if (normalized.includes("review") || normalized.includes("pending") || normalized.includes("requested") || normalized.includes("clarification")) {
    return "status-badge-warn";
  }

  if (normalized.includes("expired") || normalized.includes("rejected") || normalized.includes("closed")) {
    return "status-badge-bad";
  }

  if (normalized.includes("not required")) {
    return "status-badge-muted";
  }

  return "status-badge-neutral";
}
