import { Controller, HttpCode, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileResponseDto } from 'src/file/dto/file-response';
import { FileService } from 'src/file/file.service';

@ApiTags('File')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @ApiOperation({ summary: 'upload files' })
  @ApiResponse({ status: 200, type: Promise<FileResponseDto> })
  @Post('save')
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('image'))
  async saveFile(
    @UploadedFile() file: Express.Multer.File,
    @Query('folder') folder?: string,
  ): Promise<FileResponseDto> {
    console.log(file);

    return this.fileService.saveFile(file, folder);
  }
}
