import Link from "next/link";
import { redirect } from "next/navigation";
import { getPrimaryOrganizationProfile } from "@/lib/platform-data";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const organization = await getPrimaryOrganizationProfile().catch(() => null);

  if (organization && !organization.setupCompletedAt) {
    redirect("/setup");
  }

  return (
    <div className="d-grid gap-4">
      <section className="card grid-hero border-0">
        <div className="card-body p-4 p-lg-5">
          <div className="row g-4 align-items-center">
            <div className="col-xl-8">
              <p className="eyebrow mb-2">GridGeek Light</p>
              <h1 className="display-5 mb-3">A calmer control room for site-first connection commercials.</h1>
              <p className="hero-kicker mb-4">
                Built around the same lighter GridGeek feel: quiet surfaces, practical system language, and an interface that keeps the commercial signal clear.
              </p>
              <div className="d-flex flex-wrap gap-2 mb-4">
                <Link className="btn btn-primary px-4" href={organization ? "/dashboard" : "/setup"}>
                  {organization ? "Open dashboard" : "Start setup"}
                </Link>
                <Link className="btn btn-outline-secondary px-4" href="/sites">
                  View sites
                </Link>
              </div>
              <div className="row g-3">
                <div className="col-md-4">
                  <div className="hero-stat h-100">
                    <p className="eyebrow mb-2">Company-aware</p>
                    <strong className="d-block mb-1">Setup that shapes defaults</strong>
                    <span className="text-body-secondary">CPO, ICP, Solar, and BESS without forking the data model.</span>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="hero-stat h-100">
                    <p className="eyebrow mb-2">Site backbone</p>
                    <strong className="d-block mb-1">Every route stays visible</strong>
                    <span className="text-body-secondary">DNO, IDNO, ICP, and civils hang off the site and stay comparable.</span>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="hero-stat h-100">
                    <p className="eyebrow mb-2">Responsibility model</p>
                    <strong className="d-block mb-1">Managed by who?</strong>
                    <span className="text-body-secondary">Track internal, ICP, consultant, external, or not-required ownership clearly.</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4">
              <div className="grid-hero-panel rounded-4 p-4 h-100">
                <p className="eyebrow mb-2">Platform shape</p>
                <div className="d-grid gap-3">
                  <div>
                    <strong className="d-block">Sites are the working hub</strong>
                    <span className="text-body-secondary">Commercial comparison, package ownership, and decisions in one place.</span>
                  </div>
                  <div>
                    <strong className="d-block">Light but operational</strong>
                    <span className="text-body-secondary">Docker-first, PostgreSQL-backed, and seeded with enough dummy data to explore quickly.</span>
                  </div>
                  <div>
                    <strong className="d-block">Settings stay editable</strong>
                    <span className="text-body-secondary">Company profile and workflow defaults can change later without reshaping the app.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="row g-4">
        <div className="col-lg-4">
          <article className="card h-100 border-0">
            <div className="card-body p-4">
              <p className="eyebrow mb-2">Setup wizard</p>
              <h2 className="h4 mb-3">Start with the company, not the paperwork.</h2>
              <p className="text-body-secondary mb-0">
                Capture the business type, delivery model, and company details once, then let those defaults flow into site operations.
              </p>
            </div>
          </article>
        </div>
        <div className="col-lg-4">
          <article className="card h-100 border-0">
            <div className="card-body p-4">
              <p className="eyebrow mb-2">Commercial spine</p>
              <h2 className="h4 mb-3">One supplier register, separate offer logic.</h2>
              <p className="text-body-secondary mb-0">
                DNO quotes, IDNO tenders, and ICP tenders stay in distinct records so route economics remain clean and reportable.
              </p>
            </div>
          </article>
        </div>
        <div className="col-lg-4">
          <article className="card h-100 border-0">
            <div className="card-body p-4">
              <p className="eyebrow mb-2">Working page</p>
              <h2 className="h4 mb-3">The site page is where decisions happen.</h2>
              <p className="text-body-secondary mb-3">
                Package ownership sits above the quotes and tenders, so commercial review and delivery responsibility stay tied together.
              </p>
              <Link className="btn btn-outline-primary btn-sm px-3" href="/sites">
                Open site list
              </Link>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
