# GridGeek Platform

GridGeek Platform is a lean, self-hosted-first connections commercial tracker for customer, site, supplier, DNO quote, IDNO tender, and ICP tender workflows on Docker-friendly infrastructure (including Unraid).

## Current project status

This is the **next lean milestone** of the scaffold. It now includes:

- Next.js app shell with shared navigation and site-centric tracker pages
- PostgreSQL-backed foundation with starter schema SQL
- Lightweight DB tooling using `pg` + plain SQL files
- First-login setup wizard for company profile, business type, and default delivery model
- Server-rendered dashboard and module list pages backed by PostgreSQL
- Site detail pages with related DNO / IDNO / ICP sections
- Site work-package responsibility tracking for DNO, IDNO, ICP, and civils
- Commercial comparison page for route review
- Demo seed script for fresh self-hosted installs
- Docker Compose setup for app + persistent Postgres
- Unraid-friendly update script (`update.sh`)

## What is working now

- App routes and shared header/nav
- Health endpoint: `/api/health` with DB check + DB server time probe
- PostgreSQL connection utility
- Starter schema apply command (`npm run db:apply`)
- Demo data seed command (`npm run db:seed`)
- Live dashboard metrics for active sites, commercial pressure, and average return/value signals
- Setup flow that gates the main app until organization details are completed
- Live customers, suppliers, and sites tables
- Customer, supplier, and site detail pages
- Settings page for company profile and workflow defaults
- DNO quote, IDNO tender, ICP tender, and commercial comparison tables
- Delivery responsibility panel on each site with work-package owner, supplier, status, and notes
- Docker build/run flow
- Persistent Postgres volume (`postgres_data`)

## Stack

- Next.js (App Router, TypeScript)
- Bootstrap (minimal baseline UI)
- PostgreSQL 16
- `pg` (node-postgres)
- Docker / Docker Compose

Current framework baseline:

- Next.js 16
- React 19
- ESLint CLI with flat config (`eslint.config.mjs`)
- host-side DB access automatically falls back from `db` to `127.0.0.1` when you run scripts outside Docker

### Why this DB tooling?

For this phase, **`pg` + versioned SQL files** is a practical and popular choice:

- minimal moving parts
- easy to inspect and review in Git
- no ORM lock-in while business objects are still stabilizing

## Run locally (without full Docker app container)

1. Copy env file:

   ```bash
   cp .env.example .env
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start PostgreSQL only:

   ```bash
   docker compose up -d db
   ```

4. Apply starter schema:

   ```bash
   npm run db:apply
   ```

5. Seed demo data:

   ```bash
   npm run db:seed
   ```

6. Run app:

   ```bash
   npm run dev
   ```

7. Open http://localhost:3000

## Run with Docker Compose

1. Copy env file and adjust values:

   ```bash
   cp .env.example .env
   ```

2. Start app + db:

   ```bash
   docker compose up -d --build
   ```

3. Apply schema from host once DB is up:

   ```bash
   npm run db:apply
   ```

4. Seed demo data:

   ```bash
   npm run db:seed
   ```

5. Check status:

   ```bash
   docker compose ps
   ```

## Unraid update flow (`update.sh`)

Use the root script to perform a predictable update:

```bash
./update.sh
```

It will:

1. `git pull --ff-only`
2. `docker compose up -d --build`
3. `docker compose ps`

The script exits immediately on error (`set -euo pipefail`) and runs from the repository root.

## Postgres persistence

`docker-compose.yml` uses:

- named volume: `postgres_data`
- mount target: `/var/lib/postgresql/data`

This preserves data across container restarts/rebuilds unless you explicitly remove volumes.

## Current route map

- `/` - Home
- `/login` - Login placeholder
- `/setup` - First-login organization setup wizard
- `/dashboard` - Dashboard with commercial KPIs
- `/customers` - Live customer list
- `/customers/[id]` - Customer detail
- `/suppliers` - Live supplier list
- `/suppliers/[id]` - Supplier detail
- `/sites` - Live site list
- `/sites/[id]` - Site detail hub
- `/quotes/dno` - DNO quotes table
- `/tenders/idno` - IDNO tenders table
- `/tenders/icp` - ICP tenders table
- `/comparison` - Commercial comparison table
- `/settings/company` - Company profile and workflow defaults
- `/api/health` - Service + DB health JSON

## Data model

Schema files:

- `db/schema/001_initial.sql`
- `db/schema/002_site_centric_commercial_tracker.sql`
- `db/schema/003_org_setup_and_work_packages.sql`

Core tables:

- `organizations`
- `users`
- `memberships`
- `customers`
- `suppliers`
- `sites`
- `site_work_packages`
- `dno_quotes`
- `idno_tenders`
- `icp_tenders`

Key design choices:

- `sites` are the parent operational record
- one supplier table serves DNO / IDNO / ICP / Other via `supplier_type`
- commercial records stay in separate tables because their cost logic differs
- organization setup stores company profile, business type, and default workflow preferences
- work-package responsibilities are data-driven per site instead of hardcoded in the site table
- IDNO net cost is calculated as contestable + non-contestable - asset value

Default work packages:

- `dno_quote`
- `idno_tender`
- `icp_tender`
- `civil_tender`

Managed-by values:

- `internal`
- `icp`
- `consultant`
- `external`
- `not_required`

Seed workflow:

- `npm run db:apply`
- `npm run db:seed`

Common fields included where appropriate:

- `id` (UUID)
- `organization_id`
- `name`
- type/status fields (`*_type`, `status`, `role`)
- `created_at`
- `updated_at` (maintained by trigger)

## MVP build order

Phase 1:

- Customer
- Supplier
- Site
- DNO Quote
- IDNO Tender
- ICP Tender

Phase 2:

- Dashboard refinement
- Site detail working page
- Commercial comparison logic

Phase 3:

- Documents
- Contacts
- Timeline / activity log
- Quote expiry alerts
- Reporting

## Notes

- Keep `.env` private and out of Git.
- Do not expose PostgreSQL publicly.
- This scaffold is intentionally simple and not enterprise-architected yet.
