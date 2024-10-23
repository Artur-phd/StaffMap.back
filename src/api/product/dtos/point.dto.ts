import { IsNumber, IsString, IsUUID } from 'class-validator';

export class PointDto {
  @IsString()
  title: string;

  @IsNumber()
  moneyRate: number;

  @IsNumber()
  minStaff: number;

  @IsNumber()
  maxStaff: number;

  @IsNumber()
  workHours: number;

  @IsString()
  address: string;
}

export class QueryPointDto {
  @IsUUID()
  id: string;
}
