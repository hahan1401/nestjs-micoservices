import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseDTO } from 'src/DTO/response';
import { Repository } from 'typeorm';
import { CategoryEntity } from './entity/catgory.entity';

@Injectable()
export class CategoryService {
  @InjectRepository(CategoryEntity)
  private readonly categoryRepository: Repository<CategoryEntity>;

  async getAll(): Promise<ResponseDTO<CategoryEntity[]>> {
    const [categories, total] = await this.categoryRepository.findAndCount();
    return new ResponseDTO<CategoryEntity[]>(categories, total);
  }
}
