import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { RoleEnum } from 'src/shared/enums/user';

export class SingUpAuthDto {
  @ApiProperty()
  @AutoMap()
  @IsString()
  email: string;

  @ApiProperty()
  @AutoMap()
  @IsString()
  password: string;

  @ApiProperty()
  @AutoMap()
  @IsString()
  firstName: string;

  @ApiProperty()
  @AutoMap()
  @IsString()
  lastName: string;

  @ApiProperty()
  @AutoMap()
  @IsString()
  birthday: string;
}

export class QueryParamSignUpDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  role?: RoleEnum;

  @ApiProperty()
  @IsOptional()
  @IsString()
  inviter?: string;
}

export class LogInAuthDto {
  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}
