#!/bin/bash
# cd Vehar
# git pull origin master
# docker compose -f docker-compose.develop.yml build backend
# docker compose -f docker-compose.develop.yml build frontend

# docker compose -f docker-compose.develop.yml up -d backend
# docker compose -f docker-compose.develop.yml up -d frontend

# ___________________________________________________________

cd Vehar

git pull origin master

docker compose -f docker-compose.develop.yml down

docker images --format "{{.ID}}" | grep -v f2ad9f23df82 | xargs -r docker rmi -f

docker compose -f docker-compose.develop.yml build backend
docker compose -f docker-compose.develop.yml build frontend

docker compose -f docker-compose.develop.yml up -d
# docker compose -f docker-compose.develop.yml up -d frontend