import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Instructor, InstructorSchema } from '../instructor/schemas/instructor.schema';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { Course, CourseSchema } from 'src/course/schemas/course.schema';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      { name: Instructor.name, schema: InstructorSchema },
      { name: User.name, schema: UserSchema },
      { name: Course.name, schema: CourseSchema },
    ]),
  ],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
