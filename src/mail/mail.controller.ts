import { Body, Controller, HttpCode, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MailService } from 'src/mail/mail.service';
import { Auth } from 'src/auth/common/decorators/auth.decorator';
import { User } from 'src/user/decorators/user.decorator';

@ApiTags('Mail')
@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @ApiOperation({ summary: 'Send otp' })
  @ApiResponse({ status: 200, type: Promise<Boolean> })
  @HttpCode(200)
  @Post('send-otp')
  async sendOtp(@Body() dto: { email: string; isUser: boolean }) {
    return this.mailService.sendOtpVerification(dto.email, dto.isUser);
  }
  @ApiOperation({ summary: 'Verify otp' })
  @ApiResponse({ status: 200, type: Promise<String> })
  @HttpCode(200)
  @Post('verify-otp')
  async verifyOtp(@Body() dto: { email: string; otpVerification: string }) {
    return this.mailService.verifyOtp(dto.email, dto.otpVerification);
  }

  /**receive book mail */
  @ApiOperation({ summary: 'receive books' })
  @ApiResponse({ status: 200, type: Promise<String> })
  @HttpCode(200)
  @Post('books/:bookId')
  @Auth("USER")
  async recieveBooks(@Param('bookId') bookId: string, @User("_id") _id: string) {
    return this.mailService.recieveBooks(bookId, _id);
  }

}
