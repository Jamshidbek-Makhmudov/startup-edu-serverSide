import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/common/decorators/auth.decorator';
import { User } from 'src/user/decorators/user.decorator';
import { CreateLessonDto } from 'src/lesson/dto/create-lesson.dto';
import { LessonService } from 'src/lesson/lesson.service';

@ApiTags('Lesson')
@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  /**create lesson */
  @ApiOperation({ summary: 'create lesson' })
  @ApiResponse({ status: 200, type: Promise<String> })
  @HttpCode(200)
  @Post('create/:sectionId')
  @Auth('INSTRUCTOR')
  async createLesson(@Body() dto: CreateLessonDto, @Param('sectionId') sectionId: string) {
    return this.lessonService.createLesson(dto, sectionId);
  }
  /**edit lesson */
  @ApiOperation({ summary: 'edit lesson' })
  @ApiResponse({ status: 200, type: Promise<String> })
  @HttpCode(200)
  @Put('edit/:lessonId')
  @Auth('INSTRUCTOR')
  async editLesson(@Body() dto: CreateLessonDto, @Param('lessonId') lessonId: string) {
    return this.lessonService.editLesson(dto, lessonId);
  }

  /**delete lesson */
  @ApiOperation({ summary: 'delete lesson' })
  @ApiResponse({ status: 200, type: Promise<String> })
  @HttpCode(200)
  @Delete('delete/:lessonId/:sectionId')
  @Auth('INSTRUCTOR')
  async deleteLesson(@Param('lessonId') lessonId: string, @Param('sectionId') sectionId: string) {
    return this.lessonService.deleteLesson(sectionId, lessonId);
  }

  /**get lesson */
  @ApiOperation({ summary: 'get lesson' })
  @ApiResponse({ status: 200, type: Promise<String> })
  @HttpCode(200)
  @Get('get/:sectionId')
  @Auth('INSTRUCTOR')
  async getLesson(@Param('sectionId') sectionId: string) {
    return this.lessonService.getLesson(sectionId);
  }

  /**complete lesson */
  @ApiOperation({ summary: 'complete lesson' })
  @ApiResponse({ status: 200, type: Promise<String> })
  @HttpCode(200)
  @Put('complete/:lessonId')
  @Auth()
  async completeLesson(@User('_id') _id: string, @Param('lessonId') lessonId: string) {
    return this.lessonService.completeLesson(_id, lessonId);
  }
  /**uncomplete lesson */
  @ApiOperation({ summary: 'uncomplete lesson' })
  @ApiResponse({ status: 200, type: Promise<String> })
  @HttpCode(200)
  @Put('uncomplete/:lessonId')
  @Auth()
  async uncompleteLesson(@User('_id') _id: string, @Param('lessonId') lessonId: string) {
    return this.lessonService.uncompleteLesson(_id, lessonId);
  }
}
