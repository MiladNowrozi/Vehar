#!/bin/bash
# cd Vehar
# git pull origin master
# docker compose -f docker-compose.develop.yml build backend
# docker compose -f docker-compose.develop.yml build frontend

# docker compose -f docker-compose.develop.yml up -d backend
# docker compose -f docker-compose.develop.yml up -d frontend

# ___________________________________________________________

cd /root/home/Vehar

git pull origin master

docker compose -f docker-compose.develop.yml down

docker rmi -f $(docker images -q)

docker compose -f docker-compose.develop.yml build backend
docker compose -f docker-compose.develop.yml build frontend

docker compose -f docker-compose.develop.yml up --build -d
# docker compose -f docker-compose.develop.yml up -d frontend