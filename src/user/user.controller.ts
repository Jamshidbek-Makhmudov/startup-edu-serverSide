import { Body, Controller, Get, HttpCode, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/common/decorators/auth.decorator';

import { User } from './decorators/user.decorator';
import { InterfaceEmailAndPassword } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: "get user's datas" })
  @ApiResponse({ status: 200, type: Promise<String> })
  @Get('profile')
  @Auth()
  async getProfile(@User('_id') _id: string) {
    return this.userService.byId(_id);
  }

  @ApiOperation({ summary: 'change password' })
  @ApiResponse({ status: 200, type: Promise<String> })
  @HttpCode(200)
  @Put('edit-password')
  async editPassword(@Body() dto: InterfaceEmailAndPassword) {
    return this.userService.editPassword(dto);
  }
}
