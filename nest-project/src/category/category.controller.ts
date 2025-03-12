import { Controller, Get, Inject } from '@nestjs/common';
import { ResponseDTO } from 'src/DTO/response';
import { CategoryService } from './category.service';
import { CategoryEntity } from './entity/catgory.entity';

@Controller('category')
export class CategoryController {
  @Inject()
  private readonly categoryService: CategoryService;

  @Get('/')
  async getAll(): Promise<ResponseDTO<CategoryEntity[]>> {
    return this.categoryService.getAll();
  }
}
