FROM node:20-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN apt-get update -y && apt-get install -y openssl

# Need to be able to use pnpm
RUN corepack enable


# Building
FROM base as build
COPY . /usr/src/virtuve
WORKDIR /usr/src/virtuve
# Install build dependencies
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
# Build packages
RUN pnpm run build
# Extract api package and its production dependencies
RUN pnpm deploy --filter=api --prod /prod/api

# Final stage
FROM base as api

# Environment variables available

COPY --from=build /prod/api /prod/api
WORKDIR /prod/api

# Default port exposure
EXPOSE 3000
CMD [ "pnpm", "start" ]
