import Link from "next/link";
import { DataState } from "@/components/data-state";
import { StatusBadge } from "@/components/status-badge";
import { formatCurrency, formatDate, formatDays } from "@/lib/format";
import { getIcpTenders } from "@/lib/platform-data";

export const dynamic = "force-dynamic";

export default async function IcpTendersPage() {
  try {
    const tenders = await getIcpTenders();

    return (
      <section className="card shadow-sm border-0">
        <div className="card-body p-4">
          <h1 className="h3 mb-2">ICP Tenders</h1>
          <p className="text-body-secondary mb-4">Contestable delivery pricing with return timing, duration, and status in one operational table.</p>
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead>
                <tr>
                  <th>Site</th>
                  <th>ICP</th>
                  <th>Contestable cost</th>
                  <th>Return date</th>
                  <th>Expiry</th>
                  <th>Duration</th>
                  <th>Status</th>
                  <th>Accepted</th>
                </tr>
              </thead>
              <tbody>
                {tenders.map((tender) => (
                  <tr key={tender.id}>
                    <td><Link className="text-decoration-none fw-semibold" href={`/sites/${tender.siteId}`}>{tender.siteName}</Link></td>
                    <td><Link className="text-decoration-none" href={`/suppliers/${tender.supplierId}`}>{tender.supplierName}</Link></td>
                    <td className="fw-semibold">{formatCurrency(tender.contestableWorksCost)}</td>
                    <td>{formatDate(tender.tenderReturnDate)}</td>
                    <td>{formatDate(tender.tenderExpiryDate)}<div className="small text-body-secondary">{formatDays(tender.daysToExpiry)}</div></td>
                    <td>{formatDays(tender.deliveryDurationDays)}</td>
                    <td><StatusBadge value={tender.status} /></td>
                    <td>{tender.accepted ? "Yes" : "No"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    );
  } catch {
    return <DataState title="ICP tenders unavailable" message="Start PostgreSQL, apply the schema, and seed data to activate this view." />;
  }
}
