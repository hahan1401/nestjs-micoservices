import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerModule } from 'src/customer/customer.module';
import { PerfumesModule } from 'src/perfume/perfume.module';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Order, OrderSchema } from './schemas/order.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]), PerfumesModule, CustomerModule],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
