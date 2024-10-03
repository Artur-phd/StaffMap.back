import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class ResultDto<T = null> {
  @IsBoolean()
  @IsNotEmpty()
  result: boolean;

  @IsOptional()
  error?: T;
}
