import { isFunction, isUndefined } from 'lodash';

export type BaseType = boolean | string | number | null | undefined;

export function formatValue<T extends BaseType = string>(
  key: string,
  defaultValue: T,
  callback?: (value: string) => T,
) {
  /**
   * 获取 process.env 中的值，有可能是 undefined
   * process.env，这里是没有.evn.* 文件里的变量的，里面只有在registerAs的第二个函数里才可以获取
   * 想要把.evn.*文件里的变量添加到process.env，可以通过dotenv.config({ path: '.env.*'})加载
   * 但里没必要，直接使用@nestjs/config获取即可
   */
  const value: string | undefined = process.env[key];

  if (isUndefined(value)) {
    return defaultValue;
  }

  if (isFunction(callback)) {
    return callback(value);
  }

  return value as unknown as T;
}

export function env(key: string, defaultValue = '') {
  return formatValue(key, defaultValue);
}

export function envString(key: string, defaultValue = '') {
  return formatValue(key, defaultValue);
}

export function envNumber(key: string, defaultValue = 0) {
  return formatValue(key, defaultValue, (value) => {
    try {
      return Number(value);
    } catch {
      throw new Error(`${key} environment variable is not a number`);
    }
  });
}

export function envBoolean(key: string, defaultValue = false) {
  return formatValue(key, defaultValue, (value) => {
    try {
      /**
       * JSON.parse('true') => true
       * JSON.parse('false') => false
       */
      return Boolean(JSON.parse(value));
    } catch {
      throw new Error(`${key} environment variable is not a boolean`);
    }
  });
}
