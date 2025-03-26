import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderStatusEnum } from 'src/enums/Order';
import { OrderStatus, OrderStatusDocument } from './schemas/OrderStatus.schema';

@Injectable()
export class OrderStatusService implements OnModuleInit {
  constructor(
    @InjectModel(OrderStatus.name)
    private readonly orderStatusModel: Model<OrderStatus>,
  ) {}

  async onModuleInit() {
    const count = await this.orderStatusModel.countDocuments();
    if (count === 0) {
      const orderstatus = Object.values(OrderStatusEnum).map((status) => ({
        name: status,
      }));
      await this.orderStatusModel.insertMany(orderstatus);
      console.info('Order status initialized');
    }
  }

  async getAll(): Promise<OrderStatusDocument[]> {
    const orderstatus = await this.orderStatusModel.find();
    return orderstatus;
  }
}
