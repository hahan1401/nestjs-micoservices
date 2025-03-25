import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
@Schema({ collection: 'customers' })
export class Customer {
  @Prop({ type: String, required: true })
  displayName: string;

  @Prop({ type: String, required: true, index: true })
  contactNumber: string;
}

export type CustomerDocument = HydratedDocument<Customer>;
export const CustomerSchema = SchemaFactory.createForClass(Customer);
