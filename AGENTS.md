# AGENTS.md

## Project purpose
GridGeek Platform is a lean, self-hosted connections commercial tracker designed for Docker-first deployment on home servers and company infrastructure.

## Current architecture expectations
- Next.js App Router + TypeScript
- Bootstrap for baseline frontend styling/components
- PostgreSQL via Docker Compose
- Environment-variable configuration
- Portable/self-hosting-friendly defaults
- Plain SQL schema files applied with lightweight `pg` tooling
- Demo seed data via lightweight Node scripts for fresh installs
- Server-rendered module pages that should degrade gracefully when DB is unavailable
- Site-centric commercial data model where quotes and tenders hang off the site record
- One shared supplier register with supplier type used to distinguish DNO / IDNO / ICP / Other
- Separate commercial tables for `dno_quotes`, `idno_tenders`, and `icp_tenders`
- First-login organization setup flow for company profile, business type, and default delivery model
- Business-type-aware defaults should shape UI behavior without forking the underlying data model
- Site responsibility tracking should live in `site_work_packages`, with one row per site/package for responsibility + status
- Docker builds should stay lean via `.dockerignore`, deterministic installs, and a simple container healthcheck against `/api/health`
- Host-run app and DB scripts should tolerate Docker-style `DATABASE_URL` values by falling back from `db` to `127.0.0.1` outside the container
- Keep the Next.js toolchain on a current patched release to avoid stale-framework security issues
- On Next.js 16+, use the ESLint CLI with `eslint.config.mjs` instead of `next lint`

## Maintenance rules
- Keep this file up to date when architecture, stack, or repo workflows change.
- Keep scaffolding intentionally minimal; avoid enterprise complexity unless explicitly requested.
- Prefer dependable, broadly adopted tooling.
- Keep operational scripts simple (`update.sh` for pull + rebuild + status).
- Preserve the site-first backbone when adding new features such as contacts, documents, timeline, alerts, and decision logging.
- Prefer flexible work-package records over hardcoded per-business-type workflow branches or per-site responsibility columns.
