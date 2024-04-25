#* Variables
SHELL := /usr/bin/env bash
PYTHON := python
OS := $(shell python -c "import sys; print(sys.platform)")

ifeq ($(OS),win32)
	PYTHONPATH := $(shell python -c "import os; print(os.getcwd())")
	TEST_COMMAND := set PYTHONPATH=$(PYTHONPATH) && poetry run pytest -c pyproject.toml --cov-report=html --cov=app tests/unit_test/
	CI_TEST_COMMAND := set PYTHONPATH=$(PYTHONPATH) && poetry run pytest -c pyproject.toml --cov=app tests/test_integration/
else
	PYTHONPATH := `pwd`
	TEST_COMMAND := PYTHONPATH=$(PYTHONPATH) poetry run pytest -c pyproject.toml --cov-report=html --cov=app tests/unit_test/
	CI_TEST_COMMAND := set PYTHONPATH=$(PYTHONPATH) && poetry run pytest -c pyproject.toml --cov=app tests/test_integration/
endif

#* Docker variables
IMAGE := party_backend
VERSION := latest

.PHONY: lock install install-dev install-prod start start-dev start-prod start-ci shutdown shutdown-prod shutdown-ci pre-commit-install formatting test test-ci test-coverage check-codestyle lint lint-fix makemigrations migrate help

lock:
	poetry lock -n && poetry export --without-hashes > requirements.txt

install-dev:
	python -m pip install poetry
	poetry install -n

install-prod:
	chmod +x scripts/prod/install.sh
	@scripts/prod/install.sh

install:
	make install-dev

start:
	poetry install -n
	uvicorn main:app --port 8055 --host 0.0.0.0

start-dev:
	make start

start-prod: install-prod
	make shutdown-prod
	chmod +x scripts/prod/start.sh
	@scripts/prod/start.sh

shutdown:
	chmod +x scripts/prod/shutdown.sh
	@scripts/prod/shutdown.sh

shutdown-prod:
	make shutdown

pre-commit-install:
	poetry run pre-commit install

polish-codestyle:
	poetry run ruff format --config pyproject.toml .
	poetry run ruff check --fix --config pyproject.toml .

formatting: polish-codestyle
format: polish-codestyle

test:
	$(TEST_COMMAND)

test-ci:
	$(CI_TEST_COMMAND)

test-coverage:
	make test
	poetry run coverage-badge -o assets/images/coverage.svg -f

check-codestyle:
	poetry run ruff format --check --config pyproject.toml .
	poetry run ruff check --config pyproject.toml .

lint: test check-codestyle

lint-fix: polish-codestyle

makemigrations:
	python -m alembic revision --autogenerate -m "$(message)"

migrate:
	python -m alembic upgrade head

help:
	@echo "lock - Lock dependencies"
	@echo "install-dev - Install dependencies for development"
	@echo "install-prod - Install dependencies for production"
	@echo "install - Install dependencies for development"
	@echo "start - Start the application"
	@echo "start-dev - Start the application"
	@echo "start-prod - Start the application"
	@echo "start-ci - Start the application"
	@echo "shutdown - Shutdown the application"
	@echo "shutdown-prod - Shutdown the application"
	@echo "shutdown-ci - Shutdown the application"
	@echo "pre-commit-install - Install pre-commit hooks"
	@echo "polish-codestyle - Format the code"
	@echo "formatting - Format the code"
	@echo "test - Run unit tests"
	@echo "test-ci - Run integration tests"
	@echo "test-coverage - Run unit tests and generate coverage report"
	@echo "check-codestyle - Check code style"
	@echo "lint - Run tests and check code style"
	@echo "lint-fix - Format the code"
	@echo "makemigrations - Create a new migration"
	@echo "migrate - Apply migrations"
	@echo "help - Show this help message"
