import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Customer } from 'src/customer/schemas/Customer.schema';
import { OrderStatusEnum, PaymentMethodEnum, ShippingMethodEnum } from 'src/enums/Order';
import { Perfume } from 'src/perfume/schemas/perfume.schema';
@Schema({ collection: 'orders', timestamps: true })
export class Order {
  @Prop({
    type: mongoose.Types.ObjectId,
    ref: Perfume.name,
    refPath: '_id',
    required: true,
    validate: {
      validator: (value: unknown) => value instanceof mongoose.Types.ObjectId,
      message: 'Invalid ObjectId',
    },
  })
  perfumeId: mongoose.Types.ObjectId;

  @Prop({ type: String, required: true, enum: OrderStatusEnum })
  status: OrderStatusEnum;

  @Prop({ type: String, required: true, enum: PaymentMethodEnum })
  paymentMethod: PaymentMethodEnum;

  @Prop({ type: String, required: true, enum: ShippingMethodEnum })
  shippingMethod: ShippingMethodEnum;

  @Prop({
    type: Number,
    validate: {
      validator: (value: number) => {
        return value > 0;
      },
      message: 'Amount must be greater than 0',
    },
    required: true,
  })
  amount: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Customer.name, required: true })
  customerId: mongoose.Types.ObjectId;
}

export type OrderDocument = HydratedDocument<Order>;
export const OrderSchema = SchemaFactory.createForClass(Order);
