import { Controller, Get, Inject } from '@nestjs/common';
import { Public } from 'src/decorators/Public.decorator';
import { OrderStatusService } from './order-status.service';

@Controller('order-status')
export class OrderStatusController {
  @Inject()
  private readonly orderStatusService: OrderStatusService;

  @Get()
  @Public()
  async getAll() {
    return this.orderStatusService.getAll();
  }
}
