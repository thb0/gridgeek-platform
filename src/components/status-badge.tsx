type StatusBadgeProps = {
  value: string | null | undefined;
};

export function StatusBadge({ value }: StatusBadgeProps) {
  if (!value) {
    return <span className="badge text-bg-secondary-subtle text-secondary-emphasis">N/A</span>;
  }

  return <span className="badge text-bg-light text-uppercase">{value}</span>;
}
