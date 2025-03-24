import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import {
  OrderStatusEnum,
  PaymentMethodEnum,
  ShippingMethodEnum,
} from 'src/enums/Order';
import { Perfume } from 'src/perfume/schemas/perfume.schema';

@Schema({ collection: 'orders', timestamps: true })
export class Order {
  @Prop({
    type: mongoose.Types.ObjectId,
    ref: Perfume.name,
    refPath: '_id',
    required: true,
  })
  perfumeId: mongoose.Types.ObjectId;

  @Prop({ type: String, required: true })
  status: OrderStatusEnum;

  @Prop({ type: String, required: true })
  paymentMethod: PaymentMethodEnum;

  @Prop({ type: String, required: true })
  shippingMethood: ShippingMethodEnum;

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
}
