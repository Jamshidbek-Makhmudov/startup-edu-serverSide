import { BooksStripePaymentDto } from "src/payment/stripe-payment/dto/books-stripe-payment.dto";

export class CourseStripePaymentDto extends BooksStripePaymentDto {
	courseId:string
}
