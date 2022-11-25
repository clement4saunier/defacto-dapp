FROM node:latest

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN chown -R node.node /app

COPY . .

EXPOSE 3000

CMD npm start
