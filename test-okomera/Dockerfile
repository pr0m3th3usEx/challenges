FROM node:20-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN apt-get update -y && apt-get install -y openssl

# Need to be able to use pnpm
RUN corepack enable

# Building
FROM base as build
COPY . /usr/src/okomera
WORKDIR /usr/src/okomera
# Install build dependencies
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
# Build packages
RUN pnpm run build
# Extract api package and its production dependencies
RUN pnpm deploy --filter=api --prod /prod/api
RUN pnpm deploy --filter=app --prod /prod/app

# API
FROM base as api

# Environment variables available

COPY --from=build /prod/api /prod/api
WORKDIR /prod/api

# Default port exposure
EXPOSE 3000
CMD [ "pnpm", "start:prod" ]

# Web application
FROM base as app

COPY --from=build /prod/app /prod/app
WORKDIR /prod/app

RUN npm i -g serve

# Default port exposure
EXPOSE 3000
CMD [ "serve", "-s", "dist"]