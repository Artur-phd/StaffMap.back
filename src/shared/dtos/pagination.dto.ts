import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Max,
  Min,
} from 'class-validator';
import { ResponseDto } from './response.dto';
import { Field } from '../decorators';

export class PaginationQueryDto {
  @Field({
    description: 'Количество запрошенных записей',
  })
  @IsOptional()
  @Min(1)
  @IsInt()
  @Type(() => Number)
  @ApiPropertyOptional()
  limit?: number = 10;

  @Field({
    description: 'Номер страницы',
  })
  @IsOptional()
  @Min(1)
  @Max(500)
  @IsInt()
  @Type(() => Number)
  @ApiPropertyOptional()
  page?: number = 1;
}

export class PaginationParamDto {
  take: number;
  skip: number;
}

export class PaginationOutputDto {
  constructor(total: number, limit: number, page: number, totalPages: number) {
    this.total = total;
    this.limit = limit;
    this.page = page;
    this.totalPages = totalPages;
  }
  @Field({
    description: 'Всего записей',
  })
  @IsNumber()
  total: number;

  @Field({
    description: 'Записей в ответе',
  })
  @IsNumber()
  limit: number;

  @Field({
    description: 'Страница пагинации',
  })
  @IsNumber()
  page: number;

  @Field({
    description: 'Всего страниц',
  })
  @IsNumber()
  totalPages: number;
}

export class PaginationResponseDto<T> extends ResponseDto<T[]> {
  @Field({
    description: 'Метаданные запроса',
  })
  @IsNotEmpty()
  metadata: PaginationOutputDto;
}
