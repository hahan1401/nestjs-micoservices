import { Controller, Get, Inject } from '@nestjs/common';
import { PaymentMethodService } from './payment-method.service';

@Controller('order-status')
export class PaymentMethodController {
  @Inject()
  private readonly paymentMethodService: PaymentMethodService;

  @Get()
  async getAll() {
    return this.paymentMethodService.getAll();
  }
}
