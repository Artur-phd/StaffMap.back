import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserEnums } from 'src/shared/enums';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const roles = this.reflector.get<UserEnums.RoleEnum[]>(
      'roles',
      ctx.getHandler(),
    );
    if (!roles.length) {
      return true;
    }

    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    const hasRole = () => roles.some((role) => role === user.role);
    return user && user.role && hasRole();
  }
}
