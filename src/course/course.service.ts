import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CourseBodyDto } from 'src/course/dto/course.dto';
import { Course, CourseDocument } from 'src/course/schemas/course.schema';
import { Instructor, InstructorDocument } from 'src/instructor/schemas/instructor.schema';
import { Review, ReviewDocument } from 'src/review/schemas/review.schema';
import { User, UserDocument } from 'src/user/schemas/user.schema';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
    @InjectModel(Instructor.name) private instructorModel: Model<InstructorDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
  ) {}

  async createCourse(dto: CourseBodyDto, id: string) {
    //changes params from "Hello World!" to this => hello-world for more beauty of query params appear
    const slugify = (str: string) =>
      str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');

    const slug = slugify(dto.title);
    try {
      
      const course = await this.courseModel.create({ ...dto, slug: slug, author: id });
      
      await this.instructorModel.findOneAndUpdate(
        { author: id },
        { $push: { courses: course._id } },
        { new: true },
        );
        return 'Success';
    } catch (error) {
       throw new UnprocessableEntityException(error);
        
      }
  }

  async editCourse(dto: CourseBodyDto, courseId: string) {
    return await this.courseModel.findByIdAndUpdate(courseId, dto, { new: true });
  }

  async deleteCourse(courseId: string, userId: string) {
    await this.courseModel.findByIdAndRemove(courseId);

    await this.instructorModel.findOneAndUpdate(
      { author: userId },
      { $pull: { courses: courseId } },
      { new: true },
    );

    return 'Success';
  }

  async activateCourse(courseId: string) {
    const course = await this.courseModel.findByIdAndUpdate(
      courseId,
      { $set: { isActive: true } },
      { new: true },
    );

    return course;
  }

  async draftCourse(courseId: string) {
    const course = await this.courseModel.findByIdAndUpdate(
      courseId,
      { $set: { isActive: false } },
      { new: true },
    );
    return course;
  }

  async dragCourseSections(courseId: string, sections: string[]) {
    const course = await this.courseModel.findByIdAndUpdate(
      courseId,
      { $set: { sections } },
      { new: true },
    ).populate({ path: 'sections', populate: { path: 'lessons' } });
    return course.sections;
  }

  async getCourses(language: string, limit: string) {
    const courses = (await this.courseModel
      .aggregate([
      /**bu yerda aggregatiyani yozishdan maqsad boshqa modeldigi malumotlarni id sigina korinib turadi populate qilganda ularni korsatib chiqarib olish uchun shu aggregatiya ishlatinidi */
        {
          //equals to find method
          $match: { language },
        },
        {
          //equals to populate method
          $lookup: {
            from: 'users',//model name
            localField: 'author', //qayerdan oladi
            foreignField: '_id', //nima boyicha oladi
            as: 'author', //qaysi nom bilan oladi
          },
        },
        {
          $lookup: {
            from: 'sections',
            localField: 'sections',
            foreignField: '_id',
            as: 'sections',
          },
        },
        {
          $lookup: {
            from: 'lessons',
            localField: 'sections.lessons',
            foreignField: '_id',
            as: 'lessons',
          },
        },
        {
        
          $lookup: {
            from: 'reviews',
            localField: '_id',
            foreignField: 'course',
            as: 'reviews',
          },
        },
        {
          /**yuqorida yozilgan review chiqmidi shuning uchun qoshimcha  field add qilib uni chiqarib olsak boladi*/
          $addFields: {
            reviewCount: { $size: '$reviews' },
            reviewAvg: { $avg: '$reviews.rating' },
          },
        },
        {
          //arrayda keladigan datalarni objectga ozgartirib bweradi 
          $unwind: '$author', //->  as: 'author', 
        },
        {
          //return qilib clientga jonatishda yuboriladigan malumotlarni royhati bu bilan custom function yozishni olsa boladi
          $project: {
            _id: 1, // 1 equlas to true yani idni yubor degani
            author: 1,
            sections: {
              $map: {
                input: '$sections',
                as: 'section',
                in: {
                  _id: '$$section._id',
                  title: '$$section.title',
                  lessons: {
                    /**lesson arrayda keadi uni ichidigalrni chiqarib omoqchi bose mongodb $mapidan foydalansak boladi itteratsiya qilayotganda
                     * bunda input : qqaysini qilsin $lookupni ichidiga aslardan qidirish kere. as esa arr.amp(item) ga oxshab nomlab olish uchun kerak
                     */
                    $map: {
                      input: '$lessons',
                      as: 'lesson',
                      /**in array itteratisya qilganda arrayni ichidiglardan degani $$lesson esa tashqaridigi $lessonga chiqib ketmasligi uchun kerak*/
                      in: {
                        _id: '$$lesson._id',
                        name: '$$lesson.name',
                        minute: '$$lesson.minute',
                        second: '$$lesson.second',
                        hour: '$$lesson.hour',
                      },
                    },
                  },
                },
              },
            },
            slug: 1,
            isActive: 1,
            learn: 1,
            requirements: 1,
            tags: 1,
            description: 1,
            level: 1,
            category: 1,
            price: 1,
            previewImage: 1,
            title: 1,
            exerpt: 1,
            language: 1,
            updatedAt: 1,
            reviewCount: 1,
            reviewAvg: 1,
          },
        },
      ])
      .limit(Number(limit))
      .sort({ createdAt: -1 })
      .exec()) as (CourseDocument & { reviewCount: number; reviewAvg: number })[];

    return courses.map(course => this.getSpecificFieldCourse(course));
  }

  getSpecificFieldCourse(course: CourseDocument & { reviewCount: number; reviewAvg: number }) {
    return {
      title: course.title,
      previewImage: course.previewImage,
      price: course.price,
      level: course.level,
      category: course.category,
      _id: course._id,
      author: {
        fullName: course.author.fullName,
        avatar: course.author.avatar,
        job: course.author.job,
      },
      /** lesson.map=> [4,5,5...]  .reduce=> overAll */
      lessonCount: course.sections.map(c => c.lessons.length).reduce((a, b) => +a + +b, 0),
      totalHour: this.getTotalHours(course),
      updatedAt: course.updatedAt,
      learn: course.learn,
      requirements: course.requirements,
      description: course.description,
      language: course.language,
      exerpt: course.exerpt,
      slug: course.slug,
      reviewCount: course.reviewCount,
      reviewAvg: course.reviewAvg,
    };
  }
  getTotalHours(course: CourseDocument) {
    let totalHour = 0;

    for (let s = 0; s < course.sections.length; s++) {
      const section = course.sections[s];
      let sectionHour = 0;

      for (let l = 0; l < section.lessons.length; l++) {
        const lesson = section.lessons[l];
        const hours = parseInt(String(lesson.hour));
        const seconds = parseInt(String(lesson.second));
        const minutes = parseInt(String(lesson.minute));
        const totalMinutes = hours * 60 + minutes;
        const totalSeconds = totalMinutes * 60 + seconds;
        const totalHourLesson = totalSeconds / 3600;
        sectionHour += totalHourLesson;
      }

      totalHour += sectionHour;
    }

    return totalHour.toFixed(1);
  }

  /**get detailed courses */

  async getDetailedCourse(slug: string) {
    const course = (await this.courseModel
      .findOne({ slug })
      .populate({ path: 'sections', populate: { path: 'lessons' } })
      .populate('author')
      .exec()) as CourseDocument & { reviewCount: number; reviewAvg: number };

    const reviews = await this.reviewModel.find({ course: course._id });
    const avarage = this.getReviewAvarage(reviews.map(c => c.rating));
    const allStudents = await this.userModel.find({ courses: course._id });

    return {
      ...this.getSpecificFieldCourse(course),
      reviewCount: reviews.length,
      reviewAvg: avarage,
      allStudents: allStudents.length,
    };
  }
  getReviewAvarage(ratingArr: number[]) {
    let rating: number | undefined;
    if (ratingArr.length == 1) {
      rating = ratingArr[0];
    }
    if (ratingArr.length == 0) {
      rating = 5;
    }
    if (ratingArr.length > 1) {
      rating = (ratingArr.reduce((prev, next) => prev + next) * 5) / (ratingArr.length * 5);
    }
    return rating;
  }

  async getAdminCourses() {
    return this.courseModel.find().exec();
  }

  async enrollUser(userID: string, courseId: string) {
    await this.userModel.findByIdAndUpdate(userID, { $push: { courses: courseId } }, { new: true });

    return 'Success';
  }
}
