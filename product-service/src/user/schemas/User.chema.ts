import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Role } from 'src/role/schemas/Role.schema';

@Schema({ collection: 'users' })
export class User {
  @Prop({ required: true, type: String, index: true })
  username: string;

  @Prop({ required: true, type: String })
  password: string;

  @Prop({ required: true, type: String })
  displayName: string;

  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: Role.name })
  roleId: mongoose.Types.ObjectId;

  @Prop({ required: true, default: () => new Date().toISOString() })
  createdAt: string;

  @Prop({ required: true, default: () => new Date().toISOString() })
  updatedAt: string;

  @Prop({ default: () => null })
  deletedAt?: string;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
