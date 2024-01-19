import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { StripePaymentService } from 'src/payment/stripe-payment/stripe-payment.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/common/decorators/auth.decorator';
import { BooksStripePaymentDto } from 'src/payment/stripe-payment/dto/books-stripe-payment.dto';
import { User } from 'src/user/decorators/user.decorator';
import { CourseStripePaymentDto } from 'src/payment/stripe-payment/dto/course-stripe-payment.dto';


@ApiTags('Stripe-payment')
@Controller('stripe-payment')
export class StripePaymentController {
  constructor(private readonly stripePaymentService: StripePaymentService) { }

  /**payment for books */
  @ApiOperation({ summary: "payment for books" })
  @ApiResponse({ status: 200, type: Promise<String> })
  @HttpCode(200)
  @Post('books')
  @Auth('USER')
  paymentBooks(@Body() dto: BooksStripePaymentDto, @User("_id") _id: string) {
    return this.stripePaymentService.paymentBooks(dto,_id)
   }

  /**payment for courses */
  @ApiOperation({ summary: "payment for courses" })
  @ApiResponse({ status: 200, type: Promise<String> })
  @HttpCode(200)
  @Post('courses')
  @Auth('USER')
  paymentCourses(@Body() dto: CourseStripePaymentDto, @User("_id") _id: string) {
    return this.stripePaymentService.paymentCourses(dto,_id)
   }

  /**list products */
  @ApiOperation({ summary: "list products" })
  @ApiResponse({ status: 200, type: Promise<String> })
  @HttpCode(200)
  @Get('list-products')
  listProducts() {
    return this.stripePaymentService.listProducts()
   }

  /**create subscription */
  @ApiOperation({ summary: "create subscription" })
  @ApiResponse({ status: 200, type: Promise<String> })
  @HttpCode(201)
  @Post('create-subscription')
  @Auth("USER")
  createSubscription(@User("_id") _id:string, @Body() dto:BooksStripePaymentDto) {
    return this.stripePaymentService.createSubscription(_id,dto)
   }

  /**instructor-balance */
  @ApiOperation({ summary: "instructor-balance" })
  @ApiResponse({ status: 200, type: Promise<String> })
  @HttpCode(200)
  @Get('instructor-balance')
  @Auth("INSTRUCTOR")
  instructorBalance(@User("instructorAccountId") instructorAccountId:string) {
    return this.stripePaymentService.instructorBalance(instructorAccountId)
   }

  /**instructor-connect-login */
  @ApiOperation({ summary: "instructor-connect-login" })
  @ApiResponse({ status: 200, type: Promise<String> })
  @HttpCode(200)
  @Post('instructor-connect-login')
  @Auth("INSTRUCTOR")
  instructorConnectLogin(@User("instructorAccountId") instructorAccountId:string) {
    return this.stripePaymentService.instructorConnectLogin(instructorAccountId)
   }

  /**apply-coupon */
  @ApiOperation({ summary: "apply-coupon" })
  @ApiResponse({ status: 200, type: Promise<String> })
  @HttpCode(200)
  @Get('apply-coupon/:id')
  @Auth()
  applyCoupon(@Param('id') id:string) {
    return this.stripePaymentService.applyCoupon(id)
   }

}
