import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateReviewDto,EditReviewDto, GetByUserDto } from 'src/review/dto/review.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Review, ReviewDocument } from 'src/review/schemas/review.schema';
import { Model } from 'mongoose';


@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name) private reviewModel:Model<ReviewDocument>
  ) { }

  /**create review */
  async createReview(dto: CreateReviewDto) {
    const review = await this.reviewModel.create(dto)
    
    return review._id
  }
  
  /**delete review */
  async deleteReview(reviewId: string) {
    const isReview = await this.reviewModel.findById(reviewId)
    
    if (!isReview) throw new NotFoundException("Reviw with id is not found")
    
    const review = await this.reviewModel.findByIdAndRemove(reviewId)

    return review._id 
  }
  
  /** edit review */
  async editReview(reviewId: string, dto: EditReviewDto) {
    try {
      console.log(reviewId);
      const review = await this.reviewModel.findByIdAndUpdate(
        reviewId,
        { $set: { rating: dto.rating, summary: dto.summary } },
        {new:true}
      )
      return review._id
      
    } catch (error) {
      console.error(`Error deleting review: ${error}`);
    throw new InternalServerErrorException('Error deleting review');
      
    }    
  }
  
  /**get review */
  async getReview(courseId: string) {
    try {
      const reviews = await this.reviewModel.find({ course: courseId }).populate('author').exec()
      
      return reviews
      
    } catch (error) {
      console.error(`Error getting review: ${error}`);
    throw new InternalServerErrorException('Error getting review');
      
    }
  }
  
  /**get by user */
  async getByUser({ course, user }: GetByUserDto) {
    try {
      const reviews = await this.reviewModel.find({ course }).exec()
      const isExist = reviews.find(c => String(c.author) === user)
      
      return isExist
      
    } catch (error) {
     console.error(`Error get by user review: ${error}`);
    throw new InternalServerErrorException('Error get by user review');
      
    }
   }
  

}
