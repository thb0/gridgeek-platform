# GridGeek Platform (Scaffold)

GridGeek Platform is a **lean, self-hosted web app foundation** intended to run on home servers (like Unraid) and company-managed infrastructure.

This repository is intentionally a first scaffold only.

## Current scope

- Next.js + TypeScript app shell (App Router)
- Bootstrap-based minimal frontend
- Basic routes: home, login, dashboard
- API health endpoint
- PostgreSQL wiring with a small DB utility
- Dockerfile + Docker Compose for app + database
- Environment-variable based configuration

## Stack

- [Next.js](https://nextjs.org/) (App Router, TypeScript)
- [Bootstrap](https://getbootstrap.com/) for simple, familiar baseline UI styling
- [PostgreSQL](https://www.postgresql.org/)
- [pg](https://node-postgres.com/) for direct DB connectivity (simple and portable)
- Docker / Docker Compose

### Why `pg` for now?

For the scaffold phase, `pg` keeps the dependency footprint small and avoids locking us into early schema tooling decisions. It gives a straightforward path to add migrations/ORM later.

## Quick start (local, without Docker)

1. Copy env file:

   ```bash
   cp .env.example .env
   ```

2. Update `.env` values if needed.

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run a local PostgreSQL instance (or start only `db` with Compose):

   ```bash
   docker compose up -d db
   ```

5. Start the app:

   ```bash
   npm run dev
   ```

6. Open http://localhost:3000

## Run with Docker Compose (recommended for self-hosting baseline)

1. Copy env file:

   ```bash
   cp .env.example .env
   ```

2. Edit database credentials and `DATABASE_URL`.

3. Start everything:

   ```bash
   docker compose up -d --build
   ```

4. Visit:
   - App: http://localhost:3000
   - Health: http://localhost:3000/api/health

5. Stop:

   ```bash
   docker compose down
   ```

## Persistent DB storage

`docker-compose.yml` defines a named volume `postgres_data`, mounted at `/var/lib/postgresql/data` in the PostgreSQL container.

That means database data survives container recreation (unless volumes are explicitly removed).

## Routes included

- `/` — landing page
- `/login` — placeholder login page
- `/dashboard` — placeholder dashboard page
- `/api/health` — returns service health JSON

## Unraid and self-hosting notes

- This setup works as a baseline on Unraid via Docker Compose support/community tooling.
- Keep `.env` private and use strong credentials.
- Put this behind a reverse proxy and HTTPS before internet exposure.
- See [`docs/self-hosting.md`](docs/self-hosting.md) for practical deployment notes.

## Not production-hardened yet

This scaffold is intentionally minimal and **not production hardened** yet. Missing pieces include:

- auth and authorization
- secure session handling
- migrations and schema governance
- backup/restore automation
- observability, rate limiting, and hardening

## Roadmap (planned)

- Authentication
- Roles and permissions
- Customers
- Suppliers
- Sites
- DNO quotes
- IDNO tenders
- ICP tenders
- Estimator
- Optional Stripe integration later
