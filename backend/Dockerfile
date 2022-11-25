FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN chown -R node.node /app

COPY . /app

RUN npm run build

EXPOSE 8080

CMD npm start
