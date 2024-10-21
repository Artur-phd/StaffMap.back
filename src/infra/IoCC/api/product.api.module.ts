import { Module } from '@nestjs/common';
import {
  productControllers,
  productImports,
  productProviders,
} from 'src/api/product';

@Module({
  controllers: productControllers,
  providers: productProviders,
  exports: productProviders,
  imports: productImports,
})
export class ProductApiModule {}
