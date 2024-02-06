import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { FileResponseDto } from 'src/file/dto/file-response';
import { path } from 'app-root-path';
import { ensureDir, writeFile} from "fs-extra"
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

@Injectable()
export class FileService {
  AWS_S3_BUCKET = this.configService.getOrThrow('AWS_BUCKET_NAME');
  s3 = new AWS.S3({
    accessKeyId: this.configService.getOrThrow('AWS_ACCESS_KEY_ID'),
    secretAccessKey: this.configService.getOrThrow('AWS_SECRET_ACCESS_KEY'),
  });

  constructor(private readonly configService: ConfigService) { }
  
  async saveFile(file:Express.Multer.File, folder:string ='default'):Promise<FileResponseDto> {
    const uploadFolder = `${path}/uploads/${folder}`

    const uniqueId = Math.floor(Math.random() * 9999)
    
    await ensureDir(uploadFolder); // Ensures that the directory exists. If the directory structure does not exist, it is created.
    await writeFile(`${uploadFolder}/${uniqueId}-${file.originalname}`, file.buffer)
    
    const response: FileResponseDto = {
      url: `/uploads/${folder}/${uniqueId}-${file.originalname}`,
      name:file.originalname
    }
    return response
  }
  
  /**upload file on aws bucket */
async uploadFile(file:Express.Multer.File) {
    const { originalname } = file;

    return await this.s3_upload(
      file.buffer,
      this.AWS_S3_BUCKET,
      originalname,
      file.mimetype,
    );
}
  async s3_upload(file: Buffer, bucket: string, name: string, mimetype: string): Promise<FileResponseDto> {
    // :Promise<AWS.S3.ManagedUpload.SendData>
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
      ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: 'ap-northeast-2',
      },
    };

    try {
      let s3Response = await this.s3.upload(params).promise();
      console.log(s3Response);
      // return s3Response;
        let response:FileResponseDto={
          url: s3Response.Location,
          name: s3Response.Key
        };
      
      return response;
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException("Could not upload file");
    }
  }


}
