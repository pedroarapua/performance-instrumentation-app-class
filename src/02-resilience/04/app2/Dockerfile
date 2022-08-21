FROM node:alpine

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY ./app2/index.js ./index.js

CMD [ "node", "index.js" ]