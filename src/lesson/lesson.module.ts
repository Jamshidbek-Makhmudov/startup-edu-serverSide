import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LessonController } from 'src/lesson/lesson.controller';
import { LessonService } from 'src/lesson/lesson.service';
import { Lesson, LessonSchema } from 'src/lesson/schemas/lesson.schema';
import { Section, SectionSchema } from 'src/section/schemas/section.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Section.name, schema: SectionSchema },
      { name: Lesson.name, schema: LessonSchema },
    ]),
  ],
  controllers: [LessonController],
  providers: [LessonService],
})
export class LessonModule {}
