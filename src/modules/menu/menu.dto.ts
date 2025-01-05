import { MenuTypeEnum } from './menu.entity';

export class MenuDto {
  name: string;
  type: MenuTypeEnum;
  path: string;
  icon?: string;
  order?: number;
  status?: boolean;
  parentId?: string;
  permission?: string;
}
