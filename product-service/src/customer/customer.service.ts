import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HttpStatusCode } from 'axios';
import { Model } from 'mongoose';
import { Customer, CustomerDocument } from './schemas/Customer.schema';

@Injectable()
export class CustomerService {
  constructor(@InjectModel(Customer.name) private readonly customerModel: Model<Customer>) {}

  async getByContactNumber(contactNumber: string): Promise<CustomerDocument> {
    if (!contactNumber) {
      console.error('getByContactNumber: missing contactNumber');
      throw new HttpException('Missing contactNumber', HttpStatusCode.BadRequest);
    }
    const customer = await this.customerModel.findOne({ contactNumber: { $eq: contactNumber } });
    return customer;
  }

  async create(customer: Customer): Promise<CustomerDocument> {
    const createdCustomer = await this.customerModel.create(customer);
    return createdCustomer;
  }
}
