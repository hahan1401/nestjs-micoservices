import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HttpStatusCode } from 'axios';
import dayjs from 'dayjs';
import mongoose, { Model } from 'mongoose';
import { ResponseDTO } from 'src/DTO/response.dto';
import { Brand, BrandDoctument } from './chemas/brand.schema';

@Injectable()
export class BrandService {
  constructor(@InjectModel(Brand.name) private readonly brandModel: Model<Brand>) {}

  async getAll() {
    try {
      // await this.brandModel.insertMany(BRANDS_DUMMY);

      const data = await this.brandModel.find();
      return new ResponseDTO(data);
    } catch (err) {
      console.error(dayjs().format('DD/MM/YYYY HH:mm'), 'Get brands error: ', err);
      throw new HttpException(err.message, HttpStatusCode.InternalServerError);
    }
  }

  async getByName(name: string): Promise<ResponseDTO<BrandDoctument>> {
    const category = await this.brandModel.findOne({ name: name }).exec();
    return new ResponseDTO<BrandDoctument>(category);
  }

  async getById(id: string): Promise<ResponseDTO<BrandDoctument>> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpException(`Invalid brand id: ${id}`, HttpStatusCode.BadRequest);
    }
    const category = await this.brandModel.findById(new mongoose.Types.ObjectId(id)).exec();
    return new ResponseDTO<BrandDoctument>(category);
  }
}
