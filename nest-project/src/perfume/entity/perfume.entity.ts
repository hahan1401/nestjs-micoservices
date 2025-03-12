import { CategoryEntity } from 'src/category/entity/catgory.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('perfumes')
export class PerfumeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @ManyToOne(() => CategoryEntity, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

  @Column({
    name: 'created_date',
    type: 'timestamp',
    default: () => 'NOW()',
  })
  createdDate?: Date;

  @Column({
    name: 'modified_date',
    type: 'timestamp',
    default: () => 'NOW()',
    onUpdate: 'NOW()',
  })
  modifiedDate?: Date;

  @DeleteDateColumn({ name: 'deleted_date', type: 'timestamp', nullable: true })
  deletedDate?: Date;
}
