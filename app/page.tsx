import Link from "next/link";
import { getPrimaryOrganizationProfile } from "@/lib/platform-data";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const organization = await getPrimaryOrganizationProfile().catch(() => null);

  if (organization && !organization.setupCompletedAt) {
    redirect("/setup");
  }

  return (
    <div className="d-grid gap-4">
      <section className="card shadow-sm border-0 grid-hero">
        <div className="card-body p-4 p-lg-5">
          <div className="row g-4 align-items-center">
            <div className="col-lg-8">
              <p className="text-uppercase small fw-semibold text-primary mb-2">Self-hosted workflow base</p>
              <h1 className="display-6 mb-3">GridGeek Platform</h1>
              <p className="lead mb-3">
                Lean infrastructure for customer, supplier, site, quote, and tender workflows that fits
                cleanly on Docker-first home servers and company hosts.
              </p>
              <p className="mb-0 text-body-secondary">
                The scaffold now includes company setup, business-type aware defaults, site work-package
                responsibilities, and live commercial tracking pages.
              </p>
            </div>
            <div className="col-lg-4">
              <div className="grid-hero-panel rounded-4 p-4 h-100">
                <p className="small text-uppercase fw-semibold mb-2">Quick start</p>
                <ol className="mb-0 ps-3">
                  <li>Copy `.env.example` to `.env`.</li>
                  <li>Run `docker compose up -d db`.</li>
                  <li>Run `npm run db:apply`.</li>
                  <li>Run `npm run db:seed`.</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="row g-4">
        <div className="col-lg-4">
          <article className="card shadow-sm border-0 h-100">
            <div className="card-body p-4">
              <h2 className="h5">Company-aware startup</h2>
              <p className="text-body-secondary mb-0">
                Setup wizard, editable company profile, and business-type defaults for CPO, ICP, Solar, and BESS workflows.
              </p>
            </div>
          </article>
        </div>
        <div className="col-lg-4">
          <article className="card shadow-sm border-0 h-100">
            <div className="card-body p-4">
              <h2 className="h5">Site work packages</h2>
              <p className="text-body-secondary mb-0">
                Every site can track DNO, IDNO, ICP, and Civil responsibilities without hardcoding business-type branches.
              </p>
            </div>
          </article>
        </div>
        <div className="col-lg-4">
          <article className="card shadow-sm border-0 h-100">
            <div className="card-body p-4">
              <h2 className="h5">Main working page</h2>
              <p className="text-body-secondary mb-3">
                Site detail now acts as the main working page, with work-package responsibility controls at the top.
              </p>
              <Link className="btn btn-outline-primary btn-sm" href="/dashboard">Open dashboard</Link>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
