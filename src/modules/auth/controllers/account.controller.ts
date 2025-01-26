import { UserService } from '@/modules/user/user.service';
import { Controller, Get } from '@nestjs/common';
import { AuthUser } from '../decorators/auth-user.decorator';
import { MenuService } from '@/modules/menu/menu.service';
import { isEmpty } from 'lodash';
import { DEMO_ACCOUNT, isDemo } from '../auth.constant';

/**
 *
 * 通过已登录的用户信息来管理账号，这些接口不需要传入参数，从token中获取用户信息
 */
@Controller('account')
export class AccountController {
  constructor(
    private userService: UserService,
    private menuService: MenuService,
  ) {}

  @Get('profile')
  async profile(@AuthUser() user: IAuthUser) {
    if (isDemo) {
      return DEMO_ACCOUNT;
    }
    return this.userService.getAccountInfo(user.uid);
  }

  @Get('menus')
  async menus(@AuthUser() user: IAuthUser) {
    if (isEmpty(user.roleIds)) {
      return [];
    }
    // 根据用户的角色id，获取菜单列表
    return this.menuService.findMenuByRoleIds(user.roleIds);
  }
}
