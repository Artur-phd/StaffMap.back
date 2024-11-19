import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

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

export class LogInAuthDto {
  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}
