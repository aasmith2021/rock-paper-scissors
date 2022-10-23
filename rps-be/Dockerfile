FROM node:14 as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./ ./

CMD ["npm", "start"]

EXPOSE 8080
EXPOSE 3000