# Compose.yml中的插值

```yml
services:
  web:
    env_file:
      - .env
      - .env.local
    image: 'webapp:${TAG}'
```

上面的代码中，TAG是一个环境变量，TAG取值只能是以下的情况：

- compose.yml同级的.env文件中的TAG变量。
- compose cli中 --env-file参数指定的.env文件中的TAG变量。

上面的代码中，如果上面两种情况不存在TAG变量定义，但是.env.local文件中的存在TAG变量，也是获取不到的，会提示
WARN[0000] The "TAG" variable is not set. Defaulting to a blank string.

在Compose中使用插值时，默认会是.env文件中的T变量，也可以通过--env-file指定其他的.env文件。
注意：如果指定了.env.local文件，会覆盖掉整个.env文件中的变量。并不是合并。
