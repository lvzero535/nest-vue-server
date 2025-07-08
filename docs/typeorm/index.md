# QueryBuilder

## leftJoinAndSelect函数

第一个参数是您要加载的关联关系，第二个参数是您为该关联关系的表分配的别名。
当使用leftJoinAndSelect时，typeorm会默认加载关联关系的所有字段。
如果想要只加载关联关系的部分字段，可以使用leftJoin函数，配全addSelect。
如下：只加载关联关系的filename字段

```ts
.leftJoin('user.avatar', 'avatar')
.addSelect('avatar.filename')
```

## addSelect函数

第一个参数可以是一段SQL语句，第二个参数是您为该SQL语句分配的别名。

如：

```ts
const queryBuilder = this.usersRepository
  .createQueryBuilder('user')
  // https://github.com/typeorm/typeorm/issues/3941#issuecomment-480290531
  // 使用addSelect先排序，再分页
  .addSelect(
    `CASE WHEN user.username = 'admin' THEN 1 ELSE 2 END`,
    'default_sort',
  )
  .where({
    username: Like(`%${search}%`),
  })
  .leftJoinAndSelect('user.roles', 'role')
  .leftJoinAndSelect('user.dept', 'dept')
  .orderBy('default_sort') // 使用addSelect里的语句先排序
  .addOrderBy('user.createAt', 'DESC')
  .skip((page - 1) * pageSize)
  .take(pageSize);
```
