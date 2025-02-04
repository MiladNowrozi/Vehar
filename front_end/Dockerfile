# Frontend Dockerfile
FROM node:18-alpine AS builder

ARG REACT_APP_BASE_URL
ENV REACT_APP_BASE_URL=${REACT_APP_BASE_URL}
WORKDIR /app

COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm npm install


COPY . .
CMD ["/app/node_modules/.bin/react-scripts", "start"]


# FROM nginx:alpine
# COPY --from=builder /app/build /usr/share/nginx/html



# CMD ["nginx", "-g", "daemon off;"]
