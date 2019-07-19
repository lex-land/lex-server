import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

const ormConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.MYSQL_URL || '127.0.0.1',
  port: 3306,
  username: process.env.MYSQL_USERNAME || 'root',
  password: process.env.MYSQL_PASSWD || '123456',
  database: process.env.MYSQL_DATABASE || 'Lex',

  // https://github.com/typeorm/typeorm/issues/682
  // https://github.com/nestjs/nest/issues/1138#issuecomment-425806220
  // ...
  // README
  // 这里始终用dist目录，更好保证开发环境和生产环境的一致
  // 并预防 mysqlDriver 的异常
  // ...
  entities: ['dist/**/**.entity.{ts,js}'],
  // debug: true,
  // dropSchema: true,
  synchronize: true,
  // logging: true,
  // insecureAuth: true
};

@Module({
  imports: [
    // https://docs.nestjs.com/techniques/database
    TypeOrmModule.forRootAsync({
      useFactory: () => ormConfig,
    }),
  ],
})
export class DatabaseModule {}
