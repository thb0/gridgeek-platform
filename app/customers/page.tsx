import Link from "next/link";
import { DataState } from "@/components/data-state";
import { StatusBadge } from "@/components/status-badge";
import { formatCurrency, formatDate } from "@/lib/format";
import { getCustomerList } from "@/lib/platform-data";

export const dynamic = "force-dynamic";

export default async function CustomersPage() {
  const customers = await getCustomerList().catch(() => null);

  if (!customers) {
    return (
      <DataState
        title="Customers unavailable"
        message="This page will become live as soon as PostgreSQL is running and the starter schema has been applied."
      />
    );
  }

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body p-4">
        <div className="d-flex flex-column flex-lg-row justify-content-between gap-3 mb-4">
          <div>
            <h1 className="h3 mb-2">Customers</h1>
            <p className="mb-0 text-body-secondary">
              One record per client, with related sites and commercial totals rolling up from the site layer.
            </p>
          </div>
          <div className="small text-body-secondary">{customers.length} customers loaded</div>
        </div>

        {customers.length === 0 ? (
          <p className="mb-0 text-body-secondary">No customers found yet. Seed demo data to populate this page.</p>
        ) : (
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Active sites</th>
                  <th>Total quoted value</th>
                  <th>Total accepted value</th>
                  <th>Last activity</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id}>
                    <td>
                      <Link className="fw-semibold text-decoration-none" href={`/customers/${customer.id}`}>
                        {customer.name}
                      </Link>
                      <div className="small text-body-secondary">{customer.mainContact ?? customer.accountOwner ?? "No owner"}</div>
                    </td>
                    <td>{customer.activeSites}</td>
                    <td>{formatCurrency(customer.totalQuotedValue)}</td>
                    <td>{formatCurrency(customer.totalAcceptedValue)}</td>
                    <td>{formatDate(customer.lastActivityAt)}</td>
                    <td><StatusBadge value={customer.status} /></td>
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
