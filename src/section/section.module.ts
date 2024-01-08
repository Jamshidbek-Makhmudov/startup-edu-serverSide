import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from 'src/course/schemas/course.schema';
import { Section, SectionSchema } from 'src/section/schemas/section.schema';
import { SectionController } from 'src/section/section.controller';
import { SectionService } from 'src/section/section.service';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: Section.name, schema: SectionSchema },
      { name: Course.name, schema: CourseSchema },
    ]),
  ],
  controllers: [SectionController],
  providers: [SectionService],
})
export class SectionModule {}
