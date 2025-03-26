import { Body, Controller, Inject, Post } from '@nestjs/common';
import { Public } from 'src/decorators/Public.decorator';
import { OrderCreateDto } from './DTO/OrderCreateDto.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  @Inject() private readonly orderService: OrderService;

  @Post()
  @Public()
  async create(@Body() order: OrderCreateDto) {
    return this.orderService.create(order);
  }
}
