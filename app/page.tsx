export default function HomePage() {
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
                The scaffold now includes a live dashboard, database-backed module pages, and a seed path
                for getting a fresh install visible in minutes.
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
              <h2 className="h5">What is live now</h2>
              <p className="text-body-secondary mb-0">
                Shared navigation, Postgres-backed health checks, seeded records, and server-rendered lists
                for customers, suppliers, and sites.
              </p>
            </div>
          </article>
        </div>
        <div className="col-lg-4">
          <article className="card shadow-sm border-0 h-100">
            <div className="card-body p-4">
              <h2 className="h5">Why it stays lean</h2>
              <p className="text-body-secondary mb-0">
                Plain SQL files, lightweight `pg` tooling, and no ORM or auth framework lock-in before the
                core workflows settle down.
              </p>
            </div>
          </article>
        </div>
        <div className="col-lg-4">
          <article className="card shadow-sm border-0 h-100">
            <div className="card-body p-4">
              <h2 className="h5">What we should build next</h2>
              <p className="text-body-secondary mb-0">
                Lean authentication, organization-aware permissions, and the first real quote or tender
                workflow on top of these foundation entities.
              </p>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
