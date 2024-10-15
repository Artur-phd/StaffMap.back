import { AutoMap } from '@automapper/classes';
import { UserEnums } from '../enums';
import { IsEmail, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

export class TokenPayloadDto {
  @AutoMap()
  @IsUUID()
  id: string;

  @AutoMap()
  @IsEmail()
  email: string;

  @AutoMap()
  @IsString()
  firstName: string;

  @AutoMap()
  @IsString()
  lastName: string;

  @AutoMap()
  @IsEnum(UserEnums.RoleEnum)
  @IsOptional()
  role?: UserEnums.RoleEnum;
}
