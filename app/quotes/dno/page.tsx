import Link from "next/link";
import { DataState } from "@/components/data-state";
import { StatusBadge } from "@/components/status-badge";
import { formatCurrency, formatDate, formatDays, formatNumber } from "@/lib/format";
import { getDnoQuotes } from "@/lib/platform-data";

export const dynamic = "force-dynamic";

export default async function DnoQuotesPage() {
  const quotes = await getDnoQuotes().catch(() => null);

  if (!quotes) {
    return <DataState title="DNO quotes unavailable" message="Start PostgreSQL, apply the schema, and seed data to activate this view." />;
  }

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body p-4">
        <h1 className="h3 mb-2">DNO Quotes</h1>
        <p className="text-body-secondary mb-4">Track applications, quote returns, expiry pressure, and direct DNO route cost.</p>
        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead>
              <tr>
                <th>Site</th>
                <th>DNO</th>
                <th>Ref</th>
                <th>Application</th>
                <th>Received</th>
                <th>Expiry</th>
                <th>Cost</th>
                <th>Capacity</th>
                <th>Status</th>
                <th>Accepted</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((quote) => (
                <tr key={quote.id}>
                  <td><Link className="text-decoration-none fw-semibold" href={`/sites/${quote.siteId}`}>{quote.siteName}</Link></td>
                  <td><Link className="text-decoration-none" href={`/suppliers/${quote.supplierId}`}>{quote.supplierName}</Link></td>
                  <td>{quote.dnoReference ?? "N/A"}</td>
                  <td>{formatDate(quote.applicationDate)}</td>
                  <td>{formatDate(quote.quoteReceivedDate)}</td>
                  <td>{formatDate(quote.quoteExpiryDate)}<div className="small text-body-secondary">{formatDays(quote.daysToExpiry)}</div></td>
                  <td>{formatCurrency(quote.costExVat)}</td>
                  <td>{formatNumber(quote.capacityOfferedKva, " kVA")}</td>
                  <td><StatusBadge value={quote.status} /></td>
                  <td>{quote.accepted ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
