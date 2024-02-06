import { Module } from '@nestjs/common';
import { AwsS3ServiceService } from './aws-s3-service.service';
import { AwsS3ServiceController } from './aws-s3-service.controller';

@Module({
  controllers: [AwsS3ServiceController],
  providers: [AwsS3ServiceService]
})
export class AwsS3ServiceModule {}
