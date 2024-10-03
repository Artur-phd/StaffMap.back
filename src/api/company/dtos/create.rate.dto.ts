import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RateDto {
  @IsString()
  title: string;

  @IsNumber()
  points: number;

  @IsBoolean()
  financialControl: boolean;

  @IsBoolean()
  artificialIntelligence: boolean;

  @IsNumber()
  employeesOfTheSomeClass: number;

  @IsBoolean()
  automationOfPayments: boolean;

  @IsBoolean()
  active: boolean;

  @IsNumber()
  price: number;
}

export class DeleteRateDtoByTitle {
  @IsString()
  @IsNotEmpty()
  title: string;
}
