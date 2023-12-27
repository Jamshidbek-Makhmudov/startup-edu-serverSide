import { Module } from '@nestjs/common';
import { InstructorService } from 'src/instructor/instructor.service';
import { InstructorController } from 'src/instructor/instructor.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { Instructor, InstructorSchema } from './schemas/instructor.schema';
import { Course, CourseSchema } from 'src/course/schemas/course.schema';

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
