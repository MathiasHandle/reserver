.PHONY: hello dev prod build-dev build-prod stop


ENV_FILE_dev := --env-file .env.dev
ENV_FILE_prod := --env-file .env.prod


dev: build-image-dev
	@test -f .env.dev || (echo "❌ .env.dev not found!" && exit 1)
	@echo "🚧 Starting in DEV mode"
	docker compose $(ENV_FILE_dev) up --watch

build-image-dev:
	@test -f .env.dev || (echo "❌ .env.dev not found!" && exit 1)
	@echo "🔨 Building docker image in DEV mode"
	docker compose $(ENV_FILE_dev) build


prod:
	@test -f .env.prod || (echo "❌ .env.prod not found!" && exit 1)
	@echo "🚀 Starting in PROD mode"
	docker compose $(ENV_FILE_prod) up --build

build-image-prod:
	@test -f .env.prod || (echo "❌ .env.prod not found!" && exit 1)
	@echo "🏗️  Building docker image in PROD mode"
	docker compose $(ENV_FILE_prod) build


down:
	@echo "🧹 Shutting down all services"
	docker compose down
