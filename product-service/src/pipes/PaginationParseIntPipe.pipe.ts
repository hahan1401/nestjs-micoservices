import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isNil } from 'lodash';
import { Pagination } from 'src/common/Pagination';

@Injectable()
export class PaginationParseIntPipe implements PipeTransform {
  transform(value: {
    pageIndex: string;
    pageSize: string;
  }): Pagination | undefined {
    const { pageIndex, pageSize } = value;

    if (!pageSize) return { pageIndex: undefined, pageSize: undefined };

    if ((!isNil(pageIndex) && /\D/.test(pageIndex)) || /\D/.test(pageSize)) {
      throw new BadRequestException(
        'Validation failed (numeric string is expected)',
      );
    }

    const _pageIndex = !isNil(pageIndex) ? parseInt(pageIndex) : undefined;
    const _pageSize = parseInt(pageSize);

    if ((!isNil(pageIndex) && isNaN(_pageIndex)) || isNaN(_pageSize)) {
      throw new BadRequestException(
        'Validation failed (numeric string is expected)',
      );
    }
    return { pageIndex: _pageIndex, pageSize: _pageSize };
  }
}
