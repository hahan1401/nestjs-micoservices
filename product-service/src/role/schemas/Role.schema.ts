import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { RoleEnum } from 'src/enums/Roles';

@Schema({ collection: 'roles' })
export class Role {
  @Prop({ type: String, enum: RoleEnum })
  name: RoleEnum;
}

export type RoleDocument = HydratedDocument<Role>;
export const RoleSchema = SchemaFactory.createForClass(Role);
