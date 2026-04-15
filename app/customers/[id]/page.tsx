import Link from "next/link";
import { notFound } from "next/navigation";
import { StatusBadge } from "@/components/status-badge";
import { formatNumber } from "@/lib/format";
import { getCustomerDetail, requireOrganizationSetup } from "@/lib/platform-data";

export const dynamic = "force-dynamic";

export default async function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await requireOrganizationSetup();
  const { id } = await params;
  const customer = await getCustomerDetail(id);

  if (!customer) {
    notFound();
  }

  return (
    <div className="d-grid gap-4">
      <section className="card shadow-sm border-0">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-start gap-3 flex-wrap">
            <div>
              <p className="small text-uppercase fw-semibold text-body-secondary mb-2">Customer summary</p>
              <h1 className="h3 mb-2">{customer.name}</h1>
              <p className="text-body-secondary mb-0">Client account record with related sites and key contacts.</p>
            </div>
            <StatusBadge value={customer.status} />
          </div>
        </div>
      </section>

      <section className="row g-4">
        <div className="col-lg-4">
          <article className="card shadow-sm border-0 h-100">
            <div className="card-body p-4">
              <h2 className="h5">Key contacts</h2>
              <p className="mb-1"><strong>Main contact:</strong> {customer.mainContact ?? "N/A"}</p>
              <p className="mb-1"><strong>Email:</strong> {customer.email ?? "N/A"}</p>
              <p className="mb-1"><strong>Phone:</strong> {customer.phone ?? "N/A"}</p>
              <p className="mb-0"><strong>Account owner:</strong> {customer.accountOwner ?? "N/A"}</p>
            </div>
          </article>
        </div>
        <div className="col-lg-4">
          <article className="card shadow-sm border-0 h-100">
            <div className="card-body p-4">
              <h2 className="h5">Billing</h2>
              <p className="mb-0 text-body-secondary">{customer.billingAddress ?? "No billing address recorded."}</p>
            </div>
          </article>
        </div>
        <div className="col-lg-4">
          <article className="card shadow-sm border-0 h-100">
            <div className="card-body p-4">
              <h2 className="h5">Notes</h2>
              <p className="mb-0 text-body-secondary">{customer.notes ?? "No notes recorded."}</p>
            </div>
          </article>
        </div>
      </section>

      <section className="card shadow-sm border-0">
        <div className="card-body p-4">
          <h2 className="h5 mb-3">Related sites</h2>
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead>
                <tr>
                  <th>Site</th>
                  <th>Postcode</th>
                  <th>DNO area</th>
                  <th>Load required</th>
                  <th>Status</th>
                  <th>Next action</th>
                </tr>
              </thead>
              <tbody>
                {customer.sites.map((site) => (
                  <tr key={site.id}>
                    <td><Link className="text-decoration-none fw-semibold" href={`/sites/${site.id}`}>{site.name}</Link></td>
                    <td>{site.postcode ?? "N/A"}</td>
                    <td>{site.dnoArea ?? "N/A"}</td>
                    <td>{formatNumber(site.loadRequiredKva, " kVA")}</td>
                    <td><StatusBadge value={site.status} /></td>
                    <td>{site.nextAction}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
