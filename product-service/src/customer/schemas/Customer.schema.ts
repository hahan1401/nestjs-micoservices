import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Order } from 'src/order/schemas/order.schema';

@Schema({ collection: 'customers' })
export class Customer {
  @Prop({ type: String, required: true })
  displayName: string;

  @Prop({ type: Number, required: true, index: true })
  contactNumber: number;

  @Prop({
    type: [{ type: mongoose.Types.ObjectId, ref: Order.name }],
    ref: Order.name,
    required: true,
  })
  orderIds: mongoose.Types.ObjectId[];
}

export type CustomerDocument = HydratedDocument<Order>;
export const CustomerSchema = SchemaFactory.createForClass(Order);
