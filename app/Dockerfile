FROM node:19

RUN mkdir /app

ADD . /app

WORKDIR /app

RUN npm install --only=prod

ENTRYPOINT ["node", "./src/index.js"]