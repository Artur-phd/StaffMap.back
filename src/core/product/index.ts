import { PointsEntity, StaffEntity } from './entities';
import { PointsService, StaffService } from './services';

export const productEntities = [PointsEntity, StaffEntity];

export const productProviders = [PointsService, StaffService];

export const productExports = [PointsService, StaffService];
