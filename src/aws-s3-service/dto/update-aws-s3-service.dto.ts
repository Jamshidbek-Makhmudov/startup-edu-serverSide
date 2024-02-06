import { PartialType } from '@nestjs/swagger';
import { CreateAwsS3ServiceDto } from './create-aws-s3-service.dto';

export class UpdateAwsS3ServiceDto extends PartialType(CreateAwsS3ServiceDto) {}
