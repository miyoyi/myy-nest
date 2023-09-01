import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Response } from './common/response';
import { HttpFilter } from './common/filter';
import { middleWareAll } from './common/while-list';
import { PipePipe } from './pipe/pipe.pipe';

import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
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
  app.use(cors()); // 跨域
  await app.listen(3001);
}
bootstrap();
