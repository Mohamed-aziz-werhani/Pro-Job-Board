import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS
  app.enableCors();
  app.enableVersioning({ type: VersioningType.URI });

  // SWAGGER: API DOCS
  const config = new DocumentBuilder()
    .setTitle('JOB BOARD API')
    .setDescription('JOB BOARD API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3003);
}
bootstrap();
