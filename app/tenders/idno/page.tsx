import Link from "next/link";
import { DataState } from "@/components/data-state";
import { StatusBadge } from "@/components/status-badge";
import { formatCurrency, formatDate, formatDays } from "@/lib/format";
import { getIdnoTenders } from "@/lib/platform-data";

export const dynamic = "force-dynamic";

export default async function IdnoTendersPage() {
  const tenders = await getIdnoTenders().catch(() => null);

  if (!tenders) {
    return <DataState title="IDNO tenders unavailable" message="Start PostgreSQL, apply the schema, and seed data to activate this view." />;
  }

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body p-4">
        <h1 className="h3 mb-2">IDNO Tenders</h1>
        <p className="text-body-secondary mb-4">Asset value mechanics are front and centre here, with net cost highlighted for route comparison.</p>
        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead>
              <tr>
                <th>Site</th>
                <th>IDNO</th>
                <th>Gross cost</th>
                <th>Asset value</th>
                <th>Net cost</th>
                <th>Return</th>
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
                  <td>{formatCurrency(tender.grossAdoptableWorksValue)}</td>
                  <td>{formatCurrency(tender.assetValuePayment)}</td>
                  <td className="fw-semibold">{formatCurrency(tender.netCostToBusiness)}</td>
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
}
