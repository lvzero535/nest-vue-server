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

## 网络

把compose文件定义看成一个整体的网络，所有的服务都在这个网络中。服务名是这个网络的域名，服务间的网络通信可以通过这个域名（服务名）。
在compose.yml文件中定义的服务名，对于整个网络中，即为域名，也就是说，在其他服务中，可以通过服务名去连接。
如后端数据库的服务名是mysql，那么在其他服务中，可以通过`mysql`域名去连接。
端口使用的是服务内起的端口，不是容器的映射的端口。
下面的代码中，mysql服务的端口是3306， 后端服务连接数据库使用的地址是`mysql:3306`

> 容器与容器通信用的是 docker 网络中的服务名和内部端口。

```yml
mysql:
  image: mysql:latest
  env_file:
    - .env
  environment:
  ports:
    - '13308:3306'
```
