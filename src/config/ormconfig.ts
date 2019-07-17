import { TypeOrmModuleOptions } from '@nestjs/typeorm';

console.log(process.env.MYSQL_URL);

export const ormConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.MYSQL_URL || '127.0.0.1',
  port: 3306,
  username: process.env.MYSQL_USERNAME || 'root',
  password: process.env.MYSQL_PASSWD || '123456',
  database: process.env.MYSQL_DATABASE || 'Lex',
  // https://github.com/typeorm/typeorm/issues/682

  // https://github.com/nestjs/nest/issues/1138#issuecomment-425806220
  entities: ['dist/**/**.entity.{ts,js}'],
  // debug: true,
  // dropSchema: true,
  synchronize: true,
  // logging: true,
  // insecureAuth: true
};
