import { Module } from '@nestjs/common';
import { AppModules } from '.';

@Module({
  imports: AppModules,
})
export class AppModule {}
