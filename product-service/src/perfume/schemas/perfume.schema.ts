import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Brand } from 'src/brand/chemas/brand.schema';
import { Category } from 'src/category/chemas/category.schema';

@Schema({ collection: 'perfumes', timestamps: true })
export class Perfume {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ type: mongoose.Types.ObjectId, ref: Category.name, required: true })
  categoryId: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Types.ObjectId, ref: Brand.name, required: true })
  brandId: mongoose.Types.ObjectId;

  @Prop({ type: Number, default: 0 })
  remaining: number;

  @Prop({ type: Number, default: 0 })
  soldAmount: number;

  @Prop({ default: () => null })
  deletedAt?: string;
}

export type PerfumeDocument = HydratedDocument<Perfume>;
export const PerfumeSchema = SchemaFactory.createForClass(Perfume);

export enum PerfumePopulateKeys {
  brandId = 'brandId',
  categoryId = 'categoryId',
}
