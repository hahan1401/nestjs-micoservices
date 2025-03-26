import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HttpStatusCode } from 'axios';
import mongoose, { Model, ProjectionType, QueryOptions, RootFilterQuery } from 'mongoose';
import { Category, CategoryDoctument } from './chemas/category.schema';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) {}

  async getAll(): Promise<CategoryDoctument[]> {
    // await this.categoryModel.insertMany(CATEGORIES_DUMMY);

    const categories = await this.categoryModel.find();
    return categories;
  }

  async getById(id: string): Promise<CategoryDoctument> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpException(`Invalid category id: ${id}`, HttpStatusCode.BadRequest);
    }
    const category = await this.categoryModel.findById(id).exec();
    return category;
  }

  async getByName(name: string): Promise<CategoryDoctument> {
    const category = await this.categoryModel.findOne({ name: name }).exec();
    return category;
  }

  async find(
    filter: RootFilterQuery<CategoryDoctument>,
    projection?: ProjectionType<CategoryDoctument> | null | undefined,
    options?: QueryOptions<CategoryDoctument> | null | undefined,
  ): Promise<CategoryDoctument[]> {
    const data = await this.categoryModel.find(filter, projection, options).exec();
    return data;
  }
}
