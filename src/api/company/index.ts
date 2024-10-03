import { CompanyCoreModule } from 'src/infra/IoCC/core/company.core.module';
import { RateHttpController } from './controllers';
import { RateUseCase } from './use-cases';

export const companyControllers = [RateHttpController];

export const companyProviders = [RateUseCase];

export const companyImports = [CompanyCoreModule];
