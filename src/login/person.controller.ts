import {
  Controller,
  Post,
  Body,
  UseGuards,
  SetMetadata,
  HttpException,
  HttpStatus,
  Req,
  Inject,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { FindPersonDto } from './dto/find-person.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PipePipe } from '../pipe/pipe.pipe';
import { verifySign } from '../utils/sign';
import { RoleGuard } from './guard/person.guard';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { generateTokens } from '../utils/token';

// import { Person } from './entities/person.entity'; // 操作数据库

@Controller('api')
@ApiTags('登录')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Inject(JwtService)
  private jwtService: JwtService;

  @Post('user/login')
  @UseGuards(RoleGuard)
  @SetMetadata('username', ['admin'])
  @ApiOperation({
    summary: '测试login',
    description: '登录login',
  })
  // @ApiResponse({status:403,description:"自定义返回信息"})
  login(@Body(PipePipe) findPersonDto: FindPersonDto) {
    const { username, password, sign, t } = findPersonDto;
    const params = findPersonDto; // 请求参数
    const signKey = ''; // 这里的 signKey 是你的签名密钥
    if (!verifySign(params, sign, signKey))
      throw new HttpException('签名错误', HttpStatus.BAD_REQUEST);
    return this.personService.login(username, password, sign, t);
  }

  @Post('user/logout')
  @ApiOperation({
    summary: '测试logout',
    description: '登出login',
  })
  logout() {
    return null;
  }

  @Post('/account/menu/getPermitMenu')
  @ApiOperation({
    summary: '获取菜单',
    description: '获取菜单',
  })
  getPermitMenu(@Req() req: Request) {
    // 在你想要刷新token的地方
    const authorization = req.headers['authorization'];
    try {
      const getToken = authorization.split(' ')[1];
      const data = this.jwtService.verify(getToken);

      const { token, refreshToken } = generateTokens(
        this.jwtService,
        data.username,
        data.password,
      );

      return {
        ...this.personService.getPermitMenu(),
        token,
        refreshToken,
      };
    } catch (e) {
      throw new HttpException('刷新token错误', HttpStatus.BAD_REQUEST);
    }
  }
}
