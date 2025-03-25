import { HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HttpStatusCode } from 'axios';
import mongoose, { Model } from 'mongoose';
import { ResponseDTO } from 'src/DTO/response.dto';
import { PerfumesService } from 'src/perfume/perfume.service';
import { OrderCreateDto } from './DTO/OrderCreateDto.dto';
import { Order, OrderDocument } from './schemas/order.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
    @Inject() private readonly perfumesService: PerfumesService,
  ) {}

  async create(order: OrderCreateDto): Promise<ResponseDTO<OrderDocument | string>> {
    try {
      const perfume = (await this.perfumesService.findById(order.perfumeId)).getData();
      if (!perfume) {
        throw new HttpException(`Perfune not fount with id=${order.perfumeId}`, HttpStatusCode.BadRequest);
      }
      if (perfume.remaining === 0) {
        return new ResponseDTO(`${perfume.name} is out of stock!`);
      }
      const data = await this.orderModel.create({ ...order, perfumeId: new mongoose.Types.ObjectId(order.perfumeId) });
      return new ResponseDTO(data);
    } catch (err) {
      throw new HttpException(err.message, HttpStatusCode.BadRequest);
    }
  }
}
