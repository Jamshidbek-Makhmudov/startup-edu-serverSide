import { Injectable } from '@nestjs/common';
import { CreateStripePaymentDto } from './dto/create-stripe-payment.dto';
import { UpdateStripePaymentDto } from './dto/update-stripe-payment.dto';

@Injectable()
export class StripePaymentService {
  create(createStripePaymentDto: CreateStripePaymentDto) {
    return 'This action adds a new stripePayment';
  }

  findAll() {
    return `This action returns all stripePayment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stripePayment`;
  }

  update(id: number, updateStripePaymentDto: UpdateStripePaymentDto) {
    return `This action updates a #${id} stripePayment`;
  }

  remove(id: number) {
    return `This action removes a #${id} stripePayment`;
  }
}
