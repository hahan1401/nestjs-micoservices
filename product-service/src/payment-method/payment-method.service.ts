import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaymentMethodEnum } from 'src/enums/Order';
import { PaymentMethod, PaymentMethodDocument } from './schemas/PaymentMethod';

@Injectable()
export class PaymentMethodService implements OnModuleInit {
  constructor(
    @InjectModel(PaymentMethod.name)
    private readonly paymentMethodModel: Model<PaymentMethod>,
  ) {}

  async onModuleInit() {
    const count = await this.paymentMethodModel.countDocuments();
    if (count === 0) {
      const paymentMethod = Object.values(PaymentMethodEnum).map((status) => ({
        name: status,
      }));
      await this.paymentMethodModel.insertMany(paymentMethod);
      console.info('Payment methods initialized');
    }
  }

  async getAll(): Promise<PaymentMethodDocument[]> {
    const paymentMethod = await this.paymentMethodModel.find();
    return paymentMethod;
  }
}
