import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { compare, genSalt, hash } from 'bcryptjs';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/user.model';

import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  //register
  async register(dto: AuthDto) {
    //for email error
    const existUser = await this.isExistUser(dto.email);
    const validateEmail = await this.isValidateEmail(dto.email);
    if (existUser) throw new BadRequestException('User with this email is already exist!');
    if (validateEmail) throw new BadRequestException('Please enter a valid email address!');
    //for passoword hash
    const salt = await genSalt(10);
    const passwordHash = await hash(dto.password, salt);
    //connect mongo auth with input
    const newUser = new this.userModel({ ...dto, password: passwordHash });
    return newUser.save();
  }
  //login
  async login(dto: AuthDto) {
    const existUser = await this.isExistUser(dto.email);
    if (!existUser) throw new BadRequestException('User with this email is not found!');
    const currentPassword = await compare(dto.password, existUser.password);
    if (!currentPassword) throw new BadRequestException('incorrect password!');
    return existUser;
  }
  //function for return exist email error
  async isExistUser(email: string): Promise<UserDocument> {
    const existUser = await this.userModel.findOne({ email });
    return existUser;
  }
  //function for valid email adress
  async isValidateEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address.';
    }
    return '';
  }
}
