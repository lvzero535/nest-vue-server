# 查询参数的配置

## 第一种方法，ApiQuery装饰器

- 控制器方法参数添加@Query()装饰器
- 装饰器参数为{ name: '参数名', required: true, type: 类型, description: '描述', example: '示例' }
- 如果有多个参数，这个装饰器可以多次使用

```ts
@ApiQuery({
    name: 'page',
    required: true,
    type: Number,
    description: '页码（从1开始）',
    example: 1, // 默认值
  })
```

## 第二种方法，配合class-validator

- 定义dto
- 控制器方法参数类型为定义的dto
- 使用class-validator的装饰器来验证参数

```ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
export class PagerDto {
  @IsNumber()
  @ApiProperty({ description: '当前页码', example: 1 })
  page: number = 1;

  @IsNumber()
  @ApiProperty({ description: '每页数量', example: 10 })
  pageSize: number = 10;

  @ApiProperty({ description: '搜索关键字', required: false })
  @IsString()
  @IsOptional()
  search: string = '';
}
```
