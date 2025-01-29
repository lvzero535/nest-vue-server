import { UserService } from '@/modules/user/user.service';
import { Controller, Get } from '@nestjs/common';
import { AuthUser } from '../decorators/auth-user.decorator';
import { MenuService } from '@/modules/menu/menu.service';
import { isEmpty } from 'lodash';
import { SharedConfigService } from '@/shared/services/config.service';
import { ROOT_ROLE_ID } from '@/constants/system.constant';

/**
 *
 * 通过已登录的用户信息来管理账号，这些接口不需要传入参数，从token中获取用户信息
 */
@Controller('account')
export class AccountController {
  constructor(
    private userService: UserService,
    private menuService: MenuService,
    private configService: SharedConfigService,
  ) {}

  @Get('profile')
  async profile(@AuthUser() user: IAuthUser) {
    // 如果是demo账号，直接返回demo账号
    if (this.configService.getAppConfig('isDemoMode')) {
      return this.configService.getDemoAccount();
    }
    return this.userService.getAccountInfo(user.uid);
  }

  @Get('menus')
  async menus(@AuthUser() user: IAuthUser) {
    if (isEmpty(user.roleIds)) {
      return [];
    }
    if (user.roleIds.includes(ROOT_ROLE_ID)) {
      return this.menuService.findAllTree();
    }
    // 根据用户的角色id，获取菜单列表
    return this.menuService.findMenuByRoleIds(user.roleIds);
  }
}
