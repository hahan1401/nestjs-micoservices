import { HttpException, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HttpStatusCode } from 'axios';
import dayjs from 'dayjs';
import mongoose, { Model } from 'mongoose';
import { Brand, BrandDoctument } from './chemas/brand.schema';
import { BRANDS_DUMMY } from './chemas/dummyData';

@Injectable()
export class BrandService implements OnModuleInit {
  constructor(@InjectModel(Brand.name) private readonly brandModel: Model<Brand>) {}

  async onModuleInit() {
    const isExisted = (await this.brandModel.countDocuments()) > 0;
    if (!isExisted) {
      const docs = Object.values(BRANDS_DUMMY).map((item) => item);
      await this.brandModel.insertMany(docs);
      console.info('Brands initialized');
    }
  }

  async getAll(): Promise<BrandDoctument[]> {
    try {
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
