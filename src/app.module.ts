import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './login/person.module';

@Module({
  // imports: [
  //   TypeOrmModule.forRoot({
  //     // 连接数据库
  //     type: 'mysql', // 数据库类型
  //     host: 'localhost', // 数据库ip地址
  //     port: 3306, // 端口
  //     username: 'root', // 登录名
  //     password: '', // 密码
  //     database: 'nestjs_base', // 数据库名称
  //     entities: [__dirname + '/**/*.entity{.ts,.js}'], // 扫描本项目中.entity.ts或者.entity.js的文件
  //     synchronize: true, // 定义数据库表结构与实体类字段同步(这里一旦数据库少了字段就会自动加入,根据需要来使用)
  //   }),
  //   PersonModule, // 加载子模块
  // ],
  imports: [PersonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
