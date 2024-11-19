# base stage
FROM node:18-alpine as base
RUN npm i -g pnpm@9.7.0
RUN pnpm install 


COPY . app/
WORKDIR app/

#build stage
RUN pnpm install
RUN pnpm run build

EXPOSE ${APP_PORT}

#run stage
RUN pnpm run start

