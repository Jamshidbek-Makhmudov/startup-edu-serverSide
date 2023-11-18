import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { UserDocument } from '../schemas/user.schema';
import { UserTypeData } from '../dto/user.dto';
//userni id sini topib  chiqarish uchun decorator
export const User = createParamDecorator((data: UserTypeData, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<{ user: UserDocument }>();
  const user = request.user;
  return data ? user?.[data] : user;
});
