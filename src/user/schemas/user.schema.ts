import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument,Schema as SchemaMS } from 'mongoose';
import { RoleUser } from '../dto/user.dto';
import { Course } from '../../course/schemas/course.schema';



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
  @Prop({ default: "USER" })
  role: RoleUser;
  @ApiProperty({ example: 'image', description: "user's image avatar" })
   @Prop()
  avatar: string;

  @ApiProperty({ example: 'student', description: "user's job" })
  @Prop()
  job: string;
  @ApiProperty({ example: 'customer id', description: "user's customer id " })  
  @Prop()
  customerId: string;

  @ApiProperty({ example: 'instructorAccountId', description: "user's instructorAccountId " })
  @Prop()
  instructorAccountId: string;
  
  @ApiProperty({ example: 'createdAt', description: "user's createdAt " })
  @Prop()
  createdAt: string;
  
  @ApiProperty({ example: 'bio', description: "user's bio " })
  @Prop()
  bio: string;
  
  @ApiProperty({ example: 'birthday', description: "user's birthday " })
  @Prop()
  birthday: string;
  
  @ApiProperty({ example: 'courses', description: "user's courses " })
  @Prop([{ type: SchemaMS.Types.ObjectId, ref: 'Course' }])
  courses: Course[];
}

export const UserSchema = SchemaFactory.createForClass(User);
