import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Pagination } from 'src/common/Pagination';
import { Public } from 'src/decorators/Public.decorator';
import { ResponseDTO } from 'src/DTO/response.dto';
import { PaginationParseIntPipe } from 'src/pipes/PaginationParseIntPipe.pipe';
import { DeleteItemStatus } from 'src/types/deleteItemStatus';
import { PerfumeCreateDto } from './DTO/PerfumeCreateDTO.dto';
import { PerufmeReponseDTO } from './DTO/PerfumeResponseDTO.dto';
import { PerfumesService } from './perfume.service';

@Controller('perfumes')
export class PerfumesController {
  constructor(private readonly perfumeService: PerfumesService) {}

  @Public()
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
  async create(@Body() perfume: PerfumeCreateDto): Promise<ResponseDTO<PerufmeReponseDTO>> {
    const data = await this.perfumeService.create(perfume);
    return new ResponseDTO(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() perfume: PerfumeCreateDto): Promise<ResponseDTO<PerufmeReponseDTO>> {
    const data = await this.perfumeService.update(id, perfume);
    return new ResponseDTO(data);
  }

  @Post('/delete')
  async softDelete(@Body('ids') ids: string[]): Promise<ResponseDTO<DeleteItemStatus[]>> {
    const data = await this.perfumeService.softDelete(ids);
    return new ResponseDTO(data);
  }
}
