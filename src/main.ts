import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from 'src/app.module';
import * as dotenv from 'dotenv';
import { testLogger } from 'src/services/test-logger';


/**coming soon => logger  */
// import { Logger } from '@nestjs/common';
// const logger = new Logger('Bootstrap');

const bootstrap = async () => {

  try {
    //coming soon => config the environment
   const nodeEnv = process.env.NODE_ENV || 'development';
  const envFile = `.env.${nodeEnv}`;
    dotenv.config({ path: envFile });
    
    /**logging errors: */
    // testLogger.log("info", "log");
    testLogger.error("error");
    // testLogger.debug("debug");
    // testLogger.warn("warn");
    // testLogger.info("info");


    const app = await NestFactory.create(AppModule);
    const configServe = app.get(ConfigService);
    const PORT = configServe.get<number>('API_PORT');
    app.use(cookieParser());

    app.setGlobalPrefix('/api'); 
    app.useGlobalPipes(new ValidationPipe());
    const config = new DocumentBuilder()
      .setTitle('James education project')
      .setDescription('REST API')
      .setVersion('1.0.0')
      .addBearerAuth() 
      .addTag('Nestjs, Mongodb, Mongoose ')
      .build();

    const document = SwaggerModule.createDocument(app, config);

    const globalSecurity = [{ bearerAuth: [] }];
    document.security = globalSecurity;

    SwaggerModule.setup('/api/docs', app, document);
    app.enableCors();
    await app.listen(PORT || 4000, () => {
      console.log(`server is running on port ${PORT}`);
      // logger.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
    // logger.error(error.message, error.stack)
  }
};
bootstrap();


/**yangilik swaggerda @ApiBody({ type: LoginAuthDto }) typeni har biriga mos qilib yozish kerak 
@ApiBearerAuth()  guard bor joyda ishlatiosh kerak */
