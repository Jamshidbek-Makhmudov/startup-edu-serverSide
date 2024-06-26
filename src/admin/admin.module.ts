import { Module } from '@nestjs/common';
import { AdminService } from 'src/admin/admin.service';
import { AdminController } from 'src/admin/admin.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Instructor, InstructorSchema } from 'src/instructor/schemas/instructor.schema';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { Course, CourseSchema } from 'src/course/schemas/course.schema';
import { StripeModule } from 'nestjs-stripe';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      { name: Instructor.name, schema: InstructorSchema },
      { name: User.name, schema: UserSchema },
      { name: Course.name, schema: CourseSchema },
    ]),
    StripeModule.forRoot({ apiKey: process.env.STRIPE_SECRET_KEY, apiVersion: '2022-11-15' }),
  ],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
