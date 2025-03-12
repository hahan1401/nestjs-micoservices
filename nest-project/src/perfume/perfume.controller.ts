import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CustomParseInPipe } from 'src/pipes/CustomParseInPipe.pipe';
import { CreatePerfumeDto } from './dto/CreatePerfumeDto';
import { PerfumesService } from './perfume.service';

@Controller('perfumes')
export class PerfumesController {
  constructor(private readonly perfumeService: PerfumesService) {}

  @Get('/')
  async getAll(
    @Query('categoryId', CustomParseInPipe)
    categoryId?: string,
  ) {
    return this.perfumeService.getAll({ categoryId });
  }

  @Post('/')
  async create(@Body() perfume: CreatePerfumeDto) {
    return this.perfumeService.create(perfume);
  }

  @Put()
  async update(@Body() perfume: CreatePerfumeDto) {
    return this.perfumeService.update(perfume);
  }

  @Delete(':id')
  async softDelete(@Param('id', ParseIntPipe) id: number) {
    return this.perfumeService.softDelete(id);
  }
}
