import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HttpStatusCode } from 'axios';
import dayjs from 'dayjs';
import mongoose, { Model } from 'mongoose';
import { Brand, BrandDoctument } from './chemas/brand.schema';

@Injectable()
export class BrandService {
  constructor(@InjectModel(Brand.name) private readonly brandModel: Model<Brand>) {}

  async getAll(): Promise<BrandDoctument[]> {
    try {
      // await this.brandModel.insertMany(BRANDS_DUMMY);

      const data = await this.brandModel.find().exec();
      return data;
    } catch (err) {
      console.error(dayjs().format('DD/MM/YYYY HH:mm'), 'Get brands error: ', err);
      throw new HttpException(err.message, HttpStatusCode.InternalServerError);
    }
  }

  async getByName(name: string): Promise<BrandDoctument> {
    const brand = await this.brandModel.findOne({ name: name }).exec();
    return brand;
  }

  async getById(id: string): Promise<BrandDoctument> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpException(`Invalid brand id: ${id}`, HttpStatusCode.BadRequest);
    }
    const category = await this.brandModel.findById(new mongoose.Types.ObjectId(id)).exec();
    return category;
  }
}
