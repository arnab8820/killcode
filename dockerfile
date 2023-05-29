FROM node:16.3.0-alpine

COPY . /src

WORKDIR /src

RUN npm install

EXPOSE 3400

CMD [ "node index.js" ]