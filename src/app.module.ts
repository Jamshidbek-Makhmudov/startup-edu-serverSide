import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from 'src/admin/admin.module';
import { AuthModule } from 'src/auth/auth.module';
import { BooksModule } from 'src/books/books.module';
import { getMongoDBConfig } from 'src/config/mongo.config';
import { CourseModule } from 'src/course/course.module';
import { CustomerModule } from 'src/customer/customer.module';
import { FileModule } from 'src/file/file.module';
import { InstructorModule } from 'src/instructor/instructor.module';
import { LessonModule } from 'src/lesson/lesson.module';
import { MailModule } from 'src/mail/mail.module';
import { StripePaymentModule } from 'src/payment/stripe-payment/stripe-payment.module';
import { ReviewModule } from 'src/review/review.module';
import { SectionModule } from 'src/section/section.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoDBConfig,
    }),
    AuthModule,
    CourseModule,
    UserModule,
    MailModule,
    InstructorModule,
    FileModule,
    SectionModule,
    ReviewModule,
    LessonModule,
    AdminModule,
    BooksModule,
    StripePaymentModule,
    CustomerModule,
  ],
})
export class AppModule {}
