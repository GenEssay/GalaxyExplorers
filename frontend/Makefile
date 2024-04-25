.PHONY: install install-dev install-prod start-dev start start-prod shutdown-prod formatting

install-prod:
	chmod +x scripts/prod/install.sh
	@scripts/prod/install.sh

start-dev:
	pnpm run dev

start:
	make start-dev

start-prod:
	chmod +x scripts/prod/start.sh
	@scripts/prod/start.sh

shutdown-prod:
	chmod +x scripts/prod/shutdown.sh
	@scripts/prod/shutdown.sh

formatting:
	pnpm run lint:fix