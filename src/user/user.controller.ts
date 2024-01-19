import { Body, Controller, Get, HttpCode, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Auth } from 'src/auth/common/decorators/auth.decorator';
import { User as UserDecorator } from 'src/user/decorators/user.decorator';
import { EmailAndPasswordDto, UpdateUserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { User  } from 'src/user/schemas/user.schema';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**find user by id */
  @ApiOperation({ summary: "get user's datas" })
  @ApiResponse({ status: 200, type: Promise<String>, description: 'successfule got user' })
  @HttpCode(200)
  @Get('profile')
  @Auth()
  async getProfile(@UserDecorator('_id') _id: string):Promise<User> {
    return this.userService.byId(_id);
  }

  /**edit user's password */
  @ApiOperation({ summary: 'change password' })
  @ApiResponse({ status: 200, type: Promise<String> })
  @HttpCode(200)
  @Put('edit-password')
  async editPassword(@Body() dto: EmailAndPasswordDto):Promise<string> {
    return this.userService.editPassword(dto);
  }

  /**update user  */
  @ApiOperation({ summary: 'update user' })
  @ApiResponse({ status: 200, type: Promise<String> })
  @HttpCode(200)
  @Put('update')
  @Auth()
  async updateUser(@Body() dto: UpdateUserDto, @UserDecorator("_id") _id:string) {
    return this.userService.updateUser(dto, _id);
  }

  /**transactions  */
  @ApiOperation({ summary: 'transactions' })
  @ApiResponse({ status: 200, type: Promise<String> })
  @HttpCode(200)
  @Get('transactions')
  @Auth()
  async allTransactions(@UserDecorator("customerId") customerId:string) {
    return this.userService.allTransactions(customerId);
  }

  /**my-courses  */
  @ApiOperation({ summary: 'my-courses' })
  @ApiResponse({ status: 200, type: Promise<String> })
  @HttpCode(200)
  @Get('my-courses')
  @Auth()
  async myCourses(@UserDecorator("_id") _id:string) {
    return this.userService.myCourses(_id);
  }
}
