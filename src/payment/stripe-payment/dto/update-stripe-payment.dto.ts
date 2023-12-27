import { PartialType } from '@nestjs/swagger';
import { CreateStripePaymentDto } from './create-stripe-payment.dto';

export class UpdateStripePaymentDto extends PartialType(CreateStripePaymentDto) {}
