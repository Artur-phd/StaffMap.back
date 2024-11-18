import { NestFactory } from '@nestjs/core';
import { AppModule } from './infra/IoCC/app.module';
import { AppFactory } from './app.factory';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = AppFactory.logger;
  initializeTransactionalContext();
  const app = await NestFactory.create(AppModule, { logger });
  const config = new DocumentBuilder()
    .setTitle('StaffMap API documentation')
    .setDescription('The API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await new AppFactory(app).useGlobalPipes().useCors().listen();
}
bootstrap();
