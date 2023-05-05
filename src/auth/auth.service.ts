import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { compare, genSalt, hash } from 'bcryptjs';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/user.model';
import { LoginAuthDto } from './dto/login.dto';
import { RegisterAuthDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}
  //register
  async register(dto: RegisterAuthDto) {
    //for email error
    const existUser = await this.isExistUser(dto.email);

    if (existUser) throw new BadRequestException('User with this email is already exist!');

    //for passoword hash
    const salt = await genSalt(10);
    const passwordHash = await hash(dto.password, salt);
    //connect mongo auth with input
    const newUser = await this.userModel.create({ ...dto, password: passwordHash });
    //yozgan pairToken functionimiz parametriga newUserni id sini berib qoyamiz
    const token = await this.issueTokenPair(String(newUser._id));
    return { user: this.getUserField(newUser), ...token };
  }
  //login
  async login(dto: LoginAuthDto) {
    const existUser = await this.isExistUser(dto.email);
    if (!existUser) throw new BadRequestException('User with this email is not found!');
    const currentPassword = await compare(dto.password, existUser.password);
    if (!currentPassword) throw new BadRequestException('incorrect password!');
    const token = await this.issueTokenPair(String(existUser._id));
    return { user: this.getUserField(existUser), ...token };
  }
  //function for return exist email error
  async isExistUser(email: string): Promise<UserDocument> {
    const existUser = await this.userModel.findOne({ email });
    return existUser;
  }
  //function for two token refresh abd access
  async issueTokenPair(userId: string) {
    const data = { _id: userId };
    const refreshToken = await this.jwtService.signAsync(data, { expiresIn: '15d' });
    const accessToken = await this.jwtService.signAsync(data, { expiresIn: '1h' });
    return { refreshToken, accessToken };
  }
  //after login we need only user's id, email and fullname so this function for this
  getUserField(user: UserDocument) {
    return {
      id: user._id,
      email: user.email,
      fullName: user.fullName,
    };
  }
}
