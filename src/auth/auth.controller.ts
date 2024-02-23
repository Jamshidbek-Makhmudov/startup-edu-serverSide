import { Body, Controller, Get, HttpCode, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ThrottlerGuard } from '@nestjs/throttler';
import { AuthService } from 'src/auth/auth.service';
import { Auth } from 'src/auth/common/decorators/auth.decorator';
import { CheckUserDto, LoginAuthDto } from 'src/auth/dto/login.dto';
import { TokenDto } from 'src/auth/dto/token.dto';
import { User } from 'src/user/decorators/user.decorator';

@ApiTags('Auth')
  @Controller('auth')
@UseGuards(ThrottlerGuard) //throttler  limiting request to this controller
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Register' })
  @ApiResponse({ status: 200, type: Promise<LoginAuthDto> })
  @UsePipes(new ValidationPipe()) //middle level
  @ApiBody({ type: LoginAuthDto }) 
  @HttpCode(200)
  @Post('register')
  async register(@Body() dto: LoginAuthDto) {
    return this.authService.register(dto);
  }
  
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, type: Promise<LoginAuthDto> })
  @UsePipes(new ValidationPipe())
  @ApiBody({ type: LoginAuthDto }) 
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: LoginAuthDto) {
    return this.authService.login(dto);
  }
  
  @ApiOperation({ summary: 'Access' })
  @ApiResponse({ status: 200, type: Promise<TokenDto> })
  @UsePipes(new ValidationPipe())
  @ApiBody({ type: TokenDto }) 
  @HttpCode(200)
  @Post('access')
  async getNewTokens(@Body() dto: TokenDto) {
    return this.authService.getNewTokens(dto);
  }
  
  @ApiOperation({ summary: 'Check user' })
  @ApiResponse({ status: 200, type: Promise<String> })
  @ApiBody({ type: CheckUserDto }) 
  @HttpCode(200)
  @Post('check-user')
  async checkUser(@Body() dto: { email: string }) {
    return this.authService.checkUser(dto.email);
  }
  /**check intructor */
  @ApiOperation({ summary: 'Check instructor' })
  @ApiResponse({ status: 200, type: Promise<String> })
  @ApiBearerAuth() 
  @HttpCode(200)
  @Get('check-instructor')
  @Auth('INSTRUCTOR')
  async checkInstructor(@User('_id') _id: string) {
    return _id ? true : false;
  }
}
