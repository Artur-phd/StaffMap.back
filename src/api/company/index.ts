import { CompanyCoreModule } from 'src/infra/IoCC/core/company.core.module';
import { ConsultationHttpController, RateHttpController } from './controllers';
import { ConsultationUseCase, RateUseCase } from './use-cases';

export const companyControllers = [
  RateHttpController,
  ConsultationHttpController,
];

export const companyProviders = [RateUseCase, ConsultationUseCase];

export const companyImports = [CompanyCoreModule];
