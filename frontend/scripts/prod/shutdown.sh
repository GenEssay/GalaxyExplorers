#!/bin/bash

PARENT_DIR="$(dirname "$(dirname "$(realpath "${BASH_SOURCE[0]}")")")"
cd "$PARENT_DIR"

[ -z ${COMMONS_SOURCED+x} ] && source "$PARENT_DIR/commons.sh"

PID=$(pgrep -f "npm run start:prod")

if [ -z "$PID" ]; then
  echo -e "${Red}No nextjs application process found.${Color_Off}"
  exit 0
fi

kill $PID

if kill -0 $PID 2>/dev/null; then
  echo -e "${Blue}Process was not terminated, trying to kill with -9.${Color_Off}"
  kill -9 $PID
else
  echo -e "${Blue}Process terminated.${Color_Off}"
fi
