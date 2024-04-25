#!/bin/bash

set -e

PARENT_DIR="$(dirname "$(dirname "$(realpath "${BASH_SOURCE[0]}")")")"
cd "$PARENT_DIR"

[ -z ${COMMONS_SOURCED+x} ] && source "$PARENT_DIR/commons.sh"

activate_conda_env "party-backend" "3.10"

echo "Installing Poetry"
pip install poetry

echo "Installing third-party dependencies"
poetry install
