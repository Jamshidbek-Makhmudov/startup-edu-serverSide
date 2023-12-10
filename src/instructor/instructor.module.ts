import { Module } from '@nestjs/common';
import { InstructorService } from './instructor.service';
import { InstructorController } from './instructor.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/schemas/user.schema';
import { Instructor, InstructorSchema } from './schemas/instructor.schema';
import { Course, CourseSchema } from '../course/schemas/course.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name:User.name,schema:UserSchema},
      { name: Instructor.name, schema: InstructorSchema },
      { name: Course.name, schema: CourseSchema },
    ]),
  ],
  controllers: [InstructorController],
  providers: [InstructorService]
})
export class InstructorModule {}
