import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, Schema as SchemaMS } from 'mongoose';
import { Section } from 'src/section/schemas/section.schema';
import { User } from 'src/user/schemas/user.schema';

export type CourseDocument = HydratedDocument<Course>;
// @ObjectType()
@Schema({ timestamps: true })
export class Course {
  @ApiProperty({ example: 'Jamshid Makhmudov', description: 'authors firstName and lastName' })
    // @Field()
  @Prop({ type: SchemaMS.Types.ObjectId, ref: 'User' })
  author: User;

  @ApiProperty({ example: 'Backend', description: 'Course title' })
    // @Field()
  @Prop()
  title: string;

  @ApiProperty({ example: 'excerpt', description: 'Course exerpt' })
    // @Field()
  @Prop()
  exerpt: string;

  @ApiProperty({ example: 'learn', description: 'Course learn' })
    // @Field()
  @Prop([String])
  learn: string[];

  @ApiProperty({ example: 'nodejs,expressjs', description: 'Course requirements' })
    // @Field()
  @Prop([String])
  requirements: string[];

  @ApiProperty({ example: '#web development', description: 'Course tags' })
    // @Field()
  @Prop([String])
  tags: string[];

  @ApiProperty({ example: 'backend for beginenrs', description: 'Course description' })
    // @Field()
  @Prop()
  description: string;

  @ApiProperty({ example: 'beginner', description: 'Course level' })
    // @Field()
  @Prop()
  level: string;

  @ApiProperty({ example: 'web development', description: 'Course category' })
    // @Field()
  @Prop()
  category: string;

  @ApiProperty({ example: '100$', description: 'Course price' })
    // @Field()
  @Prop()
  price: number;

  @ApiProperty({ example: 'image', description: 'Preview images' })
    // @Field()
  @Prop()
  previewImage: string;

  @ApiProperty({ example: '2023-12-12', description: 'Updated date' })
    //  @Field({nullable:true})
  @Prop()
  updatedAt: string;

  @ApiProperty({ example: 'english', description: 'language course' })
    //  @Field()
  @Prop()
  language: string;

  @ApiProperty({ example: 'slug', description: 'Slug course' })
    //  @Field()
  @Prop({ unique: true, required: true })
  slug: string;

  @ApiProperty({ example: 'false', description: 'is active course?' })
    //  @Field()
  @Prop({ type: Boolean, default: false })
  isActive: boolean;

  @ApiProperty({ example: 'section', description: 'Section course' })
    //  @Field()
  @Prop([{ type: SchemaMS.Types.ObjectId, ref: 'Section' }])
  sections: Section[];
}
export const CourseSchema = SchemaFactory.createForClass(Course);
