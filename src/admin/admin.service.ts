import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import * as SendGrid from '@sendgrid/mail';
import { Model } from 'mongoose';
import { InjectStripe } from 'nestjs-stripe';
import { Course, CourseDocument } from 'src/course/schemas/course.schema';
import { Instructor, InstructorDocument } from 'src/instructor/schemas/instructor.schema';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import Stripe from 'stripe';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Instructor.name) private instructorModel: Model<InstructorDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
    @InjectStripe() private readonly stripeClient: Stripe,
    private readonly configService: ConfigService,
  ) {
    SendGrid.setApiKey(this.configService.get<string>('SEND_GRID_KEY'));
  }

  /**get all instructors */
  async getAllInstructors() {
    const instructors = await this.instructorModel.find().populate('author').exec();

    return instructors.map(instructor => this.getSpecifiField(instructor));
  }

  /**aprove instructor */
  async approveInstructor(instructorId: string) {
    const instructor = await this.instructorModel.findByIdAndUpdate(
      instructorId,
      {
        $set: { approved: true },
      },
      { new: true },
    );

    const user = await this.userModel.findById(instructor.author);

    const account = await this.stripeClient.accounts.create({
      type: 'express',
      country: 'US',
      email: user.email,
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
    });

    const accountLinks = await this.stripeClient.accountLinks.create({
      account: account.id,
      refresh_url: this.configService.get<string>('CLIENT_DEV'),
      return_url: this.configService.get<string>('CLIENT_DEV'),
      type: 'account_onboarding',
    });

    await this.userModel.findByIdAndUpdate(
      instructor.author,
      { $set: { role: 'INSTRUCTOR', instructorAccountId: account.id } },
      { new: true },
    );

    const emailData = {
      to: user.email,
      subject: 'successfully approved',
      from: 'james@dataprotec.co.kr',
      html: `<h1>Hi dear ${user.fullName}, you are approved in our platform as an Instructor, follow the bellow steps.</h1>
				<a href="${accountLinks.url}"> click the link for Full finish your instructor account</a>`,
    };

    await SendGrid.send(emailData);
    return 'Success';
  }

  /**delete instructor */
  async deleteInstructor(instructorId: string) {
    const instructor = await this.instructorModel.findByIdAndUpdate(
      instructorId,
      {
        $set: { approved: false },
      },
      { new: true },
    );

    await this.userModel.findByIdAndUpdate(
      instructor.author,
      { $set: { role: 'USER' } },
      { new: true },
    );

    return 'Success';
  }

  /**get all users */
  async getAllUsers(limit: number) {
    const users = await this.userModel.find().limit(limit).sort({ createdAt: -1 }).exec();

    return users.map(user => this.getUserSpecifiField(user));
  }

  /**search user */
  async searchUser(email: string, limit: number) {
    let users: UserDocument[];
    if (email) {
      users = await this.userModel.find({}).exec();
    } else {
      users = await this.userModel.find({}).limit(limit).exec();
    }
    const searchedUser = users.filter(
      user => user.email.toLowerCase().indexOf(email.toLowerCase()) !== -1,
    );

    return searchedUser.map(user => this.getUserSpecifiField(user));
  }
  /**delete course */
  async deleteCourse(courseId: string) {
    const courseAuthor = await this.courseModel.findById(courseId);
    await this.instructorModel.findByIdAndUpdate(
      { author: courseAuthor.author },
      { $pull: { courses: courseId } },
      { new: true },
    );

    await this.courseModel.findByIdAndRemove(courseId, { new: true }).exec();
    const courses = await this.courseModel.find().exec();

    return courses.map(course => this.getSpecificFieldCourse(course));
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
        job: instructor.author.job,
      },
    };
  }
  getUserSpecifiField(user: UserDocument) {
    return {
      email: user.email,
      fullName: user.fullName,
      _id: user._id,
      role: user.role,
      createdAt: user.createdAt,
    };
  }
  getSpecificFieldCourse(course: CourseDocument) {
    return {
      title: course.title,
      previewImage: course.previewImage,
      price: course.price,
      isActive: course.isActive,
      language: course.language,
      _id: course.id,
    };
  }
}
