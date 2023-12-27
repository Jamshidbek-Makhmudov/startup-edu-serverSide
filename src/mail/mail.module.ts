import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { MailController } from 'src/mail/mail.controller';
import { MailService } from 'src/mail/mail.service';
import { Otp, OtpSchema } from 'src/mail/schemas/otp.schema';
import { Book, BookSchema } from 'src/books/schemas/book.schema';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: Otp.name, schema: OtpSchema },
      { name: User.name, schema: UserSchema },
      { name: Book.name, schema: BookSchema },
    ]),
  ],
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule {}
