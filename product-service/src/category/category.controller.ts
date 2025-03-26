import { Controller, Get, Inject } from '@nestjs/common';
import { Public } from 'src/decorators/Public.decorator';
import { ResponseDTO } from 'src/DTO/response.dto';
import { CategoryService } from './category.service';
import { Category } from './chemas/category.schema';

@Controller('category')
export class CategoryController {
  @Inject()
  private readonly categoryService: CategoryService;

  @Get()
  @Public()
  async getAll(): Promise<ResponseDTO<Category[]>> {
    return this.categoryService.getAll();
  }
}
