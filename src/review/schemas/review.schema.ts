import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, Schema as SchemaMS } from 'mongoose';
import { Course } from 'src/course/schemas/course.schema';
import { User } from 'src/user/schemas/user.schema';

export type ReviewDocument = HydratedDocument<Review>;
@Schema({ timestamps: true })
export class Review {
  @ApiProperty({ example: '4.5', description: 'rating' })
  @Prop()
  rating: number;

  @ApiProperty({ example: 'summary', description: 'summary' })
  @Prop()
  summary: string;

  @ApiProperty({ example: 'James', description: 'author' })
  @Prop({ type: SchemaMS.Types.ObjectId, ref: 'User' })
  author: User;

  @ApiProperty({ example: 'course', description: 'course' })
  @Prop({ type: SchemaMS.Types.ObjectId, ref: 'Course' })
  course: Course;
}
export const ReviewSchema = SchemaFactory.createForClass(Review);
