import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Brand } from 'src/brand/chemas/brand.schema';
import { Category } from 'src/category/chemas/category.schema';

@Schema({ collection: 'perfumes' })
export class Perfume {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ type: mongoose.Types.ObjectId, ref: Category.name })
  categoryId: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Types.ObjectId, ref: Brand.name })
  brandId: mongoose.Types.ObjectId;

  @Prop({ required: true, default: () => new Date().toISOString() })
  createdDate?: string;

  @Prop({ required: true, default: () => new Date().toISOString() })
  modifiedDate?: string;

  @Prop({ default: () => null })
  deletedDate?: string;
}

export type PerfumeDocument = HydratedDocument<Perfume>;
export const PerfumeSchema = SchemaFactory.createForClass(Perfume);

export enum PerfumePopulateKeys {
  brandId = 'brandId',
  categoryId = 'categoryId',
}
