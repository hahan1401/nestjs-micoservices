import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { OrderStatusEnum } from 'src/enums/Order';

@Schema({ collection: 'orderStatus' })
export class OrderStatus {
  @Prop({ type: String })
  name: OrderStatusEnum;
}

export type OrderStatusDocument = HydratedDocument<OrderStatus>;
export const OrderStatusSchema = SchemaFactory.createForClass(OrderStatus);
