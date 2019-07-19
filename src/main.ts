import * as bodyParser from 'body-parser';
import { AccessControlAllowOrigin, localClient } from './common/cors';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import constants from '@/src/common/constants';
// import cookieParser from 'cookie-parser';
// import csurf from 'csurf';
import express from 'express';
import helmet from 'helmet';
import { logger } from '@/src/common/logger';
import rateLimit from 'express-rate-limit';

const isProd = process.env.NODE_ENV === 'prodction';
const PORT = process.env.PORT || 3001;

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(server),
  );

  app.setGlobalPrefix('api');

  // https://docs.nestjs.com/techniques/security
  app.use(helmet());
  // app.use(cookieParser());
  // https://github.com/expressjs/csurf#readme
  // app.use(csurf({ cookie: true }));
  app.use(
    new rateLimit({
      windowMs: constants.TIME['15MINUES'], // 15 minutes
      max: 10000, // limit each IP to 100 requests per windowMs
    }),
  );
  // 跨域安全
  app.enableCors({
    origin: AccessControlAllowOrigin.concat(isProd ? [] : [localClient]),
  });

  app.useGlobalPipes(new ValidationPipe());

  // parse body
  app.use(bodyParser.json({ limit: '5mb' }));
  app.use(bodyParser.urlencoded({ limit: '5mb', extended: false }));

  await app.listen(PORT, () => {
    logger.info(`\n[ success ] listening on http://localhost:${PORT}\n`);
  });
}

bootstrap();
