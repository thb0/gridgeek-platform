# GridGeek Platform

GridGeek Platform is a lean, self-hosted-first scaffold for running customer/supplier/site and tender workflows on Docker-friendly infrastructure (including Unraid).

## Current project status

This is the **next lean milestone** of the scaffold. It now includes:

- Next.js app shell with shared navigation and placeholder module pages
- PostgreSQL-backed foundation with starter schema SQL
- Lightweight DB tooling using `pg` + plain SQL files
- Docker Compose setup for app + persistent Postgres
- Unraid-friendly update script (`update.sh`)

## What is working now

- App routes and shared header/nav
- Health endpoint: `/api/health` with DB check + DB server time probe
- PostgreSQL connection utility
- Starter schema apply command (`npm run db:apply`)
- Docker build/run flow
- Persistent Postgres volume (`postgres_data`)

## Stack

- Next.js (App Router, TypeScript)
- Bootstrap (minimal baseline UI)
- PostgreSQL 16
- `pg` (node-postgres)
- Docker / Docker Compose

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

5. Run app:

   ```bash
   npm run dev
   ```

6. Open http://localhost:3000

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

4. Check status:

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
- `/dashboard` - Dashboard placeholder
- `/customers` - Customers placeholder
- `/suppliers` - Suppliers placeholder
- `/sites` - Sites placeholder
- `/quotes/dno` - DNO quotes placeholder
- `/tenders/idno` - IDNO tenders placeholder
- `/tenders/icp` - ICP tenders placeholder
- `/api/health` - Service + DB health JSON

## Starter schema (current)

Schema file: `db/schema/001_initial.sql`

Core tables:

- `organizations`
- `users`
- `memberships`
- `customers`
- `suppliers`
- `sites`

Common fields included where appropriate:

- `id` (UUID)
- `organization_id`
- `name`
- type/status fields (`*_type`, `status`, `role`)
- `created_at`
- `updated_at` (maintained by trigger)

## Roadmap (short)

- Auth (lean self-hosted baseline)
- Roles/permissions refinement
- Customers module depth
- Suppliers module depth
- Sites module depth
- DNO quote workflow
- IDNO tender workflow
- ICP tender workflow
- Estimator module
- Optional billing integration later

## Notes

- Keep `.env` private and out of Git.
- Do not expose PostgreSQL publicly.
- This scaffold is intentionally simple and not enterprise-architected yet.
