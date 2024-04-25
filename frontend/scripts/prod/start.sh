#!/bin/bash

PARENT_DIR="$(dirname "$(dirname "$(realpath "${BASH_SOURCE[0]}")")")"
cd "$PARENT_DIR"

[ -z ${COMMONS_SOURCED+x} ] && source "$PARENT_DIR/commons.sh"

export PORT=3333
export HOST=0.0.0.0

cd ..
echo -e "${Blue}Current directory: $(pwd)${Color_Off}"

echo -e "${Blue}Starting server...${Color_Off}"
nohup npm run start:prod > output.log 2>&1 &

sleep 2

PID=$(pgrep -f "npm run start:prod")
echo -e "${Green}PID: ${PID}${Color_Off}"

if [ -z "$PID" ]; then
  echo -e "${Red}Some error happen when start the frontend, go output.log to see the detail.${Color_Off}"
  exit 0
else
  echo -e "${Blue}Server started. Go to https:sparklab.zeeland.cn to see the API documentation.${Color_Off}"
fi
