import Link from "next/link";
import { DataState } from "@/components/data-state";
import { StatusBadge } from "@/components/status-badge";
import { formatNumber } from "@/lib/format";
import { getSiteList } from "@/lib/platform-data";

export const dynamic = "force-dynamic";

export default async function SitesPage() {
  const sites = await getSiteList().catch(() => null);

  if (!sites) {
    return (
      <DataState
        title="Sites unavailable"
        message="This page will become live as soon as PostgreSQL is running and the starter schema has been applied."
      />
    );
  }

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body p-4">
        <div className="d-flex flex-column flex-lg-row justify-content-between gap-3 mb-4">
          <div>
            <h1 className="h3 mb-2">Sites</h1>
            <p className="mb-0 text-body-secondary">
              Master project register. Quotes, tenders, and route decisions all hang off the site record.
            </p>
          </div>
          <div className="small text-body-secondary">{sites.length} sites loaded</div>
        </div>

        {sites.length === 0 ? (
          <p className="mb-0 text-body-secondary">No sites found yet. Seed demo data to populate this page.</p>
        ) : (
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Customer</th>
                  <th>Postcode</th>
                  <th>DNO area</th>
                  <th>Load required</th>
                  <th>Status</th>
                  <th>DNO</th>
                  <th>IDNO</th>
                  <th>ICP</th>
                  <th>Next action</th>
                  <th>Owner</th>
                </tr>
              </thead>
              <tbody>
                {sites.map((site) => (
                  <tr key={site.id}>
                    <td>
                      <Link className="fw-semibold text-decoration-none" href={`/sites/${site.id}`}>
                        {site.name}
                      </Link>
                    </td>
                    <td>{site.customerName ?? "Unassigned"}</td>
                    <td>{site.postcode ?? "N/A"}</td>
                    <td>{site.dnoArea ?? "N/A"}</td>
                    <td>{formatNumber(site.loadRequiredKva, " kVA")}</td>
                    <td><StatusBadge value={site.status} /></td>
                    <td><StatusBadge value={site.dnoQuoteStatus} /></td>
                    <td><StatusBadge value={site.idnoTenderStatus} /></td>
                    <td><StatusBadge value={site.icpTenderStatus} /></td>
                    <td>{site.nextAction}</td>
                    <td>{site.internalOwner ?? "Unassigned"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
