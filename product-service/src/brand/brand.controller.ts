import { Controller, Get, Inject } from '@nestjs/common';
import { BrandService } from './brand.service';

@Controller('brands')
export class BrandController {
  @Inject()
  private readonly brandService: BrandService;

  @Get()
  async getAll() {
    return this.brandService.getAll();
  }
}
