import { ApiModule } from './api';
import { CoreModule } from './core/core.module';
import { infraModules } from './infra';

export const AppModules = [ApiModule, CoreModule, ...infraModules];
