Development quick-start

This repository includes a tiny helper to start/stop the backend server and the Vite frontend with logs and PID files.

Files added

- `scripts/run-dev.sh` - start/stop/status helper (POSIX bash). Usage: `./scripts/run-dev.sh start|stop|status`.
- `Makefile` - convenience targets: `make dev`, `make stop`, `make status`.

How it works

- Backend server is started with `node server/server.js` and logs to `logs/server.log`. PID is written to `server.pid`.
- Frontend (Vite) is started with `npm run dev -- --host` in `frontend/`, logs to `frontend/vite.log`. PID is written to `frontend/vite.pid`.

Commands

Start both services:

```bash
# from project root
make dev
# or
./scripts/run-dev.sh start
```

Stop both services:

```bash
make stop
# or
./scripts/run-dev.sh stop
```

Check status:

```bash
make status
# or
./scripts/run-dev.sh status
```

Viewing logs

```bash
# backend
tail -f logs/server.log
# frontend
tail -f frontend/vite.log
```

Troubleshooting

- EADDRINUSE on port 3001: another process is listening. Find and kill it:

```bash
lsof -i :3001
# kill the PID returned
kill <pid>
```

- If Vite doesn't appear to start, check `frontend/vite.log` and remove stale pid files:

```bash
rm -f frontend/vite.pid frontend/vite.log server.pid logs/server.log
```

- If you prefer a process manager, consider adding `pm2` or using Docker for more robust supervision.

Notes

- This helper is intentionally small and is intended for local development only. For production deployments use proper process managers, environment variable management and secure hosting.
