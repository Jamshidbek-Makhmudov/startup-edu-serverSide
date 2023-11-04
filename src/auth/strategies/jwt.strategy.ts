import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User, UserDocument } from 'src/user/schemas/user.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get<string>('SECRET_JWT'),
    });
  }

  async validate({ _id }: Pick<UserDocument, '_id'>) {
    const user = await this.userModel.findById(_id);
    return user;
  }
}
//bu yerda pick UserDocumentdan faqat _id ni olib beradi;
//pickni orniga Exclude yozilsa faqat _id ni tashlab qolganini olib beradi
