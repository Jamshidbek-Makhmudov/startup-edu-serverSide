import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, Schema as SchemaMS } from 'mongoose';
import { Course } from 'src/course/schemas/course.schema';
import { Review } from 'src/review/schemas/review.schema';
import { RoleUser, UserRole } from 'src/user/dto/user.dto';

export type UserDocument = HydratedDocument<User>;

@ObjectType()
@Schema({ timestamps: true })
export class User {
  @ApiProperty({ example: 'user@examle.com', description: "user's email", type: String })
  @Field()
  @Prop({ unique: true, required: true })
  email: string;

  @ApiProperty({ example: 'James Adams', description: "user's full name", type: String })
  @Field({ nullable: true })
  @Prop()
  fullName: string;

  @ApiProperty({ example: 'strong_passowrd', description: "user's password", type: String })
  @HideField()
  @Prop()
  password: string;

  @ApiProperty({ example: 'Admin', description: "user's role", enum: UserRole })
  @Field()
  @Prop({ default: 'USER' })
  role: RoleUser;
  @ApiProperty({ example: 'image', description: "user's image avatar", type: String })
  @Field({ nullable: true })
  @Prop()
  avatar: string;

  @ApiProperty({ example: 'student', description: "user's job", type: String })
  @Field({ nullable: true })
  @Prop()
  job: string;
  @ApiProperty({ example: 'customer id', description: "user's customer id ", type: String })
  @Field({ nullable: true })
  @Prop()
  customerId: string;

  @ApiProperty({
    example: 'instructorAccountId',
    description: "user's instructorAccountId ",
    type: String,
  })
  @Field({ nullable: true })
  @Prop()
  instructorAccountId: string;

  @ApiProperty({ example: 'createdAt', description: "user's createdAt ", type: String })
  @Field()
  @Prop()
  createdAt: string;

  @ApiProperty({ example: 'bio', description: "user's bio ", type: String })
  @Field({ nullable: true })
  @Prop()
  bio: string;

  @ApiProperty({ example: 'birthday', description: "user's birthday ", type: String })
  @Field({ nullable: true })
  @Prop()
  birthday: string;

  @ApiProperty({ example: 'courses', description: "user's courses " })
  //   @Field(()=>[Course])
  @Prop([{ type: SchemaMS.Types.ObjectId, ref: 'Course' }])
  courses: Course[];

  // reviewId added new
  @ApiProperty({ example: 'courses', description: "user's courses " })
  //   @Field((type) => [Review], { nullable: true })
  @Prop([{ type: SchemaMS.Types.ObjectId, ref: 'Review' }])
  reviews: Review[];

    @ApiProperty({ example: 'image', description: "user's image from aws bucket", type: String })
  @Field({ nullable: true })
  @Prop()
  imageUrl: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
