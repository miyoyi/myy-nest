import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class PipePipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const DTO = plainToInstance(metadata.metatype, value);

    const errors = await validate(DTO);
    const errorMessages = [];
    errors.forEach((error) => {
      const constraints = error.constraints;
      Object.values(constraints).forEach((value) => {
        errorMessages.push(value);
      });
    });
    if (errors.length > 0) {
      throw new HttpException(errorMessages, HttpStatus.BAD_REQUEST);
    }

    return value;
  }
}
