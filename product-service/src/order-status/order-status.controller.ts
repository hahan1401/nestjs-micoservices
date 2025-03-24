import { Controller, Get, Inject } from '@nestjs/common';
import { OrderStatusService } from './order-status.service';

@Controller('order-status')
export class OrderStatusController {
  @Inject()
  private readonly orderStatusService: OrderStatusService;

  @Get()
  async getAll() {
    return this.orderStatusService.getAll();
  }
}
