import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigLoaders } from 'src/infra/app-config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: ConfigLoaders.loaders,
    }),
  ],
})
export class AppConfigInfraModule {}
