import { Module } from '@nestjs/common';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { apiModules } from '.';

@Module({
  imports: [
    ...apiModules,
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
  ],
})
export class ApiModule {}

