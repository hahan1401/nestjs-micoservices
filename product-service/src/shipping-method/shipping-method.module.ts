import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ShippingMethod,
  ShippingMethodSchema,
} from './schemas/ShippingMethod.schema';
import { ShippingMethodController } from './shipping-method.controller';
import { ShippingMethodService } from './shipping-method.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ShippingMethod.name, schema: ShippingMethodSchema },
    ]),
  ],
  controllers: [ShippingMethodController],
  providers: [ShippingMethodService],
})
export class ShippingMethodModule {}
