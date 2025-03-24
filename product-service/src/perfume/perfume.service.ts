import { HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HttpStatusCode } from 'axios';
import dayjs from 'dayjs';
import { isNil } from 'lodash';
import mongoose, { Model, PipelineStage } from 'mongoose';
import { BrandService } from 'src/brand/brand.service';
import { BrandDoctument, BrandSchema } from 'src/brand/chemas/brand.schema';
import { CategoryService } from 'src/category/category.service';
import { CategorySchema } from 'src/category/chemas/category.schema';
import { Pagination } from 'src/common/Pagination';
import { ResponseDTO } from 'src/DTO/response.dto';
import { DeleteItemStatus } from 'src/types/deleteItemStatus';
import { PerfumeCreateDto } from './DTO/PerfumeCreateDTO.dto';
import { PerufmeReponseDTO } from './DTO/PerfumeResponseDTO.dto';
import { Perfume, PerfumeDocument, PerfumePopulateKeys } from './schemas/perfume.schema';

@Injectable()
export class PerfumesService {
  constructor(
    @InjectModel(Perfume.name) private perfumeModel: Model<Perfume>,
    @Inject() private readonly categoryService: CategoryService,
    @Inject() private readonly brandService: BrandService,
  ) {}

  async findById(id: string): Promise<ResponseDTO<PerufmeReponseDTO>> {
    if (isNil(id)) throw new HttpException('id is required', HttpStatusCode.BadRequest);
    if (!mongoose.Types.ObjectId.isValid(id)) throw new HttpException('Invalid id', HttpStatusCode.BadRequest);

    const data = await this.perfumeModel
      .findById(id)
      .populate(PerfumePopulateKeys.brandId, 'name')
      .populate(PerfumePopulateKeys.categoryIds, 'name')
      .exec();

    return new ResponseDTO(this.PerfumePopulatedDto(data));
  }

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
          localField: PerfumePopulateKeys.categoryIds,
          foreignField: '_id',
          as: 'categories',
        },
      },
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
          categories: {
            $map: { input: '$categories', as: 'b', in: '$$b.name' },
          },
          brand: '$brand.name',
          createdAt: 1,
          updatedAt: 1,
          deletedAt: 1,
        },
      },
      {
        $skip: ((pagination?.pageIndex ?? 1) - 1) * (pagination?.pageSize ?? Number.MAX_SAFE_INTEGER),
      },
      { $limit: pagination?.pageSize ?? Number.MAX_SAFE_INTEGER },
    ] satisfies PipelineStage[];

    // await this.perfumeModel.create(
    //   await generateDummyData(this.categoryService, this.brandService),
    // );

    const [perfumes, total] = await Promise.allSettled<[Promise<PerufmeReponseDTO[]>, Promise<number>]>([
      this.perfumeModel.aggregate<PerufmeReponseDTO>(aggregationPipeline).exec(),
      this.perfumeModel.countDocuments(query).exec(),
    ]);
    const _perfumes = perfumes.status === 'fulfilled' ? perfumes.value : [];

    const _total = total.status === 'fulfilled' ? total.value : 0;
    return new ResponseDTO(_perfumes, _total);
  }

  async create(perfume: PerfumeCreateDto): Promise<ResponseDTO<PerufmeReponseDTO>> {
    const { notFoundCategoryIds } = await this.handleCheckCategories(perfume.categoryIds.map((id) => id.toString()));

    if (notFoundCategoryIds.length > 0) {
      throw new HttpException(`CategoryIds not found: ${notFoundCategoryIds.join(', ')}`, HttpStatusCode.BadRequest);
    }

    const foundBrand = await this.handleCheckBrand(perfume.brandId);

    const brandIdBeingSaved = perfume.brandId ? { brandId: foundBrand._id } : {};

    const categoriesBeingSaved =
      perfume.categoryIds.length > 0
        ? {
            categoryIds: perfume.categoryIds.map((id) => new mongoose.Types.ObjectId(id)),
          }
        : {};

    const savedPerfume = await this.perfumeModel.create({
      ...perfume,
      ...brandIdBeingSaved,
      ...categoriesBeingSaved,
    });

    const newPerfume = await this.findById(savedPerfume._id.toString());

    return new ResponseDTO(newPerfume.getData());
  }

  async update(id: string, newPerfume: PerfumeCreateDto): Promise<ResponseDTO<PerufmeReponseDTO>> {
    if (isNil(id)) throw new HttpException('id is required', HttpStatusCode.BadRequest);
    if (!mongoose.Types.ObjectId.isValid(id)) throw new HttpException('Invalid id', HttpStatusCode.BadRequest);

    const { categoryIds, ..._newPerfume } = newPerfume;

    const { notFoundCategoryIds } = await this.handleCheckCategories(categoryIds);
    if (notFoundCategoryIds.length > 0) {
      throw new HttpException(`CategoryIds not found: ${notFoundCategoryIds.join(', ')}`, HttpStatusCode.BadRequest);
    }

    const brandIdBeingSaved = newPerfume.brandId ? { brandId: new mongoose.Types.ObjectId(newPerfume.brandId) } : {};

    const categoriesBeingSaved =
      newPerfume.categoryIds.length > 0
        ? {
            categoryIds: newPerfume.categoryIds.map((id) => new mongoose.Types.ObjectId(id)),
          }
        : {};

    const data = await this.perfumeModel
      .findByIdAndUpdate(
        id,
        { ..._newPerfume, ...brandIdBeingSaved, ...categoriesBeingSaved, updatedAt: dayjs().toISOString() },
        { new: true },
      )
      .exec();

    if (!data) {
      throw new HttpException('Perfume not found', HttpStatusCode.BadRequest);
    }

    const _data = await this.findById(data._id.toString());

    return new ResponseDTO(_data.getData());
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
      const failedIds = data.filter((item) => item.status === 'fulfilled').map((item) => item.value);
      return new ResponseDTO<DeleteItemStatus[]>(failedIds);
    } catch (err) {
      console.error('Failed to delete perfumes', err);
      throw new HttpException('', HttpStatusCode.InternalServerError);
    }
  }

  private async handleCheckCategories(ids: string[]): Promise<{ notFoundCategoryIds: string[] }> {
    const categories = (await this.categoryService.find({ _id: { $in: ids } })).getData();
    const foundCategoryIds = new Set(categories.map((category) => category._id.toString()));
    const notFoundCategoryIds = ids.filter((id) => !foundCategoryIds.has(id.toString()));
    return { notFoundCategoryIds: notFoundCategoryIds };
  }

  private PerfumePopulatedDto(perfume: PerfumeDocument): PerufmeReponseDTO {
    return new PerufmeReponseDTO({
      _id: perfume._id.toString(),
      name: perfume.name,
      description: perfume.description,
      price: perfume.price,
      categories: Array.isArray(perfume.categoryIds)
        ? perfume.categoryIds.map((category) => ('name' in category ? category.name.toString() : null))
        : [],
      brand: typeof perfume.brandId === 'object' && 'name' in perfume.brandId ? perfume.brandId.name.toString() : null,
      createdAt: perfume.createdAt,
      updatedAt: perfume.updatedAt,
      deletedAt: perfume.deletedAt,
      remaining: perfume.remaining,
      soldAmount: perfume.soldAmount,
    });
  }

  private async handleCheckBrand(id: string): Promise<BrandDoctument> {
    const brand = await this.brandService.getById(id);
    if (!brand) {
      throw new HttpException(`Brand id not found: ${id}`, HttpStatusCode.BadRequest);
    }
    return brand.getData();
  }
}
