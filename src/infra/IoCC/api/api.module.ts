import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { apiModules } from '.';
import { LoggerMiddleware } from 'src/shared/middlewares';

@Module({
  imports: [
    ...apiModules,
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
  ],
})
export class ApiModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
