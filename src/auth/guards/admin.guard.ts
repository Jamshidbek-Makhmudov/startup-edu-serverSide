//foydalanuvhi adminmi yoqmi tekshiirb beradigan function yozamiz
// extends bn implements ni farqi: extends meros oladi va classni ishini kengaytirib beradi, biz yana meros olgan classimiz ichidagilarga ham access qila olmiz;
//implements da meros oladi va faqat shu meros olgan classini ichidagilarni ishlatishi kerak boladi ishlatmasa error beradi
//guard middleware true false qaytaradi adminligini tekshiradi
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserDocument } from 'src/user/user.model';

@Injectable()
export class OnlyAdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{ user: UserDocument }>();
    const user = request.user;

    if (user.role !== 'ADMIN')
      throw new ForbiddenException("Sorry you don't have access to the page");

    return user.role === 'ADMIN' && true;
  }
}
