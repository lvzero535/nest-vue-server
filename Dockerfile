FROM node:22.17-slim AS base

ARG PROJECT_DIR

ENV APP_PORT=7001

RUN npm install -g pnpm
WORKDIR ${PROJECT_DIR}
COPY ./ ${PROJECT_DIR}

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

FROM base
COPY --from=prod-deps $PROJECT_DIR/node_modules $PROJECT_DIR/node_modules
COPY --from=build $PROJECT_DIR/dist $PROJECT_DIR/dist

EXPOSE $APP_PORT
ENTRYPOINT node $PROJECT_DIR/dist/main