FROM node:latest

WORKDIR /app
RUN chown -R node.node /app

COPY --chown=node:node package.json ./
RUN npm install


COPY --chown=node:node . .

EXPOSE 3000

CMD npm start
