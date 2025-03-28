import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Brand } from 'src/brand/chemas/brand.schema';
import { Category } from 'src/category/chemas/category.schema';
import { PerfumeCollection } from 'src/perfume-collections/schemas/PerfumeCollection.schema';

@Schema({
  collection: 'perfumes',
})
export class Perfume {
  @Prop({ required: true, index: true, unique: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  imageUrl: string;

  @Prop({ required: true })
  price: number;

  @Prop({
    type: [{ type: mongoose.Types.ObjectId, ref: Category.name }],
    ref: Category.name,
    required: true,
  })
  categoryIds: mongoose.Types.ObjectId[];

  @Prop({ type: mongoose.Types.ObjectId, ref: Brand.name, required: true })
  brandId: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Types.ObjectId, ref: PerfumeCollection.name, required: true })
  collectionId: mongoose.Types.ObjectId;

  @Prop({ type: Number, default: 0 })
  remaining: number;

  @Prop({ type: Number, default: 0 })
  soldAmount: number;

  @Prop({ required: true, default: () => new Date().toISOString() })
  createdAt: string;

  @Prop({ required: true, default: () => new Date().toISOString() })
  updatedAt: string;

  @Prop({ default: () => null })
  deletedAt?: string;
}

export type PerfumeDocument = HydratedDocument<Perfume>;
export const PerfumeSchema = SchemaFactory.createForClass(Perfume);

export enum PerfumePopulateKeys {
  brandId = 'brandId',
  categoryIds = 'categoryIds',
  collectionId = 'collectionId',
}
