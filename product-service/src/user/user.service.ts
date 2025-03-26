import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/User.chema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async getByUserName(username: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ username: username }).exec();
    return user;
  }
}
