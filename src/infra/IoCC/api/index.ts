import { AuthApiModule } from './auth.api.module';
import { CompanyApiModule } from './company.api.module';

export const apiModules = [CompanyApiModule, AuthApiModule];

export * from './api.module';
