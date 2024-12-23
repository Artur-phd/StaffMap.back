import { PointsEntity, StaffEntity, TransactionsEntity } from './entities';
import { PointsService, StaffService } from './services';

export const productEntities = [PointsEntity, StaffEntity, TransactionsEntity];

export const productProviders = [PointsService, StaffService];

export const productExports = [PointsService, StaffService];
