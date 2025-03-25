import { HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HttpStatusCode } from 'axios';
import mongoose, { Model } from 'mongoose';
import { CustomerService } from 'src/customer/customer.service';
import { ResponseDTO } from 'src/DTO/response.dto';
import { PerfumesService } from 'src/perfume/perfume.service';
import { OrderCreateDto } from './DTO/OrderCreateDto.dto';
import { Order, OrderDocument } from './schemas/order.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
    @Inject() private readonly perfumesService: PerfumesService,
    @Inject() private readonly customerService: CustomerService,
  ) {}

  async create(_order: OrderCreateDto): Promise<ResponseDTO<OrderDocument | string>> {
    try {
      const { contactNumber, customerName, ...order } = _order;
      if (!contactNumber || !customerName) {
        throw new HttpException('Missing customer information', HttpStatusCode.BadRequest);
      }

      let existedCustomer = (await this.customerService.getByContactNumber(contactNumber)).getData();
      if (!existedCustomer) {
        existedCustomer = (
          await this.customerService.create({
            contactNumber: contactNumber,
            displayName: customerName,
          })
        ).getData();
      }

      const perfume = (await this.perfumesService.findById(order.perfumeId)).getData();
      if (!perfume) {
        throw new HttpException(`Perfune not fount with id=${order.perfumeId}`, HttpStatusCode.BadRequest);
      }
      if (perfume.remaining === 0) {
        return new ResponseDTO(`${perfume.name} is out of stock!`);
      }
      const data = await this.orderModel.create({
        ...order,
        perfumeId: new mongoose.Types.ObjectId(order.perfumeId),
        customerId: existedCustomer._id,
      });
      return new ResponseDTO(data);
    } catch (err) {
      throw new HttpException(err.message, HttpStatusCode.BadRequest);
    }
  }
}
