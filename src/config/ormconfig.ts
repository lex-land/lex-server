import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const ormConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.MYSQL_URL || '127.0.0.1',
  port: 3306,
  username: process.env.MYSQL_USERNAME || 'root',
  password: process.env.MYSQL_PASSWD || '123456',
  database: process.env.MYSQL_DATABASE || 'Lex',
  // https://github.com/typeorm/typeorm/issues/682

  // https://github.com/nestjs/nest/issues/1138#issuecomment-425806220

  // README
  // 这里src能在生产环境生效，是因为生产环境docker的容器目录
  // Dockerfile
  // ...
  // COPY ./dist ./src
  // ...
  entities: ['src/**/**.entity.{ts,js}'],
  // debug: true,
  // dropSchema: true,
  synchronize: true,
  // logging: true,
  // insecureAuth: true
};
