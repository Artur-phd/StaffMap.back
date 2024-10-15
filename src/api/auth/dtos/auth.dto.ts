import { AutoMap } from '@automapper/classes';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { UserEnums } from 'src/shared/enums';

export class SingUpAuthDto {
  @AutoMap()
  @IsString()
  email: string;

  @AutoMap()
  @IsString()
  password: string;

  @AutoMap()
  @IsString()
  firstName: string;

  @AutoMap()
  @IsString()
  lastName: string;

  @AutoMap()
  @IsString()
  birthday: string;

  @AutoMap()
  @IsEnum(UserEnums.RoleEnum)
  @IsOptional()
  role?: UserEnums.RoleEnum = UserEnums.RoleEnum.ADMIN;
}

export class LogInAuthDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
