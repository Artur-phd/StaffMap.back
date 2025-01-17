import { AutoMap } from '@automapper/classes';
import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmptyObject, IsOptional, ValidateNested } from 'class-validator';

export type FieldOptions = {
  description: string;
  autoMapType?: any;
  isOptional?: boolean;
};

export const Field = (options: FieldOptions) => {
  const { description, autoMapType, isOptional } = options;

  const decorators = [ApiProperty({ description })];
  if (autoMapType) {
    decorators.push(
      AutoMap(autoMapType),
      Type(autoMapType),
      ValidateNested(),
      IsNotEmptyObject(),
    );
  } else {
    decorators.push(AutoMap());
  }

  if (isOptional) {
    decorators.push(IsOptional());
  }

  return applyDecorators(...decorators);
};
