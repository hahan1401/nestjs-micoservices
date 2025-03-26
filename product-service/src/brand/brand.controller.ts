import { Controller, Get, Inject } from '@nestjs/common';
import { Public } from 'src/decorators/Public.decorator';
import { BrandService } from './brand.service';

@Controller('brands')
export class BrandController {
  @Inject()
  private readonly brandService: BrandService;

  @Get()
  @Public()
  async getAll() {
    return this.brandService.getAll();
  }
}
