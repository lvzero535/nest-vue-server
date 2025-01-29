export class MenuDto {
  name: string;
  type: number;
  path: string;
  icon?: string;
  order?: number;
  status?: boolean;
  parentId?: number;
  permission?: string;
}
