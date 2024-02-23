import { Body, Controller, Delete, Get, HttpCode, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/common/decorators/auth.decorator';
import { AdminService } from 'src/admin/admin.service';
import { ApproveInstructorDto } from 'src/admin/dto/admin.dto';

@ApiTags('Admin')
@ApiBearerAuth() 
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  /**get all instructors */
  @ApiOperation({ summary: 'get all instructors' })
  @ApiResponse({ status: 200, type: Promise<String> })
  @HttpCode(200)
  @Get('all-instructors')
  @Auth('ADMIN')
  async getAllInstructors() {
    return this.adminService.getAllInstructors();
  }

  /**aprove instructors */
  @ApiOperation({ summary: 'aprove instructors' })
  @ApiResponse({ status: 200, type: Promise<String> })
  @ApiBody({ type: ApproveInstructorDto }) 
  @HttpCode(200)
  @Put('approve-instructor')
  @Auth('ADMIN')
  async approveInstructor(@Body() body: ApproveInstructorDto) {
    return this.adminService.approveInstructor(body.instructorId);
  }
  
  /**delete instructor */
  @ApiOperation({ summary: 'delete instructor' })
  @ApiResponse({ status: 200, type: Promise<String> })
  @ApiBody({ type: ApproveInstructorDto }) 
  @HttpCode(200)
  @Put('delete-instructor')
  @Auth('ADMIN')
  async deleteInstructor(@Body() body: ApproveInstructorDto) {
    return this.adminService.deleteInstructor(body.instructorId);
  }

  /**all users */
  @ApiOperation({ summary: 'all users' })
  @ApiResponse({ status: 200, type: Promise<String> })
  @ApiQuery({ name: 'limit', required: true })
  @HttpCode(200)
  @Get('all-users')
  @Auth('ADMIN')
  async getAllUsers(@Query('limit') limit: string) {
    return this.adminService.getAllUsers(Number(limit));
  }
  
  /**search users */
  @ApiOperation({ summary: 'search users' })
  @ApiResponse({ status: 200, type: Promise<String> })
  @ApiQuery({ name: 'email', required: true })
  @ApiQuery({ name: 'limit', required: true })
  @HttpCode(200)
  @Get('search-users')
  @Auth('ADMIN')
  async searchUser(@Query('email') email: string, @Query('limit') limit: string) {
    return this.adminService.searchUser(email, Number(limit));
  }

  /**delete course */
  @ApiOperation({ summary: 'delete course' })
  @ApiResponse({ status: 200, type: Promise<String> })
  @ApiParam({ name: 'courseId', description: 'The ID of the course' })
  @HttpCode(200)
  @Delete('delete-course')
  @Auth('ADMIN')
  async deleteCourse(@Query('courseId') courseId: string) {
    return this.adminService.deleteCourse(courseId);
  }
}
