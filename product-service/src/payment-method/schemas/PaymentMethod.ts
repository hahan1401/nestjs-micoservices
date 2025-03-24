import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { PaymentMethodEnum } from 'src/enums/Order';

@Schema({ collection: 'paymentMethods' })
export class PaymentMethod {
  @Prop({ type: String })
  name: PaymentMethodEnum;
}

export type PaymentMethodDocument = HydratedDocument<PaymentMethod>;
export const PaymentMethodSchema = SchemaFactory.createForClass(PaymentMethod);
