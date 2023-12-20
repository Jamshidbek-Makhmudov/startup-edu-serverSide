import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Instructor, InstructorDocument } from 'src/instructor/schemas/instructor.schema';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { Course, CourseDocument } from 'src/course/schemas/course.schema';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AdminService {
    constructor(
    @InjectModel(Instructor.name) private instructorModel: Model<InstructorDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
    private readonly configService: ConfigService,
  ) {}


  /**get all instructors */
  async getAllInstructors() {
    const instructors = await this.instructorModel.find().populate('author').exec()

    return instructors.map(instructor=>this.getSpecifiField(instructor))
  }

  /**get fileds */
  getSpecifiField(instructor: InstructorDocument) {
    return {
      approved: instructor.approved,
      socialMedia: instructor.socialMedia,
      _id: instructor._id,
      author: {
        fullName: instructor.author.fullName,
        email: instructor.author.email,
        job:instructor.author.job
      }
    }
  }
  getUserSpecifiField(user: UserDocument) { 
    return {
      email: user.email,
      fullName: user.fullName,
      _id: user._id,
      role: user.role,
      createdAt: user.createdAt
    }
  }
  getSpecificFieldCourse(course: CourseDocument) {
    return {
      title: course.title,
      previewImage: course.previewImage,
      price: course.price,
      isActive: course.isActive,
      language: course.language,
      _id:course.id,
    }
   }













}
