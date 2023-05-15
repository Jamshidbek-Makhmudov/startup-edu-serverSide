import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { RoleUser } from 'src/auth/dto/user.dto';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ unique: true, required: true })
  email: string;

  @Prop()
  fullName: string;

  @Prop()
  password: string;

  @Prop()
  role: RoleUser;
}

export const UserSchema = SchemaFactory.createForClass(User);
