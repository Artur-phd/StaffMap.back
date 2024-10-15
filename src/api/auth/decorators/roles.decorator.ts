import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { UserEnums } from 'src/shared/enums';
import { JwtGuard, RolesGuard } from '../guards';

export const RolesSetMetadata = (...roles: UserEnums.RoleEnum[]) =>
  SetMetadata('roles', roles);

export const Roles = (...roles: UserEnums.RoleEnum[]) =>
  applyDecorators(
    UseGuards(JwtGuard),
    RolesSetMetadata(...roles),
    UseGuards(RolesGuard),
  );
