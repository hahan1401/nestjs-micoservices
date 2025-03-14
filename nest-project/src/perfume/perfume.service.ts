import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HttpStatusCode } from 'axios';
import mongoose, { Model, PipelineStage } from 'mongoose';
import { CategoryService } from 'src/category/category.service';
import { Pagination } from 'src/common/Pagination';
import { ResponseDTO } from 'src/DTO/response';
import { Perfume } from './schemas/perfume.schema';

@Injectable()
export class PerfumesService {
  constructor(
    @InjectModel(Perfume.name) private perfumeModel: Model<Perfume>,
    private readonly categoryService: CategoryService,
  ) {}

  async getAll({
    categoryId,
    pagination,
  }: {
    pagination?: Pagination;
    categoryId?: string;
  }): Promise<ResponseDTO<Perfume[]>> {
    const query = categoryId
      ? { categoryId: new mongoose.Types.ObjectId(categoryId) }
      : {};

    const aggregationPipeline = [
      { $match: query },
      {
        $lookup: {
          from: 'categories',
          localField: 'categoryId',
          foreignField: '_id',
          as: 'category',
        },
      },
      { $unwind: '$category' },
      {
        $project: {
          name: 1,
          description: 1,
          price: 1,
          createdDate: 1,
          modifiedDate: 1,
          deletedDate: 1,
          category: '$category.name',
        },
      },
      {
        $skip:
          ((pagination?.pageIndex ?? 1) - 1) *
          (pagination?.pageSize ?? Number.MAX_SAFE_INTEGER),
      },
      { $limit: pagination?.pageSize ?? Number.MAX_SAFE_INTEGER },
    ] satisfies PipelineStage[];

    // await this.perfumeModel.insertMany(PERFUMES_DUMMY);

    const [perfumes, total] = await Promise.allSettled([
      this.perfumeModel.aggregate(aggregationPipeline).exec(),
      this.perfumeModel.countDocuments(query).exec(),
    ]);
    const _perfumes = perfumes.status === 'fulfilled' ? perfumes.value : [];
    const _total = total.status === 'fulfilled' ? total.value : 0;
    return new ResponseDTO(_perfumes, _total);
  }

  async create(perfume: Perfume): Promise<ResponseDTO<Perfume>> {
    const category = (
      await this.categoryService.getById(perfume.categoryId)
    ).getData();

    if (!category) {
      throw new HttpException('Category not found', HttpStatusCode.BadRequest);
    }
    console.log('perfume', perfume);
    const savedPerfume = await this.perfumeModel.create(perfume);
    return new ResponseDTO(savedPerfume);
  }

  // async update(newPerfume: CreatePerfumeDto): Promise<ResponseDTO<PerfumeDto>> {
  //   if (isNil(newPerfume.id))
  //     throw new HttpException('Invalid id', HttpStatusCode.BadRequest);

  //   const { categoryId, ..._newPerfume } = newPerfume;
  //   const perfume = await this.perfumesRepository.findOne({
  //     where: { id: _newPerfume.id },
  //   });

  //   if (!perfume) {
  //     throw new HttpException('Perfume not found', HttpStatusCode.BadRequest);
  //   }

  //   const newCategory = await this.categoryRepository.findOne({
  //     where: {
  //       id: categoryId,
  //     },
  //   });
  //   if (!newCategory) {
  //     throw new HttpException('Category not found', HttpStatusCode.BadRequest);
  //   }

  //   const newEntity = await new CreatePerfumeDto(_newPerfume).toEntity(
  //     newCategory,
  //   );

  //   const updatedPerfume = await this.perfumesRepository.save(
  //     this.perfumesRepository.merge(perfume, newEntity),
  //   );

  //   return new ResponseDTO(new PerfumeDto(updatedPerfume));
  // }

  async softDelete(id: string): Promise<ResponseDTO<string>> {
    try {
      await this.perfumeModel
        .findByIdAndUpdate(id, {
          deletedDate: new Date().toISOString(),
        })
        .exec();
      return new ResponseDTO('Success');
    } catch (err) {
      console.error(`Falled to delete item with id = ${id}`, err);
      return new ResponseDTO(`Falled to delete item with id = ${id}`);
    }
  }
}
