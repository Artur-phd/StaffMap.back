import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  productEntities,
  productExports,
  productProviders,
} from 'src/core/product';

@Module({
  imports: [TypeOrmModule.forFeature(productEntities)],
  providers: productProviders,
  exports: productExports,
})
export class ProductCoreModule {}
