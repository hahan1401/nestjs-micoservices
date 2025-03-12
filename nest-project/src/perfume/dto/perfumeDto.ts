import { CategoryEntity } from 'src/category/entity/catgory.entity';

export class PerfumeDto {
  public id?: number;
  public name?: string;
  public description?: string;
  public price?: number;
  public categoryName?: string;
  constructor({
    id,
    name,
    description,
    price,
    category,
  }: {
    id?: number;
    name?: string;
    description?: string;
    price?: number;
    category?: CategoryEntity;
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.categoryName = category.name;
  }
}
