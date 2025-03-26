import { OmitType } from '@nestjs/mapped-types';
import { User } from '../schemas/User.chema';

export class UserDto extends OmitType(User, ['roleId', 'password']) {
  _id: string;
  role: string;

  constructor(user: UserDto) {
    super();
    this._id = user._id;
    this.createdAt = user.createdAt;
    this.deletedAt = user.deletedAt;
    this.displayName = user.displayName;
    this.role = user.role;
    this.updatedAt = user.updatedAt;
    this.username = user.username;
  }
}
