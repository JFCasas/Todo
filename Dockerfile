FROM node:alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install -g npm@9.6.5
RUN npm ci
COPY . .
CMD ["npm", "start"]