import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
// import { genSalt, hash, } from 'bcryptjs';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { InjectStripe } from 'nestjs-stripe';
import { Course } from 'src/course/schemas/course.schema';
import { EmailAndPasswordDto, UpdateUserDto } from 'src/user/dto/user.dto';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import Stripe from 'stripe';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectStripe() private readonly stripeClient: Stripe,
  ) {}

  /**find user by id */
  async byId(id: string): Promise<User> {
    const user = await this.userModel.findById(id);

    if (!user) throw new NotFoundException('User_not_found');

    return user;
  }

  /**user edit password */
  async editPassword(dto: EmailAndPasswordDto): Promise<string> {
    const { email, password } = dto;

    const existUser = await this.userModel.findOne({ email });
    if (!existUser) throw new UnauthorizedException('user_not_found');

    // const salt = await genSalt(10);
    // const hashPassword = await hash(password, salt);
    const hashPassword = await bcrypt.hash(password, 7);

    await this.userModel.findByIdAndUpdate(
      existUser._id,
      { $set: { password: hashPassword } },
      { new: true },
    );

    return 'Success';
  }

  /**user update password */
  async updateUser(body: UpdateUserDto, userId: string): Promise<User> {
    const { avatar, firstName, lastName, bio, birthday, job } = body;

    const user = await this.userModel.findByIdAndUpdate(
      userId,
      {
        $set: { fullName: `${firstName} ${lastName}`, avatar, bio, birthday, job },
      },
      { new: true },
    );

    return user;
  }
  /** all Transactions */
  async allTransactions(customerId: string): Promise<Stripe.Charge[]> {
    const transactions = await this.stripeClient.charges.list({
      customer: customerId,
      limit: 100,
    });

    return transactions.data;
  }

  /**my courses */
  async myCourses(userId: string): Promise<Course[]> {
    const user = await this.userModel.findById(userId).populate('courses').exec();

    return user.courses;
  }
}
