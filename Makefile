.PHONY: dev stop status

dev:
	./scripts/run-dev.sh start

stop:
	./scripts/run-dev.sh stop

status:
	./scripts/run-dev.sh status
