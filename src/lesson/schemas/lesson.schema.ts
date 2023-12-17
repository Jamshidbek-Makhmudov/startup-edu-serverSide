import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type LeesonDocument = HydratedDocument<Lesson>;
@Schema({ timestamps: true })
export class Lesson {
  @ApiProperty({ example: 'name', description: 'name' })
  @Prop()
  name: string;

  @ApiProperty({ example: 'material', description: 'material' })
  @Prop()
  material: string;

  @ApiProperty({ example: 'embedVideo', description: 'embedVideo' })
  @Prop()
  embedVideo: string;

  @ApiProperty({ example: 'hour', description: 'hour' })
  @Prop()
  hour: string;

  @ApiProperty({ example: 'minute', description: 'minute' })
  @Prop()
  minute: string;

  @ApiProperty({ example: 'second', description: 'second' })
  @Prop()
  second: string;

  @ApiProperty({ example: 'completed', description: 'completed' })
  @Prop()
  completed: string;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
