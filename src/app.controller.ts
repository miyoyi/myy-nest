import { Controller, Get, Redirect } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiTags('首页')
  @Redirect('/static')
  getHello(): string {
    return this.appService.getHello();
  }
}
