import Link from "next/link";
import { notFound } from "next/navigation";
import { StatusBadge } from "@/components/status-badge";
import { formatCurrency, formatDate, formatDays, formatNumber } from "@/lib/format";
import { getSiteDetail } from "@/lib/platform-data";

export const dynamic = "force-dynamic";

export default async function SiteDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const site = await getSiteDetail(id);

  if (!site) {
    notFound();
  }

  return (
    <div className="d-grid gap-4">
      <section className="card shadow-sm border-0">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-start gap-3 flex-wrap">
            <div>
              <p className="small text-uppercase fw-semibold text-body-secondary mb-2">Site detail</p>
              <h1 className="h3 mb-2">{site.name}</h1>
              <p className="text-body-secondary mb-0">This is the working hub for route comparison, tender review, and next-action decisions.</p>
            </div>
            <StatusBadge value={site.status} />
          </div>
        </div>
      </section>

      <section className="row g-4">
        <div className="col-xl-6">
          <article className="card shadow-sm border-0 h-100">
            <div className="card-body p-4">
              <h2 className="h5">Site summary</h2>
              <p className="mb-1"><strong>Customer:</strong> {site.customerId ? <Link href={`/customers/${site.customerId}`}>{site.customerName}</Link> : "Unassigned"}</p>
              <p className="mb-1"><strong>Address:</strong> {site.address ?? "N/A"}</p>
              <p className="mb-1"><strong>Postcode:</strong> {site.postcode ?? "N/A"}</p>
              <p className="mb-1"><strong>DNO area:</strong> {site.dnoArea ?? "N/A"}</p>
              <p className="mb-1"><strong>IDNO area:</strong> {site.idnoArea ?? "N/A"}</p>
              <p className="mb-1"><strong>Voltage sought:</strong> {site.voltageLevelSought ?? "N/A"}</p>
              <p className="mb-1"><strong>Load required:</strong> {formatNumber(site.loadRequiredKva, " kVA")}</p>
              <p className="mb-1"><strong>Export required:</strong> {formatNumber(site.exportRequiredKva, " kVA")}</p>
              <p className="mb-1"><strong>Battery included:</strong> {site.batteryIncluded ? "Yes" : "No"}</p>
              <p className="mb-1"><strong>Charger count / type:</strong> {site.chargerCount ?? "N/A"} {site.chargerType ? `(${site.chargerType})` : ""}</p>
              <p className="mb-1"><strong>Target energisation:</strong> {formatDate(site.targetEnergisationDate)}</p>
              <p className="mb-1"><strong>Budget:</strong> {formatCurrency(site.budget)}</p>
              <p className="mb-0"><strong>Internal owner:</strong> {site.internalOwner ?? "Unassigned"}</p>
            </div>
          </article>
        </div>
        <div className="col-xl-6">
          <article className="card shadow-sm border-0 h-100">
            <div className="card-body p-4">
              <h2 className="h5">Commercial comparison</h2>
              <p className="mb-1"><strong>DNO direct route:</strong> {formatCurrency(site.comparison.dnoDirectCost)}</p>
              <p className="mb-1"><strong>Best IDNO net cost:</strong> {formatCurrency(site.comparison.bestIdnoNetCost)}</p>
              <p className="mb-1"><strong>Best ICP cost:</strong> {formatCurrency(site.comparison.bestIcpCost)}</p>
              <p className="mb-1"><strong>Lowest net cost:</strong> {formatCurrency(site.comparison.lowestNetCost)}</p>
              <p className="mb-1"><strong>Fastest route:</strong> {formatDays(site.comparison.fastestRouteDays)}</p>
              <p className="mb-1"><strong>Recommended route:</strong> {site.comparison.recommendedRoute}</p>
              <p className="mb-1"><strong>Budget variance:</strong> {formatCurrency(site.comparison.budgetVariance)}</p>
              <p className="mb-0"><strong>Expiry pressure:</strong> <StatusBadge value={site.comparison.expiryPressure} /></p>
            </div>
          </article>
        </div>
      </section>

      <section className="card shadow-sm border-0">
        <div className="card-body p-4">
          <h2 className="h5">Recommendations / next action</h2>
          <p className="mb-2"><strong>Next action:</strong> {site.nextAction ?? "No next action recorded."}</p>
          <p className="mb-0 text-body-secondary">{site.notes ?? "No recommendation notes recorded yet."}</p>
        </div>
      </section>

      <OfferTable
        title="DNO quotes"
        columns={["Supplier", "Reference", "Status", "Cost", "Capacity", "Expiry", "Accepted"]}
        rows={site.dnoQuotes.map((quote) => [
          <Link key={`${quote.id}-supplier`} className="text-decoration-none" href={`/suppliers/${quote.supplierId}`}>{quote.supplierName}</Link>,
          quote.dnoReference ?? "N/A",
          <StatusBadge key={`${quote.id}-status`} value={quote.status} />,
          formatCurrency(quote.costExVat),
          formatNumber(quote.capacityOfferedKva, " kVA"),
          `${formatDate(quote.quoteExpiryDate)} (${formatDays(quote.daysToExpiry)})`,
          quote.accepted ? "Yes" : "No"
        ])}
      />

      <OfferTable
        title="IDNO tenders"
        columns={["Supplier", "Status", "Asset value", "Net cost", "Duration", "Expiry", "Accepted"]}
        rows={site.idnoTenders.map((tender) => [
          <Link key={`${tender.id}-supplier`} className="text-decoration-none" href={`/suppliers/${tender.supplierId}`}>{tender.supplierName}</Link>,
          <StatusBadge key={`${tender.id}-status`} value={tender.status} />,
          formatCurrency(tender.assetValuePayment),
          formatCurrency(tender.netCostToBusiness),
          formatDays(tender.deliveryDurationDays),
          `${formatDate(tender.tenderExpiryDate)} (${formatDays(tender.daysToExpiry)})`,
          tender.accepted ? "Yes" : "No"
        ])}
      />

      <OfferTable
        title="ICP tenders"
        columns={["Supplier", "Status", "Contestable cost", "Duration", "Expiry", "Accepted", "Notes"]}
        rows={site.icpTenders.map((tender) => [
          <Link key={`${tender.id}-supplier`} className="text-decoration-none" href={`/suppliers/${tender.supplierId}`}>{tender.supplierName}</Link>,
          <StatusBadge key={`${tender.id}-status`} value={tender.status} />,
          formatCurrency(tender.contestableWorksCost),
          formatDays(tender.deliveryDurationDays),
          `${formatDate(tender.tenderExpiryDate)} (${formatDays(tender.daysToExpiry)})`,
          tender.accepted ? "Yes" : "No",
          tender.notes ?? "N/A"
        ])}
      />
    </div>
  );
}

function OfferTable({ title, columns, rows }: { title: string; columns: string[]; rows: React.ReactNode[][] }) {
  return (
    <section className="card shadow-sm border-0">
      <div className="card-body p-4">
        <h2 className="h5 mb-3">{title}</h2>
        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead>
              <tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={`${title}-${index}`}>{row.map((cell, cellIndex) => <td key={`${title}-${index}-${cellIndex}`}>{cell}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
