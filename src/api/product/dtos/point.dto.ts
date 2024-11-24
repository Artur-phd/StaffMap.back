import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUUID } from 'class-validator';

export class PointDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNumber()
  moneyRate: number;

  @ApiProperty()
  @IsNumber()
  minStaff: number;

  @ApiProperty()
  @IsNumber()
  maxStaff: number;

  @ApiProperty()
  @IsNumber()
  workHours: number;

  @ApiProperty()
  @IsString()
  address: string;
}

export class QueryPointDto {
  @ApiProperty()
  @IsUUID()
  id: string;
}
