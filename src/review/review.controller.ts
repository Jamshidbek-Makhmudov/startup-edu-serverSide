import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateReviewDto, EditReviewDto, GetByUserDto } from 'src/review/dto/review.dto';
import { ReviewService } from 'src/review/review.service';

@ApiTags('Review')
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  /**create */
  @ApiOperation({ summary: 'create' })
  @ApiResponse({ status: 201, type: Promise<String> })
  @ApiBody({ type: CreateReviewDto })
  @HttpCode(201)
  @Post('create')
  async createReview(@Body() dto: CreateReviewDto) {
    return this.reviewService.createReview(dto);
  }

  /**delete */
  @ApiOperation({ summary: 'delete' })
  @ApiResponse({ status: 200, type: Promise<String> })
  @HttpCode(200)
  @Delete('delete/:reviewId')
  async deleteReview(@Param('reviewId') reviewId: string) {
    return this.reviewService.deleteReview(reviewId);
  }

  /**edit */
  @ApiOperation({ summary: 'edit' })
  @ApiResponse({ status: 200, type: Promise<String> })
  @HttpCode(200)
  @Put('edit/:reviewId')
  async editReview(@Param('reviewId') reviewId: string, @Body() dto: EditReviewDto) {
    return this.reviewService.editReview(reviewId, dto);
  }

  /**get */
  @ApiOperation({ summary: 'get' })
  @ApiResponse({ status: 200, type: Promise<String> })
  @HttpCode(200)
  @Get('get/:courseId')
  async getReview(@Param('courseId') courseId: string) {
    return this.reviewService.getReview(courseId);
  }

  /**get-by-user */
  @ApiOperation({ summary: 'get-by-user' })
  @ApiResponse({ status: 200, type: Promise<GetByUserDto> })
  @ApiBody({ type: GetByUserDto })
  @HttpCode(200)
  @Post('get-by-user')
  async getByUser(@Body() dto: GetByUserDto) {
    return this.reviewService.getByUser(dto);
  }
}
