import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  ALLOW_ANON_KEY,
  PERMISSION_KEY,
  PUBLIC_KEY,
  Roles,
} from '../auth.constant';
import { BusinessException } from '@/common/exceptions/business.exception';
import { ErrorCodeEnum } from '@/constants/error-code.constant';
import { AuthService } from '../auth.service';

/**
 * RBAC (Role-Based Access Control，基於角色的存取控制)
 */
@Injectable()
export class RbacGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 校验接口是否是公开的
    const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    // 校验用户是否登录
    const request = context.switchToHttp().getRequest();
    const user: IAuthUser = request.user;
    if (!user) {
      throw new BusinessException(ErrorCodeEnum.INVALID_LOGIN);
    }

    // 校验用户是否不需要操作权限
    const isAllowAnon = this.reflector.get<boolean>(
      ALLOW_ANON_KEY,
      context.getHandler(),
    );

    // 如果接口不需要检测用户是否具有操作权限，直接返回true
    if (isAllowAnon) {
      return true;
    }

    // 当前接口需要的权限
    const apiPermissions = this.reflector.getAllAndOverride<string | string[]>(
      PERMISSION_KEY,
      [context.getHandler(), context.getClass()],
    );

    // 如果接口没有设置权限，直接返回true
    if (!apiPermissions) {
      return true;
    }

    // 如果用户是管理员，直接返回true
    if (user.roleNames.includes(Roles.ADMIN)) {
      return true;
    }

    // 当前用户的权限
    const userPermissions = await this.authService.getPermissions(user.roleIds);
    console.log('userPermissions', userPermissions);
    console.log('apiPermissions', apiPermissions);
    let canAccess = false;

    // 校验用户是否具有操作权限
    if (Array.isArray(apiPermissions)) {
      canAccess = apiPermissions.some((permission) =>
        userPermissions.includes(permission),
      );
    } else {
      canAccess = userPermissions.includes(apiPermissions);
    }

    // 如果用户没有权限，直接返回false
    if (!canAccess) {
      throw new BusinessException(ErrorCodeEnum.NO_PERMISSION);
    }

    return true;
  }
}
