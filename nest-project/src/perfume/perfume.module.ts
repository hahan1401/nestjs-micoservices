import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/category/entity/catgory.entity';
import { PerfumeEntity } from './entity/perfume.entity';
import { PerfumesController } from './perfume.controller';
import { PerfumesService } from './perfume.service';

@Module({
  imports: [TypeOrmModule.forFeature([PerfumeEntity, CategoryEntity])],
  controllers: [PerfumesController],
  providers: [PerfumesService],
  exports: [TypeOrmModule],
})
export class PerfumesModule {}
