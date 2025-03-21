import { Controller, Get, Inject } from '@nestjs/common';
import { ResponseDTO } from 'src/DTO/response.dto';
import { CategoryService } from './category.service';
import { Category } from './chemas/category.schema';

@Controller('category')
export class CategoryController {
  @Inject()
  private readonly categoryService: CategoryService;

  @Get()
  async getAll(): Promise<ResponseDTO<Category[]>> {
    return this.categoryService.getAll();
  }
}
