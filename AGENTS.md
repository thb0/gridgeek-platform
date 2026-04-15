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
- Docker builds should stay lean via `.dockerignore`, deterministic installs, and a simple container healthcheck against `/api/health`

## Maintenance rules
- Keep this file up to date when architecture, stack, or repo workflows change.
- Keep scaffolding intentionally minimal; avoid enterprise complexity unless explicitly requested.
- Prefer dependable, broadly adopted tooling.
- Keep operational scripts simple (`update.sh` for pull + rebuild + status).
- Preserve the site-first backbone when adding new features such as contacts, documents, timeline, alerts, and decision logging.
