import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class CustomParseInPipe implements PipeTransform {
  transform(value: string): number | undefined {
    if (value === undefined || value === null) {
      return undefined;
    }
    if (/\D/.test(value)) {
      throw new BadRequestException(
        'Validation failed (numeric string is expected)',
      );
    }

    const val = parseInt(value);

    if (isNaN(val)) {
      throw new BadRequestException(
        'Validation failed (numeric string is expected)',
      );
    }
    return val;
  }
}
