import { applyDecorators, SetMetadata } from '@nestjs/common';
import { PERMISSION_KEY } from '../auth.constant';
import { isPlainObject } from 'lodash';

type TupleToObject<T extends string, P extends ReadonlyArray<string>> = {
  [K in Uppercase<P[number]>]: `${T}:${Lowercase<K>}`;
};

type AddPrefixToObjectValue<
  T extends string,
  P extends Record<string, string>,
> = {
  [K in keyof P]: K extends string ? `${T}:${P[K]}` : never;
};

/**
 * 权限装饰器，用于设置接口的权限
 * @param permission
 * @returns
 */
export function Perm(permission: string | string[]) {
  return applyDecorators(SetMetadata(PERMISSION_KEY, permission));
}

let permissions: string[] = [];

/**
 * 获取所有权限
 * @returns
 */
export function getAllDefinePermissions() {
  return permissions;
}

/**
 * 定义权限
 * @param modulePrefix 模块前缀
 * @param actions 所有接口权限
 * @returns
 */
export function definePermission<
  T extends string,
  U extends Record<string, string>,
>(modulePrefix: T, actions: U): AddPrefixToObjectValue<T, U>;

export function definePermission<
  T extends string,
  U extends ReadonlyArray<string>,
>(modulePrefix: T, actions: U): TupleToObject<T, U>;
export function definePermission(modulePrefix: string, actions) {
  if (isPlainObject(actions)) {
    Object.entries(actions).forEach(([key, value]) => {
      actions[key] = `${modulePrefix}:${value}`;
    });
    permissions = [
      ...new Set([...permissions, ...Object.values<string>(actions)]),
    ];
    return actions;
  } else if (Array.isArray(actions)) {
    const result = actions.reduce(
      (acc, cur) => {
        acc[cur] = `${modulePrefix}:${cur}`;
        return acc;
      },
      {} as Record<string, string>,
    );
    permissions = [
      ...new Set([...permissions, ...Object.values<string>(result)]),
    ];
    return result;
  }
  return {};
}
