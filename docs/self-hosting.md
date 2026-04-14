# Self-hosting notes

This project is designed to stay portable and easy to self-host.

## Baseline deployment pattern

1. Clone repository.
2. Copy `.env.example` to `.env`.
3. Set strong DB credentials and `DATABASE_URL`.
4. Run `docker compose up -d --build`.
5. Put a reverse proxy with TLS in front of the app.

## Home server (Unraid) guidance

- Keep app and db on the same Docker network.
- Keep the `postgres_data` volume on reliable storage.
- Include the volume in backup jobs.
- Restrict external access to only the web entrypoint.

## Company self-hosting guidance

- Use managed secrets (or tightly controlled `.env` handling).
- Use external PostgreSQL if preferred.
- Add monitoring, backups, and routine update process.

## Next hardening steps

- auth + role model
- DB migrations
- HTTPS and proxy defaults
- audit logging
- backup/restore runbooks
