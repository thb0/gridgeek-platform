#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

cd "$PROJECT_DIR"

echo "[update] Pulling latest changes..."
git pull --ff-only

echo "[update] Rebuilding and starting containers..."
docker compose up -d --build

echo "[update] Current container status:"
docker compose ps
