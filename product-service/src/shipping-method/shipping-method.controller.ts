import { Controller, Get, Inject } from '@nestjs/common';
import { Public } from 'src/decorators/Public.decorator';
import { ResponseDTO } from 'src/DTO/response.dto';
import { ShippingMethodDocument } from './schemas/ShippingMethod.schema';
import { ShippingMethodService } from './shipping-method.service';

@Controller('shipping-methods')
export class ShippingMethodController {
  @Inject()
  private readonly shippingMethodService: ShippingMethodService;

  @Public()
  @Get()
  async getAll(): Promise<ResponseDTO<ShippingMethodDocument[]>> {
    const data = await this.shippingMethodService.getAll();
    return new ResponseDTO(data);
  }
}
