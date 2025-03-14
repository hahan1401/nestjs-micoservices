import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HttpStatusCode } from 'axios';
import { isNil } from 'lodash';
import mongoose, { Model, PipelineStage } from 'mongoose';
import { CategoryService } from 'src/category/category.service';
import { Pagination } from 'src/common/Pagination';
import { ResponseDTO } from 'src/DTO/response';
import { DeleteItemStatus } from 'src/types/deleteItemStatus';
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
    // await this.perfumeModel.create(
    //   await generateDummyData(this.categoryService),
    // );

    const [perfumes, total] = await Promise.allSettled<
      [Promise<Perfume[]>, Promise<number>]
    >([
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

  async update(id: string, newPerfume: Perfume): Promise<ResponseDTO<Perfume>> {
    try {
      if (isNil(id))
        throw new HttpException('Invalid id', HttpStatusCode.BadRequest);

      const { categoryId, ..._newPerfume } = newPerfume;

      const newCategory = await this.categoryService.getById(categoryId);
      if (!newCategory) {
        throw new HttpException(
          'Category not found',
          HttpStatusCode.BadRequest,
        );
      }

      const data = await this.perfumeModel
        .findByIdAndUpdate(id, _newPerfume, { new: true })
        .exec();

      if (!data) {
        throw new HttpException('Perfume not found', HttpStatusCode.BadRequest);
      }

      return new ResponseDTO(data);
    } catch (err) {
      console.error('Update perfume error:', err);
      throw new HttpException('Perfume not found', HttpStatusCode.BadRequest);
    }
  }

  async softDelete(ids: string[]): Promise<ResponseDTO<DeleteItemStatus[]>> {
    try {
      const data = await Promise.allSettled<Promise<DeleteItemStatus>>(
        ids.map(async (id) => {
          try {
            const data = await this.perfumeModel
              .findByIdAndUpdate(id, {
                deletedDate: new Date().toISOString(),
              })
              .exec();
            if (data) return { status: true, id: id };
            return { status: false, id: id };
          } catch (err) {
            console.error('Delete item failed at id=', id, '\n===', err);
            return { status: false, id: id };
          }
        }),
      );
      const failedIds = data
        .filter((item) => item.status === 'fulfilled')
        .map((item) => item.value);
      return new ResponseDTO<DeleteItemStatus[]>(failedIds);
    } catch (err) {
      console.error('Failed to delete perfumes', err);
      throw new HttpException('', HttpStatusCode.InternalServerError);
    }
  }
}
