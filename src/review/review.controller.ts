import { Controller, Get, Post, Body, Param, Delete, HttpCode, Put } from '@nestjs/common';
import { ReviewService } from 'src/review/review.service';
import { CreateReviewDto,EditReviewDto, GetByUserDto } from 'src/review/dto/review.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('Review')
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) { }

  /**create */
  @ApiOperation({ summary: "create" })
  @ApiResponse({ status: 201, type: Promise<String> })
  @HttpCode(201)
  @Post('create')
  async createReview(@Body() dto: CreateReviewDto) {
    return this.reviewService.createReview(dto)
   }

  /**delete */
  @ApiOperation({ summary: "delete" })
  @ApiResponse({ status: 200, type: Promise<String> })
  @HttpCode(200)
  @Delete('delete/:reviewId')
  async deleteReview(@Param('reviewId') reviewId:string) {
    return this.reviewService.deleteReview(reviewId)
   }

  /**edit */
  @ApiOperation({ summary: "edit" })
  @ApiResponse({ status: 200, type: Promise<String> })
  @HttpCode(200)
  @Put('edit/:reviewId')
  async editReview(@Param('reviewId') reviewId:string, @Body() dto:EditReviewDto) {
    return this.reviewService.editReview(reviewId,dto)
   }

  /**get */
  @ApiOperation({ summary: "get" })
  @ApiResponse({ status: 200, type: Promise<String> })
  @HttpCode(200)
  @Get('get/:courseId')
  async getReview(@Param('courseId') courseId:string) {
    return this.reviewService.getReview(courseId)
   }

  /**get-by-user */
  @ApiOperation({ summary: "get-by-user" })
  @ApiResponse({ status: 200, type: Promise<String> })
  @HttpCode(200)
  @Post('get-by-user')
  async getByUser(@Body() dto:GetByUserDto) {
    return this.reviewService.getByUser(dto)
   }


}
