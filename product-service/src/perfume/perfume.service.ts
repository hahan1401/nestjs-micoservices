import { HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HttpStatusCode } from 'axios';
import { isNil } from 'lodash';
import mongoose, { Model, PipelineStage } from 'mongoose';
import { BrandService } from 'src/brand/brand.service';
import { BrandSchema } from 'src/brand/chemas/brand.schema';
import { CategoryService } from 'src/category/category.service';
import { CategorySchema } from 'src/category/chemas/category.schema';
import { Pagination } from 'src/common/Pagination';
import { ResponseDTO } from 'src/DTO/response.dto';
import { DeleteItemStatus } from 'src/types/deleteItemStatus';
import { PerufmeReponseDTO } from './DTO/PerfumeResponseDTO.dto';
import {
  Perfume,
  PerfumeDocument,
  PerfumePopulateKeys,
} from './schemas/perfume.schema';

@Injectable()
export class PerfumesService {
  constructor(
    @InjectModel(Perfume.name) private perfumeModel: Model<Perfume>,
    @Inject() private readonly categoryService: CategoryService,
    @Inject() private readonly brandService: BrandService,
  ) {}

  async getAll({
    categoryId,
    pagination,
    brandId,
  }: {
    pagination?: Pagination;
    categoryId?: string;
    brandId?: string;
  }): Promise<ResponseDTO<PerufmeReponseDTO[]>> {
    const _categoryId = categoryId && new mongoose.Types.ObjectId(categoryId);
    const _brandId = brandId && new mongoose.Types.ObjectId(brandId);
    const query = {
      ...(_categoryId ? { categoryId: _categoryId } : {}),
      ...(_brandId ? { brandId: _brandId } : {}),
    };
    const aggregationPipeline = [
      { $match: query },
      {
        $lookup: {
          from: CategorySchema.get('collection'),
          localField: PerfumePopulateKeys.categoryId,
          foreignField: '_id',
          as: 'category',
        },
      },
      { $unwind: '$category' },
      {
        $lookup: {
          from: BrandSchema.get('collection'),
          localField: PerfumePopulateKeys.brandId,
          foreignField: '_id',
          as: 'brand',
        },
      },
      { $unwind: '$brand' },
      {
        $project: {
          name: 1,
          description: 1,
          price: 1,
          category: '$category.name',
          brand: '$brand.name',
          createdAt: 1,
          updatedAt: 1,
          deletedAt: 1,
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
    //   await generateDummyData(this.categoryService, this.brandService),
    // );

    const [perfumes, total] = await Promise.allSettled<
      [Promise<PerufmeReponseDTO[]>, Promise<number>]
    >([
      this.perfumeModel
        .aggregate<PerufmeReponseDTO>(aggregationPipeline)
        .exec(),
      this.perfumeModel.countDocuments(query).exec(),
    ]);
    const _perfumes = perfumes.status === 'fulfilled' ? perfumes.value : [];

    const _total = total.status === 'fulfilled' ? total.value : 0;
    return new ResponseDTO(_perfumes, _total);
  }

  async create(
    perfume: PerfumeDocument,
  ): Promise<ResponseDTO<PerfumeDocument>> {
    const category = (
      await this.categoryService.getById(perfume.categoryId.toString())
    ).getData();

    if (!category) {
      throw new HttpException('Category not found', HttpStatusCode.BadRequest);
    }
    console.log('perfume', perfume);
    const savedPerfume = await this.perfumeModel.create(perfume);
    return new ResponseDTO(savedPerfume);
  }

  async update(
    id: string,
    newPerfume: PerfumeDocument,
  ): Promise<ResponseDTO<PerfumeDocument>> {
    try {
      if (isNil(id))
        throw new HttpException('Invalid id', HttpStatusCode.BadRequest);

      const { categoryId, ..._newPerfume } = newPerfume;

      const newCategory = await this.categoryService.getById(
        categoryId.toString(),
      );
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
                deletedAt: new Date().toISOString(),
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
