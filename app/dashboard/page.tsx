import Link from "next/link";
import { DataState } from "@/components/data-state";
import { MetricCard } from "@/components/metric-card";
import { StatusBadge } from "@/components/status-badge";
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
      <section className="card grid-hero border-0">
        <div className="card-body p-4 p-lg-5">
          <div className="row g-4 align-items-end">
            <div className="col-xl-8">
              <p className="eyebrow mb-2">Control room</p>
              <h1 className="display-6 mb-3">Commercial control for {organization.name}.</h1>
              <p className="hero-kicker mb-0">
                A lighter operations view of live sites, expiry pressure, route economics, and return speed across DNO, IDNO, and ICP packages.
              </p>
            </div>
            <div className="col-xl-4">
              <div className="grid-hero-panel rounded-4 p-4">
                <p className="eyebrow mb-2">System time</p>
                <p className="h4 mb-2">{metrics.databaseTime ?? "Unavailable"}</p>
                <p className="mb-0 text-body-secondary">Pulled from PostgreSQL so the team can sanity-check live data timing at a glance.</p>
              </div>
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
          <article className="card metric-card h-100 border-0">
            <div className="card-body p-4">
              <p className="metric-card-label">Average DNO return</p>
              <p className="metric-card-value">{formatDays(metrics.averageDnoReturnDays)}</p>
              <p className="metric-card-note mb-0">From application to quote receipt</p>
            </div>
          </article>
        </div>
        <div className="col-sm-6 col-xl-3">
          <article className="card metric-card h-100 border-0">
            <div className="card-body p-4">
              <p className="metric-card-label">Average IDNO net</p>
              <p className="metric-card-value">{formatCurrency(metrics.averageIdnoNetValue)}</p>
              <p className="metric-card-note mb-0">Costs less asset value</p>
            </div>
          </article>
        </div>
        <div className="col-sm-6 col-xl-3">
          <article className="card metric-card h-100 border-0">
            <div className="card-body p-4">
              <p className="metric-card-label">Average ICP tender</p>
              <p className="metric-card-value">{formatCurrency(metrics.averageIcpTenderValue)}</p>
              <p className="metric-card-note mb-0">Contestable works cost only</p>
            </div>
          </article>
        </div>
      </section>

      <section className="row g-4">
        <div className="col-xl-6">
          <SummaryList
            title="Active sites"
            note="A short watchlist of the sites that still need commercial movement."
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
            note="Sites where offer expiry or route choice is starting to matter."
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
  note,
  items
}: {
  title: string;
  note: string;
  items: Array<{ href: string; title: string; subtitle: string; badge: string }>;
}) {
  return (
    <section className="card h-100 border-0">
      <div className="card-body p-4">
        <p className="eyebrow mb-2">Dashboard signal</p>
        <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
          <div>
            <h2 className="h4 mb-2">{title}</h2>
            <p className="text-body-secondary mb-0">{note}</p>
          </div>
        </div>
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
                <StatusBadge value={item.badge} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
