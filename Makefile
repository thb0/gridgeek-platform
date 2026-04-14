.PHONY: dev build start up down logs

dev:
	npm run dev

build:
	npm run build

start:
	npm run start

up:
	docker compose up -d --build

down:
	docker compose down

logs:
	docker compose logs -f
