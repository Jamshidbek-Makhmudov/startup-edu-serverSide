import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectStripe } from 'nestjs-stripe';
import { Course, CourseDocument } from 'src/course/schemas/course.schema';
import { Model } from 'mongoose';
import { CustomerService } from 'src/customer/customer.service';
import Stripe from 'stripe';
import { BooksStripePaymentDto } from './dto/books-stripe-payment.dto';
import { CourseStripePaymentDto } from './dto/course-stripe-payment.dto';


@Injectable()
export class StripePaymentService {
    constructor(
    @InjectStripe() private readonly stripeClient: Stripe,
    private readonly customerService: CustomerService,
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
    ) { }
  
  /**payment books */
  async paymentBooks(body: BooksStripePaymentDto, userId: string) {
    const customer = await this.customerService.getCustomer(userId)
    const card = await this.customerService.atachPaymentMethod(body.paymentMethod, userId)
    
    const paymentIntent = await this.stripeClient.paymentIntents.create({
      //misol uchun price 20 dollar bolsa stripe buni chunmaydi. oxirida 2ta qoshimcha 0 bilan birga kelsa tushunadi shuning uchun 100ga kopaytirib qoyamiz
      amount: body.price * 100,
      currency: 'usd',
      payment_method: card.id,
      customer:customer.id
    })

    return paymentIntent.client_secret
   }

  /**payment courses */
  async paymentCourses(body: CourseStripePaymentDto, userId: string) {
    const customer = await this.customerService.getCustomer(userId)
    const card = await this.customerService.atachPaymentMethod(body.paymentMethod, userId)
    const course = (await this.courseModel.findById(body.courseId)).populated("author")
    
    const feePrice = (30 / 100) * body.price
    
    const paymentIntent = await this.stripeClient.paymentIntents.create({
      amount: body.price * 100,
      currency: 'usd',
      payment_method: card.id,
      customer: customer.id,
      application_fee_amount: feePrice * 100,
      transfer_data: {
        destination:course.author.instructorAccountId
      }
    })

    return paymentIntent.client_secret
  }
  
  /** list products*/
  async listProducts() {
    const products = await this.stripeClient.products.list({
      limit: 3,
      expand: ['data.default_price'],
    })

    return products.data
  }
  
  /**create subscription */
  async createSubscription(userId: string, body: BooksStripePaymentDto) {
    const customer = await this.customerService.getCustomer(userId)
    const card = await this.customerService.atachPaymentMethod(body.paymentMethod, userId)
    
    const subscription = await this.stripeClient.subscriptions.create({
      customer:customer.id,
      items: [{ price: String(body.price) }],
      payment_behavior: "default_incomplete",
      expand: ["latest_invoice.payment_intent"],
      default_payment_method: card.id,
      trial_period_days:14,
    })

    return subscription;
  }
  
  /**instructor balance */
  async instructorBalance(instructorAccountId: string) {
    const balance = await this.stripeClient.balance.retrieve({
      stripeAccount:instructorAccountId
    })

    return balance
  }
  
  /**instrucor connection login */
  async instructorConnectLogin(instructorAccountId: string) {
    const loginLink = await this.stripeClient.accounts.createLoginLink(instructorAccountId)
    
    return loginLink.url
  }
  
  /**apply coupon */
  async applyCoupon(id: string) {
    const coupon = await this.stripeClient.coupons.retrieve(id)
    
    return coupon
   }


}
