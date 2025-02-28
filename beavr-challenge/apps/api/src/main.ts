import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();

// 2 Modules

// Requirement module
// - GET /requirements => Retourne tous les requirements and their statuses

// Document module
// - GET /documents/types => Retourne la liste de tous les types de documents disponible
// - GET /documents => Retourne tous les documents uploaded et leur status
// - POST /documents => Creer un document d'un certain type
// - PUT /documents/:id => Update status of the document (version / type)
// - DELETE /documents/:id => Remove document (version / type)
