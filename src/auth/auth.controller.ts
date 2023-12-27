import { Body, Controller, Get, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { LoginAuthDto } from 'src/auth/dto/login.dto';
import { TokenDto } from 'src/auth/dto/token.dto';
import { User } from 'src/user/decorators/user.decorator';
import { Auth } from 'src/auth/common/decorators/auth.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Register' })
  @ApiResponse({ status: 200, type: Promise<LoginAuthDto> })
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('register')
  async register(@Body() dto: LoginAuthDto) {
    return this.authService.register(dto);
  }

  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, type: Promise<LoginAuthDto> })
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: LoginAuthDto) {
    return this.authService.login(dto);
  }

  @ApiOperation({ summary: 'Access' })
  @ApiResponse({ status: 200, type: Promise<TokenDto> })
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('access')
  async getNewTokens(@Body() dto: TokenDto) {
    return this.authService.getNewTokens(dto);
  }

  @ApiOperation({ summary: 'Check user' })
  @ApiResponse({ status: 200, type: Promise<String> })
  @HttpCode(200)
  @Post('check-user')
  async checkUser(@Body() dto: { email: string }) {
    return this.authService.checkUser(dto.email);
  }
  /**check intructor */
  @ApiOperation({ summary: 'Check instructor' })
  @ApiResponse({ status: 200, type: Promise<String> })
  @HttpCode(200)
  @Get('check-instructor')
  @Auth("INSTRUCTOR")
  async checkInstructor(@User('_id') _id: string) {
    return _id ? true : false;
  }
}
