import { Module } from '@nestjs/common';
import { coreModules } from '.';
import { PostgresDatabaseModule } from '../infra';

@Module({
  imports: [...coreModules, PostgresDatabaseModule],
})
export class CoreModule {}
