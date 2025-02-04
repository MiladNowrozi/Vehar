# Backend Dockerfile
FROM node:18-alpine


WORKDIR /app


COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm npm install --verbose


COPY . .

EXPOSE 5000

ENTRYPOINT [ "/app/entrypoint.sh" ]

CMD ["node", "index.js"]
