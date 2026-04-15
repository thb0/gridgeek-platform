import Link from "next/link";
import { DataState } from "@/components/data-state";
import { StatusBadge } from "@/components/status-badge";
import { formatCurrency, formatDays } from "@/lib/format";
import { getCommercialComparisonList } from "@/lib/platform-data";

export const dynamic = "force-dynamic";

export default async function ComparisonPage() {
  try {
    const comparisons = await getCommercialComparisonList();

    return (
      <section className="card shadow-sm border-0">
        <div className="card-body p-4">
          <h1 className="h3 mb-2">Commercial Comparison</h1>
          <p className="text-body-secondary mb-4">Compare DNO direct, IDNO net, and ICP route signals site by site.</p>
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead>
                <tr>
                  <th>Site</th>
                  <th>DNO direct</th>
                  <th>IDNO net</th>
                  <th>ICP cost</th>
                  <th>Lowest net cost</th>
                  <th>Fastest route</th>
                  <th>Recommended route</th>
                  <th>Budget variance</th>
                  <th>Expiry pressure</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((comparison) => (
                  <tr key={comparison.siteId}>
                    <td>
                      <Link className="text-decoration-none fw-semibold" href={`/sites/${comparison.siteId}`}>
                        {comparison.siteName}
                      </Link>
                      <div className="small text-body-secondary">{comparison.customerName ?? "No customer"}</div>
                    </td>
                    <td>{formatCurrency(comparison.dnoDirectCost)}</td>
                    <td>{formatCurrency(comparison.bestIdnoNetCost)}</td>
                    <td>{formatCurrency(comparison.bestIcpCost)}</td>
                    <td className="fw-semibold">{formatCurrency(comparison.lowestNetCost)}</td>
                    <td>{formatDays(comparison.fastestRouteDays)}</td>
                    <td>{comparison.recommendedRoute}</td>
                    <td>{formatCurrency(comparison.budgetVariance)}</td>
                    <td><StatusBadge value={comparison.expiryPressure} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    );
  } catch {
    return <DataState title="Comparison unavailable" message="Start PostgreSQL, apply the schema, and seed data to activate this view." />;
  }
}
