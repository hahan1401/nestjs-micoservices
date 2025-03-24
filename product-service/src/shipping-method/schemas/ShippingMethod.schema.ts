import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ShippingMethodEnum } from 'src/enums/Order';

@Schema({ collection: 'shippingMethods' })
export class ShippingMethod {
  @Prop({ type: String })
  name: ShippingMethodEnum;
}

export type ShippingMethodDocument = HydratedDocument<ShippingMethod>;
export const ShippingMethodSchema =
  SchemaFactory.createForClass(ShippingMethod);
