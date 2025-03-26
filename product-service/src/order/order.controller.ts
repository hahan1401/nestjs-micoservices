import { Body, Controller, Inject, Post } from '@nestjs/common';
import { Public } from 'src/decorators/Public.decorator';
import { ResponseDTO } from 'src/DTO/response.dto';
import { OrderCreateDto } from './DTO/OrderCreateDto.dto';
import { OrderService } from './order.service';
import { OrderDocument } from './schemas/order.schema';

@Controller('order')
export class OrderController {
  @Inject() private readonly orderService: OrderService;

  @Post()
  @Public()
  async create(@Body() order: OrderCreateDto): Promise<ResponseDTO<OrderDocument | string>> {
    const data = await this.orderService.create(order);
    return new ResponseDTO(data);
  }
}
