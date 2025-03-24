import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseDTO } from 'src/DTO/response.dto';
import { Category, CategoryDoctument } from './chemas/category.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async getAll(): Promise<ResponseDTO<CategoryDoctument[]>> {
    // await this.categoryModel.insertMany(CATEGORIES_DUMMY);

    const categories = await this.categoryModel.find();
    return new ResponseDTO<CategoryDoctument[]>(categories);
  }

  async getById(id: string): Promise<ResponseDTO<CategoryDoctument>> {
    const category = await this.categoryModel.findById(id).exec();
    return new ResponseDTO<CategoryDoctument>(category);
  }

  async getByName(name: string): Promise<ResponseDTO<CategoryDoctument>> {
    const category = await this.categoryModel.findOne({ name: name }).exec();
    return new ResponseDTO<CategoryDoctument>(category);
  }
}
