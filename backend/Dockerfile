FROM node:18

WORKDIR /app

COPY . /app

RUN npm i

RUN npm run build

EXPOSE 8080

CMD npm start
