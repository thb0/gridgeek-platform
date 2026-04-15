import Link from "next/link";
import { notFound } from "next/navigation";
import { StatusBadge } from "@/components/status-badge";
import { formatCurrency, formatDate, formatDays } from "@/lib/format";
import { getSupplierDetail, requireOrganizationSetup } from "@/lib/platform-data";

export const dynamic = "force-dynamic";

export default async function SupplierDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await requireOrganizationSetup();
  const { id } = await params;
  const supplier = await getSupplierDetail(id);

  if (!supplier) {
    notFound();
  }

  return (
    <div className="d-grid gap-4">
      <section className="card shadow-sm border-0">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-start gap-3 flex-wrap">
            <div>
              <p className="small text-uppercase fw-semibold text-body-secondary mb-2">Supplier detail</p>
              <h1 className="h3 mb-2">{supplier.name}</h1>
              <p className="text-body-secondary mb-0">Single supplier profile with DNO, IDNO, and ICP activity in one place.</p>
            </div>
            <StatusBadge value={supplier.supplierType} />
          </div>
        </div>
      </section>

      <section className="row g-4">
        <div className="col-lg-4">
          <article className="card shadow-sm border-0 h-100">
            <div className="card-body p-4">
              <h2 className="h5">Supplier info</h2>
              <p className="mb-1"><strong>Region:</strong> {supplier.region ?? "N/A"}</p>
              <p className="mb-1"><strong>Framework:</strong> {supplier.frameworkStatus ?? "N/A"}</p>
              <p className="mb-1"><strong>Contact:</strong> {supplier.mainContact ?? "N/A"}</p>
              <p className="mb-1"><strong>Email:</strong> {supplier.email ?? "N/A"}</p>
              <p className="mb-1"><strong>Phone:</strong> {supplier.phone ?? "N/A"}</p>
              <p className="mb-0"><strong>Address:</strong> {supplier.address ?? "N/A"}</p>
            </div>
          </article>
        </div>
        <div className="col-lg-4">
          <article className="card shadow-sm border-0 h-100">
            <div className="card-body p-4">
              <h2 className="h5">Performance</h2>
              <p className="mb-1"><strong>Live tenders/quotes:</strong> {supplier.performance.liveOpportunityCount}</p>
              <p className="mb-1"><strong>Wins:</strong> {supplier.performance.winCount}</p>
              <p className="mb-0"><strong>Average return:</strong> {formatDays(supplier.performance.averageReturnDays)}</p>
            </div>
          </article>
        </div>
        <div className="col-lg-4">
          <article className="card shadow-sm border-0 h-100">
            <div className="card-body p-4">
              <h2 className="h5">Notes</h2>
              <p className="mb-0 text-body-secondary">{supplier.notes ?? "No notes recorded."}</p>
            </div>
          </article>
        </div>
      </section>

      <RelatedOfferTable
        title="Related DNO quotes"
        columns={["Site", "Reference", "Status", "Cost", "Expiry"]}
        rows={supplier.dnoQuotes.map((quote) => [
          <Link key={`${quote.id}-site`} className="text-decoration-none fw-semibold" href={`/sites/${quote.siteId}`}>{quote.siteName}</Link>,
          quote.dnoReference ?? "N/A",
          <StatusBadge key={`${quote.id}-status`} value={quote.status} />,
          formatCurrency(quote.costExVat),
          `${formatDate(quote.quoteExpiryDate)} (${formatDays(quote.daysToExpiry)})`
        ])}
      />

      <RelatedOfferTable
        title="Related IDNO tenders"
        columns={["Site", "Status", "Net cost", "Return", "Expiry"]}
        rows={supplier.idnoTenders.map((tender) => [
          <Link key={`${tender.id}-site`} className="text-decoration-none fw-semibold" href={`/sites/${tender.siteId}`}>{tender.siteName}</Link>,
          <StatusBadge key={`${tender.id}-status`} value={tender.status} />,
          formatCurrency(tender.netCostToBusiness),
          formatDate(tender.tenderReturnDate),
          `${formatDate(tender.tenderExpiryDate)} (${formatDays(tender.daysToExpiry)})`
        ])}
      />

      <RelatedOfferTable
        title="Related ICP tenders"
        columns={["Site", "Status", "Contestable cost", "Return", "Expiry"]}
        rows={supplier.icpTenders.map((tender) => [
          <Link key={`${tender.id}-site`} className="text-decoration-none fw-semibold" href={`/sites/${tender.siteId}`}>{tender.siteName}</Link>,
          <StatusBadge key={`${tender.id}-status`} value={tender.status} />,
          formatCurrency(tender.contestableWorksCost),
          formatDate(tender.tenderReturnDate),
          `${formatDate(tender.tenderExpiryDate)} (${formatDays(tender.daysToExpiry)})`
        ])}
      />
    </div>
  );
}

function RelatedOfferTable({ title, columns, rows }: { title: string; columns: string[]; rows: React.ReactNode[][] }) {
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
