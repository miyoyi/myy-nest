import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import type { Request } from 'express';
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const admin = this.reflector.get<string[]>(
      'username',
      context.getHandler(),
    );
    const request = context.switchToHttp().getRequest<Request>();
    if (admin.includes(request.body.username as string)) {
      return true;
    } else {
      throw new HttpException('非admin权限', HttpStatus.BAD_REQUEST);
    }
  }
}
