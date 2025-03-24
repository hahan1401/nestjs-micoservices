import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HttpStatusCode } from 'axios';
import mongoose, { Model, ProjectionType, QueryOptions, RootFilterQuery } from 'mongoose';
import { ResponseDTO } from 'src/DTO/response.dto';
import { Category, CategoryDoctument } from './chemas/category.schema';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) {}

  async getAll(): Promise<ResponseDTO<CategoryDoctument[]>> {
    // await this.categoryModel.insertMany(CATEGORIES_DUMMY);

    const categories = await this.categoryModel.find();
    return new ResponseDTO<CategoryDoctument[]>(categories);
  }

  async getById(id: string): Promise<ResponseDTO<CategoryDoctument>> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpException(`Invalid category id: ${id}`, HttpStatusCode.BadRequest);
    }
    const category = await this.categoryModel.findById(id).exec();
    return new ResponseDTO<CategoryDoctument>(category);
  }

  async getByName(name: string): Promise<ResponseDTO<CategoryDoctument>> {
    const category = await this.categoryModel.findOne({ name: name }).exec();
    return new ResponseDTO<CategoryDoctument>(category);
  }

  async find(
    filter: RootFilterQuery<CategoryDoctument>,
    projection?: ProjectionType<CategoryDoctument> | null | undefined,
    options?: QueryOptions<CategoryDoctument> | null | undefined,
  ): Promise<ResponseDTO<CategoryDoctument[]>> {
    const data = await this.categoryModel.find(filter, projection, options).exec();
    return new ResponseDTO(data);
  }
}
