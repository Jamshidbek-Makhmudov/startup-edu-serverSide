import { Module } from '@nestjs/common';
import { FileService } from 'src/file/file.service';
import { FileController } from 'src/file/file.controller';
import { ServeStaticModule } from "@nestjs/serve-static"
import { path } from 'app-root-path';


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: `${path}/uploads`,
      serveRoot:'/uploads',
    })
  ],
  controllers: [FileController],
  providers: [FileService]
})
export class FileModule {}
