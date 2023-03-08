#!/bin/bash

docker compose -f ./docker/docker-compose.dev.yml up -d && \
docker exec -it gaizgrol-site sh