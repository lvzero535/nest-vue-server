export enum ErrorCodeEnum {
  DUPLICATE_RECORD = '23505:当前记录已存在',

  USER_PWD_ERROR = '10001:用户名或密码错误',
  INVALID_LOGIN = '10002:登录无效，请重新登录',
  NO_PERMISSION = '10003:无操作权限，请联系管理员',

  PERM_EXIST_IN_MENU = '20001:权限在当前菜单中已存在',
  FILE_TYPE_ERROR = '30001:文件类型错误(仅支持png|jpeg|jpg|gif|webp格式)',
  FILE_SIZE_ERROR = '30002:文件大小超出限制(5M)',
}
