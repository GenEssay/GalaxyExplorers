#!/bin/bash

PID=$(pgrep -f "uvicorn main:app --port 8055 --host 0.0.0.0")

if [ -z "$PID" ]; then
  echo "No uvicorn process found."
  exit 0
fi

kill $PID

if kill -0 $PID 2>/dev/null; then
  echo "Process was not terminated, trying to kill with -9."
  kill -9 $PID
else
  echo "Process terminated."
fi
