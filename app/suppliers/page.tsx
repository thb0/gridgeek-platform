import Link from "next/link";
import { DataState } from "@/components/data-state";
import { StatusBadge } from "@/components/status-badge";
import { formatDays } from "@/lib/format";
import { getSupplierList } from "@/lib/platform-data";

const supplierTypes = ["All", "DNO", "IDNO", "ICP", "Other"];

export const dynamic = "force-dynamic";

export default async function SuppliersPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const selectedType = typeof params.type === "string" ? params.type : "All";
  const suppliers = await getSupplierList(selectedType).catch(() => null);

  if (!suppliers) {
    return (
      <DataState
        title="Suppliers unavailable"
        message="This page will become live as soon as PostgreSQL is running and the starter schema has been applied."
      />
    );
  }

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body p-4">
        <div className="d-flex flex-column flex-lg-row justify-content-between gap-3 mb-4">
          <div>
            <h1 className="h3 mb-2">Suppliers</h1>
            <p className="mb-0 text-body-secondary">
              Single supplier register across DNO, IDNO, ICP, and any other commercial partners.
            </p>
          </div>
          <div className="d-flex flex-wrap gap-2">
            {supplierTypes.map((type) => (
              <Link
                key={type}
                className={`btn btn-sm ${selectedType === type ? "btn-primary" : "btn-outline-primary"}`}
                href={type === "All" ? "/suppliers" : `/suppliers?type=${type}`}
              >
                {type}
              </Link>
            ))}
          </div>
        </div>

        {suppliers.length === 0 ? (
          <p className="mb-0 text-body-secondary">No suppliers found yet. Seed demo data to populate this page.</p>
        ) : (
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Region</th>
                  <th>Live tenders/quotes</th>
                  <th>Win count</th>
                  <th>Average return</th>
                </tr>
              </thead>
              <tbody>
                {suppliers.map((supplier) => (
                  <tr key={supplier.id}>
                    <td>
                      <Link className="fw-semibold text-decoration-none" href={`/suppliers/${supplier.id}`}>
                        {supplier.name}
                      </Link>
                      <div className="small text-body-secondary">{supplier.frameworkStatus ?? "No framework note"}</div>
                    </td>
                    <td><StatusBadge value={supplier.supplierType} /></td>
                    <td>{supplier.region ?? "N/A"}</td>
                    <td>{supplier.liveOpportunityCount}</td>
                    <td>{supplier.winCount}</td>
                    <td>{formatDays(supplier.averageReturnDays)}</td>
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
