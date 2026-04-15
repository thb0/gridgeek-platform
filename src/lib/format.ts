export function formatCurrency(value: number | null | undefined) {
  if (value === null || value === undefined) {
    return "N/A";
  }

  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0
  }).format(value);
}

export function formatNumber(value: number | null | undefined, suffix = "") {
  if (value === null || value === undefined) {
    return "N/A";
  }

  return `${new Intl.NumberFormat("en-GB", {
    maximumFractionDigits: 0
  }).format(value)}${suffix}`;
}

export function formatDate(value: string | null | undefined) {
  if (!value) {
    return "N/A";
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(new Date(value));
}

export function formatDays(value: number | null | undefined) {
  if (value === null || value === undefined) {
    return "N/A";
  }

  return `${Math.round(value)}d`;
}
