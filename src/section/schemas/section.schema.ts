import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, Schema as SchemaMS } from 'mongoose';
import { Lesson } from 'src/lesson/schemas/lesson.schema';

export type SectionDocument = HydratedDocument<Section>;

@Schema({ timestamps: true })
export class Section {
  @ApiProperty({ example: 'title', description: 'title for section' })
  @Prop()
  title: string;

  @ApiProperty({ example: 'lesson', description: 'lessons fo section' })
  @Prop([{ type: SchemaMS.Types.ObjectId, ref: 'Lesson' }])
  lessons: Lesson[];
}
export const SectionSchema = SchemaFactory.createForClass(Section);
