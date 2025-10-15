#!/usr/bin/env bash
set -euo pipefail

# Simple dev runner for this repo.
# Usage: ./scripts/run-dev.sh start|stop|status

DIR="$(cd "$(dirname "$0")/.." && pwd)"
LOGDIR="$DIR/logs"
mkdir -p "$LOGDIR"

SERVER_LOG="$LOGDIR/server.log"
SERVER_PID="$DIR/server.pid"
VITE_LOG="$DIR/frontend/vite.log"
VITE_PID="$DIR/frontend/vite.pid"

start_server() {
  if [ -f "$SERVER_PID" ] && kill -0 "$(cat "$SERVER_PID")" 2>/dev/null; then
    echo "Server already running (pid $(cat "$SERVER_PID"))"
    return
  fi
  echo "Starting server..."
  nohup node "$DIR/server/server.js" > "$SERVER_LOG" 2>&1 &
  echo $! > "$SERVER_PID"
  echo "Server pid $(cat "$SERVER_PID") -> $SERVER_LOG"
}

start_frontend() {
  if [ -f "$VITE_PID" ] && kill -0 "$(cat "$VITE_PID")" 2>/dev/null; then
    echo "Vite already running (pid $(cat "$VITE_PID"))"
    return
  fi
  echo "Starting frontend (Vite)..."
  cd "$DIR/frontend"
  # use `npm run dev` so we don't spawn the server task from package.json
  nohup npm run dev -- --host > "$VITE_LOG" 2>&1 &
  echo $! > "$VITE_PID"
  echo "Vite pid $(cat "$VITE_PID") -> $VITE_LOG"
}

stop_server() {
  if [ -f "$SERVER_PID" ]; then
    pid=$(cat "$SERVER_PID")
    echo "Stopping server pid $pid"
    kill $pid 2>/dev/null || true
    rm -f "$SERVER_PID"
  else
    echo "No server pid file"
  fi
}

stop_frontend() {
  if [ -f "$VITE_PID" ]; then
    pid=$(cat "$VITE_PID")
    echo "Stopping vite pid $pid"
    kill $pid 2>/dev/null || true
    rm -f "$VITE_PID"
  else
    echo "No vite pid file"
  fi
}

status() {
  echo "Server:"
  if [ -f "$SERVER_PID" ] && kill -0 "$(cat "$SERVER_PID")" 2>/dev/null; then
    echo "  running pid $(cat "$SERVER_PID")"
  else
    echo "  not running"
  fi
  echo "Frontend (Vite):"
  if [ -f "$VITE_PID" ] && kill -0 "$(cat "$VITE_PID")" 2>/dev/null; then
    echo "  running pid $(cat "$VITE_PID")"
  else
    echo "  not running"
  fi
}

case ${1:-} in
  start)
    start_server
    start_frontend
    ;;
  stop)
    stop_frontend
    stop_server
    ;;
  status)
    status
    ;;
  *)
    echo "Usage: $0 start|stop|status"
    exit 2
    ;;
esac
