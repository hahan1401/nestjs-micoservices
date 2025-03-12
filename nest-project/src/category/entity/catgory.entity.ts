import { PerfumeEntity } from 'src/perfume/entity/perfume.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categories')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @OneToMany(() => PerfumeEntity, (product) => product.category)
  products: PerfumeEntity[];
}
