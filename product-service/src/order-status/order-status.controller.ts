import { Controller, Get, Inject } from '@nestjs/common';
import { Public } from 'src/decorators/Public.decorator';
import { ResponseDTO } from 'src/DTO/response.dto';
import { OrderStatusService } from './order-status.service';
import { OrderStatusDocument } from './schemas/OrderStatus.schema';

@Controller('order-status')
export class OrderStatusController {
  @Inject()
  private readonly orderStatusService: OrderStatusService;

  @Get()
  @Public()
  async getAll(): Promise<ResponseDTO<OrderStatusDocument[]>> {
    const data = await this.orderStatusService.getAll();
    return new ResponseDTO(data);
  }
}
