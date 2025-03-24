import { Controller, Get, Inject } from '@nestjs/common';
import { ShippingMethodService } from './shipping-method.service';

@Controller('shipping-methods')
export class ShippingMethodController {
  @Inject()
  private readonly shippingMethodService: ShippingMethodService;

  @Get()
  async getAll() {
    return this.shippingMethodService.getAll();
  }
}
