FROM node

RUN npm install -g typescript

COPY . /app

WORKDIR /app

RUN npm install

EXPOSE 4000

ENTRYPOINT ["npm", "run", "dev"]
