import { SetMetadata } from '@nestjs/common';
import { IS_PUBLIC } from './KEYS';

export const Public = () => SetMetadata(IS_PUBLIC, true);
