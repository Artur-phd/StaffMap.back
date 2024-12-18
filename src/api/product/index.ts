import { ProductCoreModule } from 'src/infra/IoCC/core/product.core.module';
import { PointsHttpController, StaffHttpController } from './controllers';
import { PointsUseCase, StaffUseCase } from './use-cases';

export const productControllers = [PointsHttpController, StaffHttpController];

export const productProviders = [PointsUseCase, StaffUseCase];

export const productImports = [ProductCoreModule];
