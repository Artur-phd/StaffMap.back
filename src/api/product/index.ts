import { ProductCoreModule } from 'src/infra/IoCC/core/product.core.module';
import { PointsHttpController } from './controllers';
import { PointsUseCase } from './use-cases';

export const productControllers = [PointsHttpController];

export const productProviders = [PointsUseCase];

export const productImports = [ProductCoreModule];
