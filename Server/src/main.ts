import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS
 
  app.enableVersioning({ type: VersioningType.URI });
  app.enableCors({
    origin: 'http://localhost:5173', // Autorise uniquement le frontend React
    methods: '*',        // Autorise ces méthodes
    credentials: true,               // Si vous utilisez des cookies ou des sessions
  });

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
