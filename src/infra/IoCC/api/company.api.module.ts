import { Module } from '@nestjs/common';
import {
  companyControllers,
  companyImports,
  companyProviders,
} from 'src/api/company';

@Module({
  controllers: companyControllers,
  providers: companyProviders,
  exports: companyProviders,
  imports: companyImports,
})
export class CompanyApiModule {}
