import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseController } from 'src/course/course.controller';
import { CourseService } from 'src/course/course.service';
import { Course, CourseSchema } from 'src/course/schemas/course.schema';
import { Review, ReviewSchema } from 'src/review/schemas/review.schema';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { Instructor, InstructorSchema } from 'src/instructor/schemas/instructor.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Course.name, schema: CourseSchema },
      { name: Instructor.name, schema: InstructorSchema },
      { name: Review.name, schema: ReviewSchema },
    ]),
  ],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
