import { Body, Controller, Get, HttpCode, Put } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { InterfaceEmailAndPassword } from 'src/auth/dto/user.dto';
import { User } from './decorators/user.decorator';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @Auth()
  async getProfile(@User('_id') _id: string) {
    return this.userService.byId(_id);
  }

  @HttpCode(200)
  @Put('edit-password')
  async editPassword(@Body() dto: InterfaceEmailAndPassword) {
    return this.userService.editPassword(dto);
  }
}
//middleware- qorovul  sifatida qarashimiz mumkin boladi maznilga qandayladir get sorivini qabul qilib olish bolsa,
//shu get sorovdan oldin middleware (qorovul(guard) yozsak);
//keyin bu shu midleware success holatda bajarilsa gina shu get sorovni olish mumkin bomasa yoq
//nodejs-expressjsda middleware nestjsda bu narsa guard deb ataladi
