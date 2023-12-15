import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/common/decorators/auth.decorator';
import { User } from '../user/decorators/user.decorator';
import { InstructorApplyDto } from './dto/instructor.dto';
import { InstructorService } from './instructor.service';

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
  async getDetailedCourses(@Param('slug') slug: string) {
    console.log(slug);
    return this.instructorService.getDetailedCourses(slug);
    
  }
}
