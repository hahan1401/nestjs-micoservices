import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ collection: 'brands', _id: true })
export class Brand {
  // @Prop({
  //   type: mongoose.Schema.Types.ObjectId,
  //   auto: true,
  //   _id: true,
  //   default: () => new mongoose.Types.ObjectId().toString(),
  // })
  // _id: ObjectId;

  @Prop({ required: true })
  name: string;
}

export type BrandDoctument = HydratedDocument<Brand>;
export const BrandSchema = SchemaFactory.createForClass(Brand);
