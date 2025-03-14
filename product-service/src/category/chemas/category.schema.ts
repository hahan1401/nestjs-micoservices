import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

@Schema({ collection: 'categories' })
export class Category {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  })
  _id: ObjectId;

  @Prop({ required: true })
  name: string;
}

export type CategoryDoctument = HydratedDocument<Category>;
export const CategorySchema = SchemaFactory.createForClass(Category);
