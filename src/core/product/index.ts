import { PointsEntity } from './entities';
import { StaffEntity } from './entities/staff.entities';
import { PointsService } from './services';

export const productEntities = [PointsEntity, StaffEntity];

export const productProviders = [PointsService];

export const productExports = [PointsService];
