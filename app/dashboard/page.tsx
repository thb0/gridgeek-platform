import Link from "next/link";
import { DataState } from "@/components/data-state";
import { MetricCard } from "@/components/metric-card";
import { formatCurrency, formatDays } from "@/lib/format";
import {
  getCommercialComparisonList,
  getDashboardMetrics,
  getSiteList,
  requireOrganizationSetup
} from "@/lib/platform-data";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const organization = await requireOrganizationSetup();
  const dashboardData = await Promise.all([
    getDashboardMetrics(),
    getSiteList(),
    getCommercialComparisonList()
  ]).catch(() => null);

  if (!dashboardData) {
    return (
      <DataState
        title="Dashboard unavailable"
        message="The dashboard could not reach PostgreSQL yet. Start the database, apply the schema, and seed demo data to populate this view."
      />
    );
  }

  const [metrics, siteList, comparisonList] = dashboardData;
  const activeSites = siteList.filter((site) => site.status !== "Closed" && site.status !== "Energised").slice(0, 5);
  const urgentComparisons = comparisonList.filter((site) => site.expiryPressure !== "No live expiry").slice(0, 5);

  return (
    <div className="d-grid gap-4">
      <section className="card shadow-sm border-0">
        <div className="card-body p-4">
          <div className="d-flex flex-column flex-lg-row justify-content-between gap-3">
            <div>
              <h1 className="h3 mb-2">Dashboard</h1>
              <p className="text-body-secondary mb-0">
                Birds-eye view of live sites, commercial pressure, and route comparison signals for {organization.name}.
              </p>
            </div>
            <div className="text-lg-end">
              <p className="small text-uppercase fw-semibold text-body-secondary mb-1">Database time</p>
              <p className="mb-0">{metrics.databaseTime ?? "Unavailable"}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="row g-3">
        <div className="col-sm-6 col-xl-3">
          <MetricCard label="Active sites" value={metrics.activeSites} note="Open sites not yet energised or closed" />
        </div>
        <div className="col-sm-6 col-xl-3">
          <MetricCard label="Quotes outstanding" value={metrics.quotesOutstanding} note="DNO records still in flight" />
        </div>
        <div className="col-sm-6 col-xl-3">
          <MetricCard label="Tenders outstanding" value={metrics.tendersOutstanding} note="IDNO and ICP returns still moving" />
        </div>
        <div className="col-sm-6 col-xl-3">
          <MetricCard label="Expiring in 14 days" value={metrics.quotesExpiringSoon} note="Offers that need commercial attention" />
        </div>
        <div className="col-sm-6 col-xl-3">
          <MetricCard label="Accepted this month" value={metrics.acceptedThisMonth} note="Across DNO, IDNO, and ICP" />
        </div>
        <div className="col-sm-6 col-xl-3">
          <article className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <p className="text-uppercase small fw-semibold text-body-secondary mb-2">Average DNO return</p>
              <p className="display-6 mb-1">{formatDays(metrics.averageDnoReturnDays)}</p>
              <p className="mb-0 text-body-secondary small">From application to quote receipt</p>
            </div>
          </article>
        </div>
        <div className="col-sm-6 col-xl-3">
          <article className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <p className="text-uppercase small fw-semibold text-body-secondary mb-2">Average IDNO net</p>
              <p className="display-6 mb-1">{formatCurrency(metrics.averageIdnoNetValue)}</p>
              <p className="mb-0 text-body-secondary small">Costs less asset value</p>
            </div>
          </article>
        </div>
        <div className="col-sm-6 col-xl-3">
          <article className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <p className="text-uppercase small fw-semibold text-body-secondary mb-2">Average ICP tender</p>
              <p className="display-6 mb-1">{formatCurrency(metrics.averageIcpTenderValue)}</p>
              <p className="mb-0 text-body-secondary small">Contestable works cost only</p>
            </div>
          </article>
        </div>
      </section>

      <section className="row g-4">
        <div className="col-xl-6">
          <SummaryList
            title="Active sites"
            items={activeSites.map((site) => ({
              href: `/sites/${site.id}`,
              title: site.name,
              subtitle: `${site.customerName ?? "No customer"} · ${site.nextAction}`,
              badge: site.status
            }))}
          />
        </div>
        <div className="col-xl-6">
          <SummaryList
            title="Commercial pressure"
            items={urgentComparisons.map((site) => ({
              href: `/comparison`,
              title: site.siteName,
              subtitle: `${site.recommendedRoute} · ${formatCurrency(site.lowestNetCost)}`,
              badge: site.expiryPressure
            }))}
          />
        </div>
      </section>
    </div>
  );
}

function SummaryList({
  title,
  items
}: {
  title: string;
  items: Array<{ href: string; title: string; subtitle: string; badge: string }>;
}) {
  return (
    <section className="card shadow-sm border-0 h-100">
      <div className="card-body p-4">
        <h2 className="h5 mb-3">{title}</h2>
        {items.length === 0 ? (
          <p className="text-body-secondary mb-0">No records yet.</p>
        ) : (
          <div className="list-group list-group-flush">
            {items.map((item) => (
              <Link
                key={`${item.href}-${item.title}`}
                className="list-group-item list-group-item-action px-0 d-flex justify-content-between align-items-start gap-3"
                href={item.href}
              >
                <div>
                  <p className="mb-1 fw-semibold">{item.title}</p>
                  <p className="mb-0 small text-body-secondary">{item.subtitle}</p>
                </div>
                <span className="badge text-bg-light text-uppercase">{item.badge}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
