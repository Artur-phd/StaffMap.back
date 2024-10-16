import { ConsultationEntity, RateEntity } from './entities';
import { ConsultationService, RateService } from './services';

export const companyEntities = [RateEntity, ConsultationEntity];

export const companyProviders = [RateService, ConsultationService];

export const companyExports = [RateService, ConsultationService];
