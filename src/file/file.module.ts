import { Module } from '@nestjs/common';
import { FileService } from 'src/file/file.service';
import { FileController } from 'src/file/file.controller';
import { ServeStaticModule } from "@nestjs/serve-static"
import { path } from 'app-root-path';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule, //?
    ServeStaticModule.forRoot({
      rootPath: `${path}/uploads`,
      serveRoot:'/uploads',
    })
  ],
  controllers: [FileController],
  providers: [FileService]
})
export class FileModule {}
