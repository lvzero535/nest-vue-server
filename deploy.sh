#!/bin/bash

set -e  # 一旦出错就退出脚本
set -o pipefail

# === 配置 ===
FRONTEND_REPO="https://github.com/lvzero535/nest-vue-web.git"
BACKEND_REPO="https://github.com/lvzero535/nest-vue-server.git"

FRONTEND_DIR="/opt/frontend"
BACKEND_DIR="/opt/backend"

FRONTEND_IMAGE="x/nest-vue-web:latest"
BACKEND_IMAGE="x/nest-vue-server:latest"

echo "🚀 开始部署..."

# === 拉取或更新前端仓库 ===
echo "⬇️ 克隆前端仓库..."
if [ -d "$FRONTEND_DIR/.git" ]; then
  rm -rf "$FRONTEND_DIR"/*
fi
git clone "$FRONTEND_REPO" "$FRONTEND_DIR"

# === 拉取或更新后端仓库 ===
echo "⬇️ 克隆后端仓库..."
if [ -d "$BACKEND_DIR/.git" ]; then
  rm -rf "$BACKEND_DIR"/*
fi
git clone "$BACKEND_REPO" "$BACKEND_DIR"

# === 构建前端镜像 ===
echo "🔧 构建前端镜像..."
cd "$FRONTEND_DIR"
docker build -t "$FRONTEND_IMAGE" .

# === 构建后端镜像 ===
echo "🔧 构建后端镜像..."
cd "$BACKEND_DIR"
docker build -t "$BACKEND_IMAGE" .

# === 启动服务 ===
echo "🚀 启动 docker-compose 服务..."
docker-compose up -d

echo "✅ 部署完成！"
