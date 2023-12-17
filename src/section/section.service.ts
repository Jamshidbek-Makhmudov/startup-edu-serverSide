import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from 'src/course/schemas/course.schema';
import { Section } from 'src/section/schemas/section.schema';
import { CreateSectionDto } from './dto/create-section.dto';

@Injectable()
export class SectionService {
  constructor(
    @InjectModel(Section.name) private sectionModel: Model<Section>,
    @InjectModel(Course.name) private courseModel: Model<Course>,
  ) {}
  /**create */
  async createSection({ title }: CreateSectionDto, courseId: string) {
    const section = await this.sectionModel.create({ title });
    const course = await this.courseModel
      .findByIdAndUpdate(
        courseId,
        {
          $push: { sections: section._id },
        },

        { new: true },
      )
      .populate({ path: 'sections', populate: { path: 'lessons' } });

    return course.sections;
  }
  /**delete section */
  async deleteSection(sectionId: string, courseId: string) {
    await this.sectionModel.findByIdAndRemove(sectionId);
    const course = await this.courseModel
      .findByIdAndUpdate(
        courseId,
        {
          $pull: { sections: sectionId },
        },
        { new: true },
      )
      .populate({ path: 'sections', populate: { path: 'lessons' } });

    return course.sections;
  }
  /**edit section */
  async editSection(sectionId: string, { title, lessons }: CreateSectionDto) {
    return await this.sectionModel
      .findByIdAndUpdate(
        sectionId,
        {
          $set: { title, lessons },
        },
        { new: true },
      )
      .populate('lessons');
  }
  /**get sections */
  async getSection(courseId: string) {
    const course = await this.courseModel.findById(courseId).populate({
      path: 'sections',
      populate: { path: 'lessons' },
    });
    return course.sections;
  }
}
