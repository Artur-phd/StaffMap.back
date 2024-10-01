import { CompanyCoreModule } from 'src/infra/IoCC/core/company.core.module';
import { CompanyHttpController } from './controllers';
import { RateUseCase } from './use-cases';

export const companyControllers = [CompanyHttpController];

export const companyProviders = [RateUseCase];

export const companyImports = [CompanyCoreModule];
