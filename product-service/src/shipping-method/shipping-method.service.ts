import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ShippingMethodEnum } from 'src/enums/Order';
import { ShippingMethod, ShippingMethodDocument } from './schemas/ShippingMethod.schema';

@Injectable()
export class ShippingMethodService implements OnModuleInit {
  constructor(
    @InjectModel(ShippingMethod.name)
    private readonly shippingMethodModel: Model<ShippingMethod>,
  ) {}

  async onModuleInit() {
    const count = await this.shippingMethodModel.countDocuments();
    if (count === 0) {
      const shippingMethod = Object.values(ShippingMethodEnum).map((status) => ({
        name: status,
      }));
      await this.shippingMethodModel.insertMany(shippingMethod);
      console.info('Shhipping methods initialized');
    }
  }

  async getAll(): Promise<ShippingMethodDocument[]> {
    const shippingMethod = await this.shippingMethodModel.find();
    return shippingMethod;
  }
}
