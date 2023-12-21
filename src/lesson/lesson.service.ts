import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lesson } from 'src/lesson/schemas/lesson.schema';
import { Section } from 'src/section/schemas/section.schema';
import { CreateLessonDto } from './dto/create-lesson.dto';

@Injectable()
export class LessonService {
  constructor(
    @InjectModel(Section.name) private sectionModel: Model<Section>,
    @InjectModel(Lesson.name) private lessonModel: Model<Lesson>,
  ) {}

  /**create lesson */
  async createLesson(body: CreateLessonDto, sectionId: string) {
    const lesson = await this.lessonModel.create(body);
    const section = await this.sectionModel
      .findByIdAndUpdate(
        sectionId,
        {
          $push: { lessons: lesson._id },
        },
        { new: true },
      )
      .populate('lessons');

    return section;
  }

  /**edit lesson */
  async editLesson(body: CreateLessonDto, lessonId: string) {
    const lesson = await this.lessonModel.findByIdAndUpdate(lessonId, body, { new: true });
    return lesson;
  }
  /**deleteLesson */
  async deleteLesson(sectionId: string, lessonId: string) {
    await this.sectionModel.findByIdAndDelete(sectionId);
    const section = this.sectionModel
      .findByIdAndUpdate(
        sectionId,
        {
          $pull: {
            lessons: lessonId,
          },
        },
        { new: true },
      )
      .populate('lessons');

    return section;
  }
  /**get lesson */
  async getLesson(sectionId: string) {
    const section = await this.sectionModel.findById(sectionId).populate('lessons');

    return section.lessons;
  }

  /**complate lessons */
  async completeLesson(userId: string, lessonId: string) {
    const lesson = await this.lessonModel.findByIdAndUpdate(
      lessonId,
      {
        $push: { completed: userId },
      },
      { new: true },
    );

    return lesson;
  }

  /**uncomplete lesson */
  async uncompleteLesson(userId: string, lessonId: string) {
    const lesson = await this.lessonModel.findByIdAndUpdate(
      lessonId,
      {
        $push: { completed: userId },
      },
      { new: true },
    );
    return lesson;
  }
}
