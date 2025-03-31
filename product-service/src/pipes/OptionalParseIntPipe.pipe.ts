import { HttpException, PipeTransform } from '@nestjs/common';
import { HttpStatusCode } from 'axios';

export class OptionalParseIntPipe implements PipeTransform {
  transform(value: string) {
    if (value === undefined || value === null) return undefined;
    const parsedValue = parseInt(value);
    if (isNaN(parsedValue))
      throw new HttpException('Validation failed (numeric string is expected)', HttpStatusCode.BadRequest);

    return parsedValue;
  }
}
