import { ProductCoreModule } from 'src/infra/IoCC/core/product.core.module';
import { PointsHttpController, StaffHttpController } from './controllers';
import { PointsUseCase, StaffUseCase } from './use-cases';
import { UserCoreModule } from 'src/infra/IoCC/core/user.core.module';

export const productControllers = [PointsHttpController, StaffHttpController];

export const productProviders = [PointsUseCase, StaffUseCase];

export const productImports = [ProductCoreModule, UserCoreModule];
