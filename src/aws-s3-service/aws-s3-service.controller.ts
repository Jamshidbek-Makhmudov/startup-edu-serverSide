import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AwsS3ServiceService } from './aws-s3-service.service';
import { CreateAwsS3ServiceDto } from './dto/create-aws-s3-service.dto';
import { UpdateAwsS3ServiceDto } from './dto/update-aws-s3-service.dto';

@Controller('aws-s3-service')
export class AwsS3ServiceController {
  constructor(private readonly awsS3ServiceService: AwsS3ServiceService) {}

  @Post()
  create(@Body() createAwsS3ServiceDto: CreateAwsS3ServiceDto) {
    return this.awsS3ServiceService.create(createAwsS3ServiceDto);
  }

  @Get()
  findAll() {
    return this.awsS3ServiceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.awsS3ServiceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAwsS3ServiceDto: UpdateAwsS3ServiceDto) {
    return this.awsS3ServiceService.update(+id, updateAwsS3ServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.awsS3ServiceService.remove(+id);
  }
}
