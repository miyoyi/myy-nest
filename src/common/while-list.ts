import { HttpException, HttpStatus } from '@nestjs/common';

const whiteList = ['/', '/api/user/login', '/api/user/loginout'];

export function middleWareAll(req, res, next) {
  if (whiteList.includes(req.originalUrl)) {
    next();
  } else {
    const authorization = req.headers['authorization'];
    if (!authorization) {
      // 用户未登录
      throw new HttpException('用户未登录', HttpStatus.BAD_REQUEST);
    }
    try {
      next();
    } catch (e) {
      // token 失效，请重新登录
      throw new HttpException('token 失效，请重新登录', HttpStatus.BAD_REQUEST);
    }
  }
}
