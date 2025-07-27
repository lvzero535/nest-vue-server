# 守卫

守卫在每个中间件之后执行，但在任何拦截器或管道之前执行。

## Pipes

主要负责对参数进行验证和转换。
只要在全局的Pipes中配置`ValidationPipe`，那么class-validator和class-transformer就可以对所有的参数进行验证和转换，且生效。

- 路径参数和查询参数默认是字符串类型，如果配置了transform为true，那么dto中的number类型的属性或handle为number类型的参数，会自动转换为number类型。

## Interceptors

主要负责对响应进行拦截和转换。
