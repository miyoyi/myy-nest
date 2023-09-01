import { Injectable, NestInterceptor, CallHandler } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface data<T> {
  ret?: boolean;
  result?: T;
  status?: number;
  msg?: string;
  code?: number;
  data?: T;
}

@Injectable()
export class Response<T = any> implements NestInterceptor {
  intercept(context, next: CallHandler): Observable<data<T>> {
    return next.handle().pipe(
      map((data) => {
        return {
          result: { ...data },
          status: 50000,
          success: true,
          msg: '成功',
          ret: true,
          code: 50000,
        };
      }),
    );
  }
}
