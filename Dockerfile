FROM node:14-alpine

WORKDIR /usr/src

EXPOSE 1995

COPY package*.json ./

RUN npm ci --production && npm cache clean --force

COPY . .

CMD [ "node", "index.js" ]
