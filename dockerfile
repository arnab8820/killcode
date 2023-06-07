FROM node:16.3.0-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 3400

CMD [ "node", "index.js" ]