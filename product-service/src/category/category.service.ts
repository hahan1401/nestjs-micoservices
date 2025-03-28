import { HttpException, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HttpStatusCode } from 'axios';
import mongoose, { Model, ProjectionType, QueryOptions, RootFilterQuery } from 'mongoose';
import { Category, CategoryDoctument } from './chemas/category.schema';
import { CATEGORIES_DUMMY } from './chemas/dummyData';

@Injectable()
export class CategoryService implements OnModuleInit {
  constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) {}

  async onModuleInit() {
    const isExisted = (await this.categoryModel.countDocuments()) > 0;
    if (!isExisted) {
      const docs = Object.values(CATEGORIES_DUMMY).map((item) => item);
      console.log('docs', docs);
      await this.categoryModel.insertMany(docs);
      console.info('Categories initialized');
    }
  }

  async getAll(): Promise<CategoryDoctument[]> {
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
