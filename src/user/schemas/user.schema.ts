import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import { RoleUser } from 'src/auth/dto/user.dto';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @ApiProperty({ example: 'user@examle.com', description: "user's email" })
  @Prop({ unique: true, required: true })
  email: string;

  @ApiProperty({ example: 'James Adams', description: "user's full name" })
  @Prop()
  fullName: string;

  @ApiProperty({ example: 'strong_passowrd', description: "user's password" })
  @Prop()
  password: string;

  @ApiProperty({ example: 'Admin', description: "user's role" })
  @Prop()
  role: RoleUser;
}

export const UserSchema = SchemaFactory.createForClass(User);
