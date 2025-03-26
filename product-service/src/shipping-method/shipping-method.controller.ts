import { Controller, Get, Inject } from '@nestjs/common';
import { Public } from 'src/decorators/Public.decorator';
import { ShippingMethodService } from './shipping-method.service';

@Controller('shipping-methods')
export class ShippingMethodController {
  @Inject()
  private readonly shippingMethodService: ShippingMethodService;

  @Public()
  @Get()
  async getAll() {
    return this.shippingMethodService.getAll();
  }
}
