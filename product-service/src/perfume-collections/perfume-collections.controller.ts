import { Controller, Get, Inject } from '@nestjs/common';
import { Public } from 'src/decorators/Public.decorator';
import { ResponseDTO } from 'src/DTO/response.dto';
import { PerfumeCollectionsService } from './perfume-collections.service';
import { PerfumeCollectionDocument } from './schemas/PerfumeCollection.schema';

@Controller('perfume-collections')
export class PerfumeCollectionsController {
  constructor(@Inject() private readonly perfumeCollectionService: PerfumeCollectionsService) {}

  @Get()
  @Public()
  async getAll(): Promise<ResponseDTO<PerfumeCollectionDocument[]>> {
    const data = await this.perfumeCollectionService.getAll();
    return new ResponseDTO(data);
  }
}
