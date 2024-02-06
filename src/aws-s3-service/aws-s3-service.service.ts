import { Injectable } from '@nestjs/common';
import { CreateAwsS3ServiceDto } from './dto/create-aws-s3-service.dto';
import { UpdateAwsS3ServiceDto } from './dto/update-aws-s3-service.dto';

@Injectable()
export class AwsS3ServiceService {
  create(createAwsS3ServiceDto: CreateAwsS3ServiceDto) {
    return 'This action adds a new awsS3Service';
  }

  findAll() {
    return `This action returns all awsS3Service`;
  }

  findOne(id: number) {
    return `This action returns a #${id} awsS3Service`;
  }

  update(id: number, updateAwsS3ServiceDto: UpdateAwsS3ServiceDto) {
    return `This action updates a #${id} awsS3Service`;
  }

  remove(id: number) {
    return `This action removes a #${id} awsS3Service`;
  }
}
