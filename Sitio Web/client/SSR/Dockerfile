FROM node

RUN npm install -g typescript

COPY . /app

WORKDIR /app

RUN npm install

EXPOSE 4200

ENTRYPOINT ["npm", "start"]
