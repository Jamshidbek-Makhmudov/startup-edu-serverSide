import { Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login.dto';
import { TokenDto } from './dto/token.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Register' })
  @ApiResponse({ status: 201, type: Promise<LoginAuthDto> })
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('register')
  async register(@Body() dto: LoginAuthDto) {
    return this.authService.register(dto);
  }

  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 201, type: Promise<LoginAuthDto> })
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: LoginAuthDto) {
    return this.authService.login(dto);
  }

  @ApiOperation({ summary: 'Access' })
  @ApiResponse({ status: 201, type: Promise<TokenDto> })
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('access')
  async getNewTokens(@Body() dto: TokenDto) {
    return this.authService.getNewTokens(dto);
  }

  @ApiOperation({ summary: 'Check user' })
  @ApiResponse({ status: 201, type: Promise<String> })
  @HttpCode(200)
  @Post('check-user')
  async checkUser(@Body() dto: { email: string }) {
    return this.authService.checkUser(dto.email);
  }
}
