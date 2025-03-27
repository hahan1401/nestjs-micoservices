import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PerfumeCollectionsController } from './perfume-collections.controller';
import { PerfumeCollectionsService } from './perfume-collections.service';
import { PerfumeCollection, PerfumeCollectionSchema } from './schemas/PerfumeCollection.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: PerfumeCollection.name, schema: PerfumeCollectionSchema }])],
  providers: [PerfumeCollectionsService],
  controllers: [PerfumeCollectionsController],
  exports: [PerfumeCollectionsService],
})
export class PerfumeCollectionsModule {}
