FROM node as build-step

COPY . /app

WORKDIR /app

RUN npm install

RUN npm run build --prod

EXPOSE 4200

FROM nginx:latest
COPY --from=build-step /app/dist/client /usr/share/nginx/html
