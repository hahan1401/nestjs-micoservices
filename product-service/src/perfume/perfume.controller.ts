import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Pagination } from 'src/common/Pagination';
import { Public } from 'src/decorators/Public.decorator';
import { ResponseDTO } from 'src/DTO/response.dto';
import { OptionalParseIntPipe } from 'src/pipes/OptionalParseIntPipe.pipe';
import { PaginationParseIntPipe } from 'src/pipes/PaginationParseIntPipe.pipe';
import { DeleteItemStatus } from 'src/types/deleteItemStatus';
import { PerfumeCreateDto } from './DTO/PerfumeCreateDTO.dto';
import { PerufmeReponseDTO } from './DTO/PerfumeResponseDTO.dto';
import { PerfumesService } from './perfume.service';
import { IPerfumeFilterFromQuery } from './types';

@Controller('perfumes')
export class PerfumesController {
  constructor(private readonly perfumeService: PerfumesService) {}

  @Public()
  @Get('/')
  async getAll(
    @Query(PaginationParseIntPipe) pagination?: Pagination,
    @Query('minPrice', OptionalParseIntPipe) minPrice?: number,
    @Query('maxPrice', OptionalParseIntPipe) maxPrice?: number,
    @Query() filter?: IPerfumeFilterFromQuery,
  ) {
    return this.perfumeService.getAll({
      pagination: pagination,
      filter: {
        brands: filter.brands?.split(',') ?? [],
        collections: filter.collections?.split(',') ?? [],
        maxPrice: maxPrice,
        minPrice: minPrice,
      },
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
