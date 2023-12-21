import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
// import { genSalt, hash, } from 'bcryptjs';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';


import { User, UserDocument } from './schemas/user.schema';
import { InterfaceEmailAndPassword, UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  /**find user by id */
  async byId(id: string) {
    const user = await this.userModel.findById(id);

    if (!user) throw new NotFoundException('User_not_found');

    return user;
  }

  /**user edit password */
  async editPassword(dto: InterfaceEmailAndPassword) {
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
  async updateUser(body: UpdateUserDto, userId: string) {
    const { avatar, firstName, lastName, bio, birthday, job } = body
    
    const user = await this.userModel.findByIdAndUpdate(
      userId,
      {
        $set: {fullName:`${firstName} ${lastName}`, avatar, bio, birthday, job}
      },
      {new:true}
    )

    return user;
   }
}
