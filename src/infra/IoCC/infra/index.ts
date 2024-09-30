import { AppConfigInfraModule } from './app-config.infra.module';
import { PostgresDatabaseModule } from './postgres.database.module';

export const infraModules = [PostgresDatabaseModule, AppConfigInfraModule];

export * from './app-config.infra.module';
export * from './postgres.database.module';
