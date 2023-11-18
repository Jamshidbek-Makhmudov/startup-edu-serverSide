import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { InstructorService } from './instructor.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InstructorApplyDto } from './dto/instructor.dto';

@ApiTags("Instructor")
@Controller('instructor')
export class InstructorController {
  constructor(private readonly instructorService: InstructorService) { }
  
  @ApiOperation({ summary: "become instructor" })
  @ApiResponse({ status: 200, type: Promise<String> })
  @HttpCode(200)
  @Post('apply')
  async applyAsInstructor(@Body() dto: InstructorApplyDto) {
    return this.instructorService.applyAsInstructor(dto)
   }


}
