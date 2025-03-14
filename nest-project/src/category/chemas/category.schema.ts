import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

@Schema({ collection: 'categories' })
export class Category {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  name: string;
}

export type CategoryDoctument = HydratedDocument<Category>;
export const CategorySchema = SchemaFactory.createForClass(Category);
