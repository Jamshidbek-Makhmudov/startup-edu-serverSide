//middleware- qorovul  sifatida qarashimiz mumkin boladi maznilga qandayladir get sorivini qabul qilib olish bolsa,
//shu get sorovdan oldin middleware (qorovul(guard) yozsak);
//keyin bu shu midleware success holatda bajarilsa gina shu get sorovni olish mumkin bomasa yoq
//nodejs-expressjsda middleware nestjsda bu narsa guard deb ataladi

import { Controller, Get } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { User } from './decorators/user.decorator';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('profile')
  //auth decoratormizi ichidagi guardlar true bolsa my profilga kiradi
  @Auth()
  async getProfile(@User('_id') _id: string) {
    return this.userService.byId(_id);
    //userni id sini chiqarib beruvchi decoratorni ishlatdik
  }
}
