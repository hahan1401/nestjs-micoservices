import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ collection: 'categories', timestamps: true })
export class Category {
  @Prop({ required: true })
  name: string;
}

export type CategoryDoctument = HydratedDocument<Category>;
export const CategorySchema = SchemaFactory.createForClass(Category);
