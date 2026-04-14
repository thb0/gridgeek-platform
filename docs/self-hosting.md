# Self-hosting on Unraid (and similar Docker hosts)

This project is designed to remain simple for self-hosted deployments.

## Unraid deployment notes

- Use a persistent app-data path on the array/cache for the repo checkout.
- Keep app and db on the same Compose project/network.
- Keep backups of the Postgres volume.
- Place the web app behind a reverse proxy with HTTPS.

## Recommended clone location

Pick a stable path that survives reboots and is included in backups, for example:

```bash
/mnt/user/appdata/gridgeek-platform
```

Then clone:

```bash
git clone <your-repo-url> /mnt/user/appdata/gridgeek-platform
cd /mnt/user/appdata/gridgeek-platform
```

## Create `.env`

```bash
cp .env.example .env
```

Update values in `.env`:

- `POSTGRES_PASSWORD` (use a strong secret)
- `DATABASE_URL` (must match credentials/host)
- optional app settings (`NODE_ENV`, `PORT`)

## Start services

```bash
docker compose up -d --build
```

Apply schema after DB starts:

```bash
npm run db:apply
```

## Update with `./update.sh`

From repo root:

```bash
./update.sh
```

The script performs:

1. `git pull --ff-only`
2. `docker compose up -d --build`
3. `docker compose ps`

If any step fails, it exits immediately.

## Security warning: Postgres exposure

Do **not** expose PostgreSQL directly to the public internet.

- Keep Postgres bound to localhost or internal Docker networking.
- Only expose the web app (preferably through a reverse proxy + TLS).
- Restrict firewall rules to trusted access paths.
