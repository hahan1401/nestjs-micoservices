import { Body, Controller, Inject, Post } from '@nestjs/common';
import { OrderCreateDto } from './DTO/OrderCreateDto.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  @Inject() private readonly orderService: OrderService;

  @Post()
  async create(@Body() order: OrderCreateDto) {
    return this.orderService.create(order);
  }
}
