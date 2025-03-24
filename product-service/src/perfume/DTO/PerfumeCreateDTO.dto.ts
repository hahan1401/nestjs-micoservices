import { OmitType } from '@nestjs/mapped-types';
import mongoose from 'mongoose';
import { Perfume } from '../schemas/perfume.schema';

export class PerfumeCreateDto extends OmitType(Perfume, [
  'categoryIds',
  'brandId',
] as const) {
  _id: mongoose.Types.ObjectId;
  categoryIds: string[];
  brandId: string;
}
