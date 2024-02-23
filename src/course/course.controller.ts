import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiHeader, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/common/decorators/auth.decorator';
import { CourseService } from 'src/course/course.service';
import { CourseBodyDto } from 'src/course/dto/course.dto';
import { User } from 'src/user/decorators/user.decorator';

@ApiTags('Course')
@ApiBearerAuth()
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  /**create */
  @ApiOperation({ summary: 'create course for Instructors' })
  @ApiResponse({ status: 200, type: Promise<String> })
  @ApiBody({ type: CourseBodyDto })
  @HttpCode(201)
  @ApiBearerAuth() // Specify that Bearer token authentication is required for this controller
  @Post('create')
  @ApiHeader({ name: 'Authorization', description: 'Bearer {token}', required: true })
  @ApiHeader({ name: 'Role', description: 'Admin', required: true }) // Specify the required role
  @Auth('INSTRUCTOR')
  async createCourse(@Body() dto: CourseBodyDto, @User('_id') _id: string) {
    return this.courseService.createCourse(dto, _id);
  }
  
  /**edit */
  @ApiOperation({ summary: 'create course for Instructors' })
  @ApiResponse({ status: 200, type: Promise<String> })
  @ApiBody({ type: CourseBodyDto })
  @ApiParam({ name: 'courseId', description: 'The ID of the course' })
  @HttpCode(200)
  @Patch('edit/:courseId')
  @Auth('INSTRUCTOR')
  async editCourse(@Body() dto: CourseBodyDto, @Param('courseId') courseId: string) {
    return this.courseService.editCourse(dto, courseId);
  }
  /**delete */
  @ApiOperation({ summary: 'delete created course' })
  @ApiResponse({ status: 200, type: Promise<String> })
  @ApiParam({ name: 'courseId', description: 'The ID of the course' })
  @HttpCode(200)
  @Delete('delete/:courseId')
  @Auth('INSTRUCTOR')
  async deleteCourse(@Param('courseId') courseId: string, @User('_id') _id: string) {
    return this.courseService.deleteCourse(courseId, _id);
  }
  /**activate */
  @ApiOperation({ summary: 'activate created course' })
  @ApiResponse({ status: 200, type: Promise<String> })
  @ApiParam({ name: 'courseId', description: 'The ID of the course' })
  @HttpCode(200)
  @Put('activate/:courseId')
  @Auth('INSTRUCTOR')
  async activateCourse(@Param('courseId') courseId: string) {
    return this.courseService.activateCourse(courseId);
  }
  /**draft */
  @ApiOperation({ summary: 'draft courses' })
  @ApiResponse({ status: 200, type: Promise<String> })
  @ApiParam({ name: 'courseId', description: 'The ID of the course' })
  @HttpCode(200)
  @Put('draft/:courseId')
  @Auth('INSTRUCTOR')
  async draftCourse(@Param('courseId') courseId: string) {
    return this.courseService.draftCourse(courseId);
  }
  
  /**drag */
  @ApiOperation({ summary: 'drag courses' })
  @ApiResponse({ status: 200, type: Promise<String> })
  @ApiBody({ type: [String] })
  @ApiParam({ name: 'courseId', description: 'The ID of the course' })
  @HttpCode(200)
  @Put('drag/:courseId')
  @Auth('INSTRUCTOR')
  async dragCourseSections(
    @Param('courseId') courseId: string,
    @Body() body: { sections: string[] },
  ) {
    return this.courseService.dragCourseSections(courseId, body.sections);
  }

  /**get all */
  @ApiOperation({ summary: 'get all  courses' })
  @ApiResponse({ status: 200, type: Promise<String> })
  @ApiQuery({ name: 'language', required: true })
  @ApiQuery({ name: 'limit', required: true })
  @HttpCode(200)
  @Get('all')
  async getCourses(@Query('language') language: string, @Query('limit') limit: string) {
    return this.courseService.getCourses(language, limit);
  }
  /**admin-all-courses */
  @ApiOperation({ summary: 'admin-all-courses' })
  @ApiResponse({ status: 200, type: Promise<String> })
  @HttpCode(200)
  @Get('admin-all-courses')
  async getAllAdminCourses() {
    return this.courseService.getAdminCourses();
  }
  /**detailed-course */
  @ApiOperation({ summary: 'detailed-course' })
  @ApiResponse({ status: 200, type: Promise<String> })
    @ApiParam({ name: 'courseId', description: 'The ID of the course' })
  @HttpCode(200)
  @Get('detailed-course/:slug')
  async getDetailedCourse(@Param('slug') slug: string) {
    return this.courseService.getDetailedCourse(slug);
  }
  /**enroll-user */
  @ApiOperation({ summary: 'enroll-user' })
  @ApiResponse({ status: 200, type: Promise<String> })
    @ApiParam({ name: 'courseId', description: 'The ID of the course' })
  @HttpCode(200)
  @Put('enroll-user/:courseId')
  @Auth()
  async enrollUser(@User('_id') _id: string, @Param('courseId') courseId: string) {
    return this.courseService.enrollUser(_id, courseId);
  }
}
