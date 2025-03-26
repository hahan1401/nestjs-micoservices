import { Request } from 'express';
import { UserDocument } from 'src/user/schemas/User.chema';

export interface AuthenticatedRequest extends Request {
  user: Pick<UserDocument, '_id' | 'username' | 'roleId'>;
}
