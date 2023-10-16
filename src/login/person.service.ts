import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { generateTokens } from '../utils/token';

// import { Repository } from 'typeorm';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Person } from './entities/person.entity'; // 操作数据库

// @Injectable()
// export class PersonService {
//   constructor(
//     @InjectRepository(Person)
//     private readonly PersonRepository: Repository<Person>,
//   ) {} // 代理该数据库

//   async findOne(username: string, password: string): Promise<Person[]> {
//     const query = `
//     SELECT *
//     FROM person
//     WHERE username = '${username}' AND password = '${password}'`;
//     return await this.PersonRepository.query(query);
//   }
// }

@Injectable()
export class PersonService {
  constructor(private readonly jwtService: JwtService) {}

  login(username: string, password: string, sign: string, t: string) {
    const { token, refreshToken } = generateTokens(
      this.jwtService,
      username,
      password,
    );
    if (token) {
      return {
        sign,
        t,
        id: 1,
        username: 'miyoyi',
        token,
        refreshToken,
      };
    } else {
      throw new HttpException('用户名或密码错误', HttpStatus.BAD_REQUEST);
    }
  }

  getPermitMenu() {
    return {
      children: [
        {
          children: [
            {
              children: [
                {
                  buttons: [],
                  code: 'whateverSecond',
                  id: 52,
                  name: '一级路由下的二级路由',
                  parentId: 51,
                  priority: 1,
                  type: 1,
                },
                {
                  buttons: [],
                  code: 'whateverAnother',
                  id: 53,
                  name: '第二个二级',
                  parentId: 52,
                  priority: 1,
                  type: 1,
                },
              ],
              code: 'whateverFirst',
              id: 51,
              name: '设置的侧边栏一级路由',
              parentId: 50,
              priority: 1,
              type: 1,
            },
            {
              code: 'whatever',
              id: 54,
              name: '设置的侧边栏一级路由',
              parentId: 53,
              priority: 1,
              type: 1,
            },
          ],
          code: 'whateverTop',
          id: 50,
          name: '设置的导航栏路由',
          parentId: 1,
          priority: 2,
          type: 1,
        },
      ],
      id: 1,
      name: '',
      parentId: 0,
      priority: 1,
      type: 1,

      ret: true,
    };
  }
}
