import { AuthApiModule } from './auth.api.module';
import { CompanyApiModule } from './company.api.module';
import { ProductApiModule } from './product.api.module';

export const apiModules = [CompanyApiModule, AuthApiModule, ProductApiModule];

export * from './api.module';
