import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { JwtModule } from '@nestjs/jwt';

// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Person } from './entities/person.entity'; 操作数据库使用

@Module({
  // imports: [TypeOrmModule.forFeature([Person])], 操作数据库使用
  imports: [
    JwtModule.register({
      secret: 'miyoyi',
    }),
  ],
  controllers: [PersonController],
  providers: [PersonService],
  exports: [PersonService],
})
export class PersonModule {}
