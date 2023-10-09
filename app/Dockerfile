FROM node:20

RUN mkdir /app

ADD . /app

WORKDIR /app

RUN npm install --only=prod

ENTRYPOINT ["node", "./src/index.js"]