# syntax:docker/dockerfile:1

FROM node:16.16.0-bullseye-slim as base
ENV TZ=Asia/Bangkok

WORKDIR /app

COPY [ "package.json", "yarn.lock*", "./"]

RUN yarn install

COPY . .

RUN yarn add global @nestjs/cli
RUN yarn build

EXPOSE 8086
CMD ["yarn", "start:prod"]