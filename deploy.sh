#!/bin/bash
# cd Vehar
# git pull origin master
# docker compose -f docker-compose.develop.yml build backend
# docker compose -f docker-compose.develop.yml build frontend

# docker compose -f docker-compose.develop.yml up -d backend
# docker compose -f docker-compose.develop.yml up -d frontend

# ___________________________________________________________

cd /root/home/Vehar

git reset --hard origin/master
git pull origin master

docker compose -f docker-compose.develop.yml down

# docker rmi -f $(docker images -q)
docker images --format "{{.Repository}}:{{.Tag}}" | grep -v "mysql:8.0.28" | xargs -r docker rmi -f

docker compose -f docker-compose.develop.yml build backend
docker compose -f docker-compose.develop.yml build frontend

docker compose -f docker-compose.develop.yml up --build -d
# docker compose -f docker-compose.develop.yml up -d frontend