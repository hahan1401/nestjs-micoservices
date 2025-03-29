import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ collection: 'brands', timestamps: true })
export class Brand {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  thumbnailUrl: string;

  @Prop({ required: true })
  description: string;
}

export type BrandDoctument = HydratedDocument<Brand>;
export const BrandSchema = SchemaFactory.createForClass(Brand);
