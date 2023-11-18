import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, Schema as SchemaMS } from 'mongoose';
import { User } from '../../user/schemas/user.schema';

export type CourseDocument = HydratedDocument<Course>;
@Schema({ timestamps: true })
export class Course {
  @ApiProperty({ example: 'Jamshid Makhmudov', description: 'authors firstName and lastName' })
  @Prop({ type: SchemaMS.Types.ObjectId, ref: 'User' })
  author: User;
  @ApiProperty({ example: 'Backend', description: 'Course title' })
  @Prop()
  title: string;
  @ApiProperty({ example: 'excerpt', description: 'Course exerpt' })
  @Prop()
  exerpt: string;
  @ApiProperty({ example: 'learn', description: 'Course learn' })
  @Prop([String])
  learn: string[];
  @ApiProperty({ example: 'nodejs,expressjs', description: 'Course requirements' })
  @Prop([String])
  requirements: string[];
  @ApiProperty({ example: '#web development', description: 'Course tags' })
  @Prop([String])
  tags: string[];
  @ApiProperty({ example: 'backend for beginenrs', description: 'Course description' })
  @Prop()
  description: string;
  @ApiProperty({ example: 'beginner', description: 'Course level' })
  @Prop()
  level: string;
  @ApiProperty({ example: 'web development', description: 'Course category' })
  @Prop()
  category: string;
  @ApiProperty({ example: '100$', description: 'Course price' })
  @Prop()
  price: number;
}
export const CourseSchema = SchemaFactory.createForClass(Course);
