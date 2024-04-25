#!/bin/bash

PORT=8055
PROJECT_NAME="party-backend"

PARENT_DIR="$(dirname "$(dirname "$(realpath "${BASH_SOURCE[0]}")")")"
cd "$PARENT_DIR"

[ -z ${COMMONS_SOURCED+x} ] && source "$PARENT_DIR/commons.sh"

activate_conda_env "${PROJECT_NAME}" "3.10"

cd ..
echo -e "${Blue}Current directory: $(pwd)${Color_Off}"

echo -e "${Blue}Starting server...${Color_Off}"
nohup uvicorn main:app --port ${PORT} --host 0.0.0.0 > output.log 2>&1 &

sleep 2

PID=$(pgrep -f "uvicorn main:app --port ${PORT} --host 0.0.0.0")
echo -e "${Green}PID: ${PID}${Color_Off}"

if [ -z "$PID" ]; then
  echo -e "${Red}Some error happen when start the uvicorn server, go output.log to see the detail.${Color_Off}"
  exit 0
else
  echo -e "${Blue}Server started. Go to http://150.158.118.195:${PORT}/docs to see the API documentation.${Color_Off}"
fi
