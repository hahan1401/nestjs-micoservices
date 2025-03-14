import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

@Schema({ collection: 'perfumes' })
export class Perfume {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  categoryId: string;

  @Prop({ required: true, default: () => new Date().toISOString() })
  createdDate?: string;

  @Prop({ required: true, default: () => new Date().toISOString() })
  modifiedDate?: string;

  @Prop({ default: () => null })
  deletedDate?: string;
}

export type PerfumeDocument = HydratedDocument<Perfume>;
export const PerfumeSchema = SchemaFactory.createForClass(Perfume);
