import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatusCode } from 'axios';
import { isNil } from 'lodash';
import { CategoryEntity } from 'src/category/entity/catgory.entity';
import { ResponseDTO } from 'src/DTO/response';
import { Repository } from 'typeorm';
import { CreatePerfumeDto } from './dto/CreatePerfumeDto';
import { PerfumeDto } from './dto/perfumeDto';
import { PerfumeEntity } from './entity/perfume.entity';

@Injectable()
export class PerfumesService {
  @InjectRepository(PerfumeEntity)
  private readonly perfumesRepository: Repository<PerfumeEntity>;

  @InjectRepository(CategoryEntity)
  private readonly categoryRepository: Repository<CategoryEntity>;

  async getAll({
    categoryId,
  }: {
    categoryId?: string;
  }): Promise<ResponseDTO<PerfumeDto[]>> {
    const [perfumes, total] = await this.perfumesRepository.findAndCount({
      relations: ['category'],
      where: categoryId ? { category: { id: parseInt(categoryId) } } : {},
    });

    return new ResponseDTO(
      perfumes.map((perfume) => new PerfumeDto(perfume)),
      total,
    );
  }

  async create(perfume: CreatePerfumeDto): Promise<ResponseDTO<PerfumeDto>> {
    const { categoryId, ..._perfume } = perfume;
    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
    });

    if (!category) {
      throw new HttpException('Category not found', HttpStatusCode.BadRequest);
    }

    const newPerfume = this.perfumesRepository.create({
      ..._perfume,
      category,
    });
    const savedPerfume = await this.perfumesRepository.save(newPerfume);
    return new ResponseDTO(new PerfumeDto(savedPerfume));
  }

  async update(newPerfume: CreatePerfumeDto): Promise<ResponseDTO<PerfumeDto>> {
    if (isNil(newPerfume.id))
      throw new HttpException('Invalid id', HttpStatusCode.BadRequest);

    const { categoryId, ..._newPerfume } = newPerfume;
    const perfume = await this.perfumesRepository.findOne({
      where: { id: _newPerfume.id },
    });

    if (!perfume) {
      throw new HttpException('Perfume not found', HttpStatusCode.BadRequest);
    }

    const newCategory = await this.categoryRepository.findOne({
      where: {
        id: categoryId,
      },
    });
    if (!newCategory) {
      throw new HttpException('Category not found', HttpStatusCode.BadRequest);
    }

    const newEntity = await new CreatePerfumeDto(_newPerfume).toEntity(
      newCategory,
    );

    const updatedPerfume = await this.perfumesRepository.save(
      this.perfumesRepository.merge(perfume, newEntity),
    );

    return new ResponseDTO(new PerfumeDto(updatedPerfume));
  }

  async softDelete(id: number): Promise<ResponseDTO<string>> {
    try {
      const perfume = await this.perfumesRepository.findOneOrFail({
        where: { id: id },
      });
      console.log('perfume', perfume);
      if (!perfume) {
        throw new HttpException('Perfume not found', HttpStatusCode.BadRequest);
      }

      const data = await this.perfumesRepository.softDelete(id);
      console.error('data', data);
      return new ResponseDTO('Success');
    } catch (err) {
      console.error(`Falled to delete item with id = ${id}`, err);
      return new ResponseDTO(`Falled to delete item with id = ${id}`);
    }
  }
}
