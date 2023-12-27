import { Body, Controller, Get, HttpCode, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/common/decorators/auth.decorator';
import { User } from 'src/user/decorators/user.decorator';
import { InstructorApplyDto } from 'src/instructor/dto/instructor.dto';
import { InstructorService } from 'src/instructor/instructor.service';

@ApiTags('Instructor')
@Controller('instructor')
export class InstructorController {
  constructor(private readonly instructorService: InstructorService) {}

  /**become an Instructor */
  @ApiOperation({ summary: 'become instructor' })
  @ApiResponse({ status: 200, type: Promise<String> })
  @HttpCode(200)
  @Post('apply')
  async applyAsInstructor(@Body() dto: InstructorApplyDto) {
    return this.instructorService.applyAsInstructor(dto);
  }

  /**get all courses */
  @ApiOperation({ summary: 'get all courses' })
  @ApiResponse({ status: 200, type: Promise<String> })
  @HttpCode(200)
  @Get('course-all')
  @Auth('INSTRUCTOR')
  async getAllCourses(@User('_id') _id: string) {
    return this.instructorService.getAllCourses(_id);
  }

  /**get detailed courses */
  @ApiOperation({ summary: 'get detailed courses' })
  @ApiResponse({ status: 200, type: Promise<String> })
  @HttpCode(200)
  @Get('course/:slug')
  @Auth('INSTRUCTOR')
  async getDetailedCourse(@Param('slug') slug: string) {
    return this.instructorService.getDetailedCourse(slug);
  }
  /**get all instructors */
  @ApiOperation({ summary: 'get all instrucotrs' })
  @ApiResponse({ status: 200, type: Promise<String> })
  @HttpCode(200)
  @Get('all')
  async getInstructors(@Query('language') language: string, @Query('limit') limit: string) {
    return this.instructorService.getInstructors(language, limit);
  }
}
