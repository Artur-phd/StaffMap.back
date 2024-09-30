import {
  applyDecorators,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { AppEnums, UserEnums } from '../enums';
import { HttpMethodEnum } from '../enums/app';
import { OperationObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { RoleEnum } from '../enums/user';

export type RoutOptions = {
  method: AppEnums.HttpMethodEnum;
  title: string;
  roles?: UserEnums.RoleEnum[];
  description?: string;
  path?: string;
  code?: HttpStatus;
};

export const Route = (options: RoutOptions) => {
  const { description, method, title: summary, code, path, roles } = options;
  const methodDict = {
    [HttpMethodEnum.GET]: Get,
    [HttpMethodEnum.POST]: Post,
    [HttpMethodEnum.PUT]: Put,
    [HttpMethodEnum.PATCH]: Patch,
    [HttpMethodEnum.DELETE]: Delete,
  };

  const apiOperationsPayload: Partial<OperationObject> = {
    description,
    summary,
  };

  const decorators = [
    methodDict[method](path),
    ApiOperation(apiOperationsPayload),
  ];
  if (code) {
    decorators.push(HttpCode(code));
  }
  if (roles) {
    const avaibleRoles = roles.length === 0 ? Object.values(RoleEnum) : roles;
    decorators.push(
      ApiBearerAuth(`AccessToken`),
      ApiOperation({
        ...apiOperationsPayload,
        description:
          apiOperationsPayload.description +
          ` (Method is accessible to roles: ${avaibleRoles.join(', ')})`,
      }),
    );
  }
  return applyDecorators(...decorators);
};
