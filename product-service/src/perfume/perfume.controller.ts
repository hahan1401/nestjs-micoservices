import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Pagination } from 'src/common/Pagination';
import { PaginationParseIntPipe } from 'src/pipes/PaginationParseIntPipe.pipe';
import { PerfumesService } from './perfume.service';
import { PerfumeDocument } from './schemas/perfume.schema';

@Controller('perfumes')
export class PerfumesController {
  constructor(private readonly perfumeService: PerfumesService) {}

  @Get('/')
  async getAll(
    @Query(PaginationParseIntPipe) pagination?: Pagination,
    @Query('categoryId') categoryId?: string,
    @Query('brandId') brandId?: string,
  ) {
    return this.perfumeService.getAll({
      categoryId,
      brandId,
      pagination: pagination,
    });
  }

  @Post('/')
  async create(@Body() perfume: PerfumeDocument) {
    return this.perfumeService.create(perfume);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() perfume: PerfumeDocument) {
    console.log('id', id);
    return this.perfumeService.update(id, perfume);
  }

  @Post('/delete')
  async softDelete(@Body('ids') ids: string[]) {
    return this.perfumeService.softDelete(ids);
  }
}
