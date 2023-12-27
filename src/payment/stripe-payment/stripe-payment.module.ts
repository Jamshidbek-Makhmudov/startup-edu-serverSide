import { Module } from '@nestjs/common';
import { StripePaymentService } from 'src/payment/stripe-payment/stripe-payment.service';
import { StripePaymentController } from 'src/payment/stripe-payment/stripe-payment.controller';
import { ConfigModule } from '@nestjs/config';
import { CustomerModule } from 'src/customer/customer.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { Course, CourseSchema } from 'src/course/schemas/course.schema';
import { StripeModule } from 'nestjs-stripe';

@Module({
    imports: [
    ConfigModule.forRoot(),
    CustomerModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Course.name, schema: CourseSchema },
    ]),
    StripeModule.forRoot({ apiKey: process.env.STRIPE_SECRET_KEY, apiVersion: '2022-11-15' }),
  ],
  controllers: [StripePaymentController],
  providers: [StripePaymentService]
})
export class StripePaymentModule {}
