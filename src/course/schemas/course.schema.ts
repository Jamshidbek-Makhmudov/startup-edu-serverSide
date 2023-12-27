import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, Schema as SchemaMS } from 'mongoose';
import { Section } from 'src/section/schemas/section.schema';
import { User } from 'src/user/schemas/user.schema';

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

  @ApiProperty({ example: 'image', description: 'Preview images' })
  @Prop()
  previewImage: string;

  @ApiProperty({ example: '2023-12-12', description: 'Updated date' })
  @Prop()
  updatedAt: string;

  @ApiProperty({ example: 'english', description: 'language course' })
  @Prop()
  language: string;

  @Prop({ unique: true, required: true })
  @ApiProperty({ example: 'slug', description: 'Slug course' })
  slug: string;

  @ApiProperty({ example: 'false', description: 'is active course?' })
  @Prop({ type: Boolean, default: false })
  isActive: boolean;

  @ApiProperty({ example: 'section', description: 'Section course' })
  @Prop([{ type: SchemaMS.Types.ObjectId, ref: 'Section' }])
  sections: Section[];
}
export const CourseSchema = SchemaFactory.createForClass(Course);
