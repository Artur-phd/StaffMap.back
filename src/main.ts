import { NestFactory } from '@nestjs/core';
import { AppModule } from './infra/IoCC/app.module';
import { AppFactory } from './app.factory';
import { initializeTransactionalContext } from 'typeorm-transactional';

async function bootstrap() {
  const logger = AppFactory.logger;
  initializeTransactionalContext();
  const app = await NestFactory.create(AppModule, { logger });
  await new AppFactory(app).useGlobalPipes().useCors().listen();
}
bootstrap();
