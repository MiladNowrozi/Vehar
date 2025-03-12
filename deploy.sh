#!/bin/bash
# cd Vehar
# git pull origin master
# docker compose -f docker-compose.develop.yml build backend
# docker compose -f docker-compose.develop.yml build frontend

# docker compose -f docker-compose.develop.yml up -d backend
# docker compose -f docker-compose.develop.yml up -d frontend

# ___________________________________________________________

cd /home/Vehar

git pull origin master

docker compose -f docker-compose.develop.yml down

docker images --format "{{.ID}}" | grep -v f05d6e1018a8 | xargs -r docker rmi -f

docker compose -f docker-compose.develop.yml build backend
docker compose -f docker-compose.develop.yml build frontend

docker compose -f docker-compose.develop.yml up -d
# docker compose -f docker-compose.develop.yml up -d frontend