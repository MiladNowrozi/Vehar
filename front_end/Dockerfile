FROM node:18 AS build

WORKDIR /app

ARG REACT_APP_BASE_URL
ENV REACT_APP_BASE_URL=${REACT_APP_BASE_URL}

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:latest

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]