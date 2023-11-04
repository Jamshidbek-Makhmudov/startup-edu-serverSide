import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserDocument } from 'src/user/schemas/user.schema';
@Injectable()
export class OnlyInstructorGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<{ user: UserDocument }>();
    const user = request.user;
    if (user.role !== 'INSTRUCTOR')
      throw new ForbiddenException('Sorry you are not allowed to access this page! ');
    return user.role === 'INSTRUCTOR' && true;
  }
}
