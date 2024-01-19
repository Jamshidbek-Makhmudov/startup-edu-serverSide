import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from 'src/app.module';

const bootstrap = async () => {
  try {
    const app = await NestFactory.create(AppModule);
    const configServe = app.get(ConfigService);
    const PORT = configServe.get<number>('API_PORT');
    app.use(cookieParser());

    app.setGlobalPrefix('/api'); //added new
    app.useGlobalPipes(new ValidationPipe());
    const config = new DocumentBuilder()
      .setTitle('James education project')
      .setDescription('REST API')
      .setVersion('1.0.0')
      .addTag('Nestjs, Mongodb, Mongoose ') //check it Type orm
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);
    app.enableCors();
    await app.listen(PORT || 4000, () => {
      console.log(`server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
bootstrap();
