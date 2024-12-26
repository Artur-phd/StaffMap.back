import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString, IsUUID } from 'class-validator';
import { StaffEntity } from 'src/core/product/entities';
import { AppEnums } from 'src/shared/enums';

export class StaffFineDto {
  @ApiProperty()
  @IsEnum(AppEnums.TransactionTypes)
  @IsString()
  type: AppEnums.TransactionTypes;

  @ApiProperty()
  @IsNumber()
  size: number;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  @IsUUID()
  recipientUserId: string;
}

export class StaffChoicePointQueryDto {
  @ApiProperty()
  @IsString()
  @IsUUID()
  pointId: StaffEntity;
}
