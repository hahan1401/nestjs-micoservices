import { Controller, Get, Inject } from '@nestjs/common';
import { Public } from 'src/decorators/Public.decorator';
import { PaymentMethodService } from './payment-method.service';

@Controller('order-status')
export class PaymentMethodController {
  @Inject()
  private readonly paymentMethodService: PaymentMethodService;

  @Get()
  @Public()
  async getAll() {
    return this.paymentMethodService.getAll();
  }
}
