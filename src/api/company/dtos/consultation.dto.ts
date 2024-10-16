import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ConsultationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  phone: string;
}

export class DeleteOrderConsultationDto {
  @IsUUID()
  id: string;
}
