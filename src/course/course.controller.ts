import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/common/decorators/auth.decorator';
import { User } from '../user/decorators/user.decorator';
import { CourseService } from './course.service';
import { CourseBodyDto } from './dto/course.dto';

@ApiTags('Course')
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @ApiOperation({ summary: 'create course for Instructors' })
  @ApiResponse({ status: 200, type: Promise<String> })
  @HttpCode(200)
  @Post('create')
  @Auth('INSTRUCTOR')
  async createCourse(@Body() dto: CourseBodyDto, @User('_id') _id: string) {
    return this.courseService.createCourse(dto, _id);
  }

  @ApiOperation({ summary: 'create course for Instructors' })
  @ApiResponse({ status: 200, type: Promise<String> })
  @HttpCode(200)
  @Post('edit/:courseId')
  @Auth('INSTRUCTOR')
  async editCourse(@Body() dto: CourseBodyDto, @Param('courseId') courseId: string) {
    return this.courseService.editCourse(dto, courseId);
  }
}
