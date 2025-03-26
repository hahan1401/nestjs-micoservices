import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoleEnum } from 'src/enums/Roles';
import { Role } from './schemas/Role.schema';

@Injectable()
export class RoleService implements OnModuleInit {
  constructor(@InjectModel(Role.name) private readonly roleModel: Model<Role>) {}

  async onModuleInit() {
    const count = await this.roleModel.countDocuments();
    if (count === 0) {
      const roles = Object.values(RoleEnum).map((role) => ({ name: role }));
      await this.roleModel.insertMany(roles);
      console.info('Roles initialized');
    }
  }
}
