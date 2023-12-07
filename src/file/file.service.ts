import { Injectable } from '@nestjs/common';
import { FileResponseDto } from './dto/file-response';
import { path } from 'app-root-path';
import { ensureDir, writeFile} from "fs-extra"


@Injectable()
export class FileService {
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
}
