import { Module } from '@nestjs/common';
import { ReviewService } from 'src/review/review.service';
import { ReviewController } from 'src/review/review.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewSchema } from 'src/review/schemas/review.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }])],
  controllers: [ReviewController],
  providers: [ReviewService]
})
export class ReviewModule {}
