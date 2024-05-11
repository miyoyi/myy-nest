import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Response } from './common/response';
import { HttpFilter } from './common/filter';
import { middleWareAll } from './common/while-list';
import { PipePipe } from './pipe/pipe.pipe';
import { logger } from './utils/logger';

import * as cors from 'cors';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    httpsOptions: {
      key: fs.readFileSync('https/miyoyi.key', 'utf8'),
      cert: fs.readFileSync('https/miyoyi.pem', 'utf8'),
    },
  });

  const options = new DocumentBuilder()
    .setTitle('接口文档')
    .setDescription('描述...')
    .setVersion('1')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api-docs', app, document);
  app.useStaticAssets(join(__dirname, '..', 'public'), { prefix: '/static' });
  app.useStaticAssets(join(__dirname, '..', 'public/assets'), {
    prefix: '/assets',
  });
  app.useGlobalInterceptors(new Response());
  app.useGlobalFilters(new HttpFilter());
  app.useGlobalPipes(new PipePipe());
  app.use(middleWareAll);
  app.use((req: any, res: any, next: () => void) => {
    const paramsString = JSON.stringify(req.params);
    const queryString = JSON.stringify(req.query);
    logger.info(
      `[${req.method}] ${req.url}【Params: ${paramsString}, Query: ${queryString}】`,
    );
    next();
  });
  app.use(cors()); // 跨域

  const SSLPORT = 3001;
  await app.listen(SSLPORT, () => {
    console.log(
      '\n' + '    --https服务器已启动' + ': https://localhost:%s' + '\n\n',
      SSLPORT,
    );
  });
}

bootstrap();
