FROM node:8-alpine

COPY . ./home/node/app

WORKDIR /home/node/app

RUN npm install
RUN npm run build

EXPOSE 80
CMD node dist/src/main.js