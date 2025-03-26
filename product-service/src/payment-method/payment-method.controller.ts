import { Controller, Get, Inject } from '@nestjs/common';
import { Public } from 'src/decorators/Public.decorator';
import { ResponseDTO } from 'src/DTO/response.dto';
import { PaymentMethodService } from './payment-method.service';
import { PaymentMethodDocument } from './schemas/PaymentMethod';

@Controller('order-status')
export class PaymentMethodController {
  @Inject()
  private readonly paymentMethodService: PaymentMethodService;

  @Get()
  @Public()
  async getAll(): Promise<ResponseDTO<PaymentMethodDocument[]>> {
    const data = await this.paymentMethodService.getAll();
    return new ResponseDTO(data);
  }
}
