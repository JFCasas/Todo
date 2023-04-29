FROM node:alpine
WORDIR /usr/src/app
COPY package*.json .
RUN npm ci
COPY . .
CMD["npm","start"]