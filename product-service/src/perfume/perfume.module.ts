import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BrandModule } from 'src/brand/brand.module';
import { CategoryModule } from 'src/category/category.module';
import { PerfumeCollectionsModule } from 'src/perfume-collections/perfume-collections.module';
import { PerfumesController } from './perfume.controller';
import { PerfumesService } from './perfume.service';
import { Perfume, PerfumeSchema } from './schemas/perfume.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Perfume.name, schema: PerfumeSchema }]),
    CategoryModule,
    BrandModule,
    PerfumeCollectionsModule,
  ],
  controllers: [PerfumesController],
  providers: [PerfumesService],
  exports: [PerfumesService],
})
export class PerfumesModule {}
