<p align="center">
  <a href="https://lex-land.online" target="blank"><img src="./logo.svg" width="150" alt="Lex Logo" /></a>
</p>

<p align="center">
  <a href="https://circleci.com/gh/lex-land/lex-server" target="blank"><img src="https://circleci.com/gh/lex-land/lex-server.svg?style=svg" alt="CircleCI" /></a>
</p>

## Description

Lex 是一个接口文档管理工具，是在 Rap2 的想法上重新架构的一个产品。相比 Swagger UI、sosoApi、showDoc 等工具，Lex 主要做的不仅仅把接口呈现出来，更多的是提供结构化的接口定义去为前端的 mock 数据、自动化接口测试、批量测试用例覆盖等一系列配合上下游的协作。

## Installation

```bash
$ npx yarn

```

## Running the app

```bash
# 使用server/migration/sql/init-db.sql进行数据库初始化并启动两个容器
# 一个是mysql5.6，它会把数据挂载在cache目录做持久化存储
# 另一个是phpmyadmin，会启动一个数据库管理工具
npm run docker:database

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod


```

成功运行开发环境后

- 查看 [http://localhost:3000](http://localhost:3000)
- 查看 [http://localhost:8080](http://localhost:8080)，可以进入 phpmyadmin 进行数据库管理

## Deploy

```shell

# 目标机器按照nodejs
# https://github.com/nodesource/distributions/blob/master/README.md
docker run lexland/lex-server:latest -d

```

## Troubleshooting

```
ERROR in /Users/briefguo/Public/www/lex/node_modules/react-use/lib/useAsyncRetry.d.ts
5:72 ',' expected.
```

https://github.com/streamich/react-use/issues/270#issuecomment-495708860

```
Error: EPERM: operation not permitted, scandir '/proc/1/map_files/2873000-2876000'
```

https://stackoverflow.com/questions/55120476/nestjs-typeorm-cannot-connect-to-docker-mariadb
