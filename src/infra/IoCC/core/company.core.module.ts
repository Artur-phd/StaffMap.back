import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  companyEntities,
  companyExports,
  companyProviders,
} from 'src/core/company';

@Module({
  imports: [TypeOrmModule.forFeature(companyEntities)],
  providers: companyProviders,
  exports: companyExports,
})
export class CompanyCoreModule {}
