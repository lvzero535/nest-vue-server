FROM node:22.17-slim AS base

# 定义项目目录
# 1. 从构建命令的 --build-arg中获取；如：docker build --build-arg PROJECT_DIR=nest-vue-server -t nest-vue-server .
# 2. 可以给定一个默认值。如 PROJECT_DIR=/nest-admin
ARG PROJECT_DIR=/nest-admin

# 设置环境变量 APP_PORT 的值为 7001，该变量后续可在容器内使用。
ENV APP_PORT=7001

# 在镜像容器中安装 pnpm 包管理器
RUN npm install -g pnpm

# 将工作目录切换到 PROJECT_DIR 指定的路径。
WORKDIR ${PROJECT_DIR}

# 将当前主机的所有文件复制到容器内的 PROJECT_DIR 目录下。
COPY ./ ${PROJECT_DIR}

# 基于 base 阶段的镜像创建新的构建阶段，命名为 prod-deps。
FROM base AS prod-deps

# 使用 Docker Buildkit 的缓存功能，将 pnpm 存储目录 /pnpm/store 进行缓存，避免重复下载依赖
# --prod 表示只安装生产环境依赖，
# --frozen-lockfile 确保按照 pnpm-lock.yaml 文件中的版本安装依赖，若版本不匹配则安装失败。
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

# 基于 base 阶段的镜像创建新的构建阶段，命名为 build。
FROM base AS build

# 同样使用缓存功能安装所有依赖，包括开发和生产环境依赖。
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

# 基于 base 阶段的镜像构建最终镜像。
FROM base
# 从 prod-deps 阶段复制生产环境依赖到最终镜像。
COPY --from=prod-deps $PROJECT_DIR/node_modules $PROJECT_DIR/node_modules
COPY --from=build $PROJECT_DIR/dist $PROJECT_DIR/dist

EXPOSE $APP_PORT
ENTRYPOINT node $PROJECT_DIR/dist/main