import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class FindPersonDto {
  @ApiProperty({ description: '用户名', example: 'admin' })
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString({ message: '用户名返回字符串' })
  username: string;
  @ApiProperty({ description: '密码', example: 'admin' })
  @IsNotEmpty({ message: '密码不能为空' })
  @IsString({ message: '密码返回字符串' })
  password: string;
  @ApiProperty({ description: '时间' })
  @IsNotEmpty({ message: '时间不能为空' })
  @IsString({ message: '时间返回字符串' })
  t: string;
  @ApiProperty({ description: '签名' })
  @IsNotEmpty({ message: '签名不能为空' })
  @IsString({ message: '签名返回字符串' })
  sign: string;
}
