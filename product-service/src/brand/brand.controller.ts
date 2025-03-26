import { Controller, Get, Inject } from '@nestjs/common';
import { Public } from 'src/decorators/Public.decorator';
import { ResponseDTO } from 'src/DTO/response.dto';
import { BrandService } from './brand.service';
import { BrandDoctument } from './chemas/brand.schema';

@Controller('brands')
export class BrandController {
  @Inject()
  private readonly brandService: BrandService;

  @Get()
  @Public()
  async getAll(): Promise<ResponseDTO<BrandDoctument[]>> {
    const data = await this.brandService.getAll();
    return new ResponseDTO(data);
  }
}
