import { Body, Controller, HttpCode, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileResponseDto } from 'src/file/dto/file-response';
import { FileService } from 'src/file/file.service';

@ApiTags('File')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @ApiOperation({ summary: 'upload files' })
  @ApiResponse({ status: 200, type: Promise<FileResponseDto> })
  @Post('save')
  @ApiConsumes('multipart/form-data')
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('image'))
  async saveFile(
    @UploadedFile() file: Express.Multer.File,
    @Query('folder') folder?: string,
  ): Promise<FileResponseDto> {
    console.log(file);

    return this.fileService.saveFile(file, folder);
  }

  /**uplod file to aws bucket */
  @ApiOperation({ summary: 'upload files' })
  @ApiResponse({ status: 200, type: Promise<FileResponseDto> })
  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('image'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Query('folder') folder?: string,) {
    console.log(file)
    return this.fileService.uploadFile(file);
  }

  /**download from aws s3 */
  @Post('download')
  downloadFile(@Body() data: any) {
    // console.log(data.fileName)
    try {
      return this.fileService.downloadFile(data)
    } catch (err) {
      throw err;
    }
  };
  




  
  /**upload large files on aws s3 */
  @Post('create-multipart')
  async createMultiPart(@Body() body: any) {
        return await this.fileService.createMultipartUpload(body);
  } 
  
   @Post('get-presigned-url')
    async getPresignedUrl(@Body() body: any) {
        return await this.fileService.getPreSignedUrl(body);
    }

  @Post('complete-multipart')
    async completeMultiPart(@Body() body: any) {
        return await this.fileService.completeMultiPart(body);
    }





}
