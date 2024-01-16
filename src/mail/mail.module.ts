import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { MailController } from 'src/mail/mail.controller';
import { MailService } from 'src/mail/mail.service';
import { Otp, OtpSchema } from 'src/mail/schemas/otp.schema';
import { Book, BookSchema } from 'src/books/schemas/book.schema';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

@Module({
  imports: [   
    ConfigModule,
    MongooseModule.forFeature([
      { name: Otp.name, schema: OtpSchema },
      { name: User.name, schema: UserSchema },
      { name: Book.name, schema: BookSchema },
    ]),
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('MAILER_HOST'),
          secure: false,
          auth: {
            user: config.get('MAILDEV_USER'),
            pass: config.get('MAILDEV_PASS'),
          },
        },
        defaults: {
          from: `"No Reply" <${config.get('MAILER_FROM')}>`,
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule {}
