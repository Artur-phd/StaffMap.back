import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class RateDto {
  @ApiProperty()
  @IsOptional()
  @IsUUID()
  id?: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNumber()
  points: number;

  @ApiProperty()
  @IsBoolean()
  financialControl: boolean;

  @ApiProperty()
  @IsBoolean()
  artificialIntelligence: boolean;

  @ApiProperty()
  @IsNumber()
  employeesOfTheSomeClass: number;

  @ApiProperty()
  @IsBoolean()
  automationOfPayments: boolean;

  @ApiProperty()
  @IsBoolean()
  active: boolean;

  @ApiProperty()
  @IsNumber()
  price: number;
}

export class DeleteRateDtoByTitle {
  @IsString()
  @IsNotEmpty()
  title: string;
}
