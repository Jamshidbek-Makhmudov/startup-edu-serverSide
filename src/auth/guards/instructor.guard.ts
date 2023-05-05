//foydalanuvhi instrucotrmi yoqmi tekshiirb beradigan function yozamiz
// extends bn implements ni farqi: extends meros oladi va classni ishini kengaytirib beradi, biz yana meros olgan classimiz ichidagilarga ham access qila olmiz;
//implements da meros oladi va faqat shu meros olgan classini ichidagilarni ishlatishi kerak boladi ishlatmasa error beradi
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserDocument } from 'src/user/user.model';
//guard middleware true false qaytaradi instructor ekanligini tekshiradi
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
