import { OmitType } from '@nestjs/mapped-types';
import { Order } from '../schemas/order.schema';

export class OrderCreateDto extends OmitType(Order, ['perfumeId', 'customerId']) {
  customerName: string;
  contactNumber: string;
  perfumeId: string;
}
