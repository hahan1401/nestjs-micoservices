import { Inject } from '@nestjs/common';
import { CategoryEntity } from 'src/category/entity/catgory.entity';
import { Repository } from 'typeorm';
import { PerfumeEntity } from '../entity/perfume.entity';

export class CreatePerfumeDto {
  public id?: number;
  public name?: string;
  public description?: string;
  public price?: number;
  public categoryId?: number;

  @Inject()
  private readonly categoryRepository: Repository<CategoryEntity>;

  constructor({
    id,
    name,
    description,
    price,
    categoryId,
  }: {
    id?: number;
    name?: string;
    description?: string;
    price?: number;
    categoryId?: number;
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.categoryId = categoryId;
  }

  async toEntity(category?: CategoryEntity): Promise<PerfumeEntity> {
    if (category) {
      return {
        id: this.id,
        name: this.name,
        description: this.description,
        price: this.price,
        category: category,
      };
    }

    const _category = await this.categoryRepository.findOneByOrFail({
      id: this.categoryId,
    });
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price,
      category: _category,
    };
  }
}
