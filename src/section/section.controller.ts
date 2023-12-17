import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/common/decorators/auth.decorator';
import { CreateSectionDto } from './dto/create-section.dto';
import { SectionService } from './section.service';

@ApiTags('Section')
@Controller('section')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  /**create section */
  @ApiOperation({ summary: 'create section' })
  @ApiResponse({ status: 200, type: Promise<String> })
  @HttpCode(200)
  @Post('create/:courseId')
  @Auth('INSTRUCTOR')
  async createSection(@Body() dto: CreateSectionDto, @Param('courseId') courseId: string) {
    return this.sectionService.createSection(dto, courseId);
  }
  /**get section */
  @ApiOperation({ summary: 'get section' })
  @ApiResponse({ status: 200, type: Promise<String> })
  @HttpCode(200)
  @Get('get/:courseId')
  async getSection(@Param('courseId') courseId: string) {
    return this.sectionService.getSection(courseId);
  }
  /**edit section */
  @ApiOperation({ summary: 'edit section' })
  @ApiResponse({ status: 200, type: Promise<String> })
  @HttpCode(200)
  @Put('edit/:sectionId')
  @Auth('INSTRUCTOR')
  async editSection(@Param('sectionId') sectionId: string, @Body() dto: CreateSectionDto) {
    return this.sectionService.editSection(sectionId, dto);
  }
  /**delete section */
  @ApiOperation({ summary: 'delete section' })
  @ApiResponse({ status: 200, type: Promise<String> })
  @HttpCode(200)
  @Delete('delete/:sectionId/:courseId')
  @Auth('INSTRUCTOR')
  async deleteSection(@Param('sectionId') sectionId: string, @Param('courseId') courseId: string) {
    return this.sectionService.deleteSection(sectionId, courseId);
  }
}
