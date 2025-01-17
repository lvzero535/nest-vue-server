# Passport (认证)

## 安装

pnpm install @nestjs/jwt passport-jwt
pnpm install --save-dev @types/passport-jwt

pnpm install @nestjs/passport passport passport-local
pnpm install --save-dev @types/passport-local

## 原生过程

1. 配置特定的策略
2. 验证回调，Passport期望这个回调在验证成功时返回完整的用户消息，在验证失败时把null。

## 配置策略

Passport是一个框架，把认证流程抽象化成流程，每种认证都是一种策略，策略按照Passport的流程走，所以策略的实现是固定的。每个策略都有自己的配置方式。

1. 通过constructor构造函数配置策略选项
2. 实现validate方法，验证用户成功返回用户信息，失败时返回null
