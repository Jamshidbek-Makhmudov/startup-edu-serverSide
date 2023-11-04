import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserTypeData } from 'src/auth/dto/user.dto';
import { UserDocument } from '../schemas/user.schema';
//userni id sini topib  chiqarish uchun bu decoratorni yasadik
export const User = createParamDecorator((data: UserTypeData, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<{ user: UserDocument }>();
  const user = request.user;
  return data ? user?.[data] : user;
});
