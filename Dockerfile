# base stage
FROM node:18-alpine as base
RUN npm i -g pnpm@9.7.0

# dependencies stage
FROM base AS dependencies
WORKDIR /opt
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# build stage
FROM dependencies AS build
WORKDIR /opt
COPY --from=dependencies /opt/package.json ./package.json
COPY --from=dependencies /opt/node_modules ./node_modules
COPY . .
RUN pnpm build
RUN pnpm prune --prod