import { Module } from '@nestjs/common';
import { CustomerService } from 'src/customer/customer.service';
import { CustomerController } from 'src/customer/customer.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { StripeModule } from 'nestjs-stripe';
import { User, UserSchema } from 'src/user/schemas/user.schema';

@Module({
    imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    StripeModule.forRoot({ apiKey: process.env.STRIPE_SECRET_KEY, apiVersion: '2022-11-15' }),
  ],
  controllers: [CustomerController],
  providers: [CustomerService]
})
export class CustomerModule {}
