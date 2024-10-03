import { Body, Controller, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RateUseCase } from '../use-cases';
import { Route } from 'src/shared/decorators';
import { HttpMethodEnum } from 'src/shared/enums/app';
import { ResponseDto, ResultDto } from 'src/shared/dtos';
import { RateEntity } from 'src/core/company/entities';
import { DeleteRateDtoByTitle, RateDto } from '../dtos';
import { TypeORMError } from 'typeorm';

@ApiTags('rate')
@Controller('rate')
export class RateHttpController {
  constructor(private readonly rateUseCase: RateUseCase) {}

  @Route({
    title: 'Get the info rate',
    description: 'Just info',
    method: HttpMethodEnum.GET,
  })
  public async getInfoAboutAllRate(): Promise<ResponseDto<RateEntity[]>> {
    return { data: await this.rateUseCase.getInfoRateAll() };
  }

  @Route({
    title: 'Create new rate',
    description: 'add new rate',
    method: HttpMethodEnum.POST,
  })
  public createNewRate(
    @Body() body: RateDto,
  ): Promise<ResultDto<TypeORMError>> {
    return this.rateUseCase.createNewRate(body);
  }

  @Route({
    title: 'Delete the rate',
    description: 'delete by title',
    method: HttpMethodEnum.DELETE,
  })
  public deleteRateByTitle(
    @Query() queryParams: DeleteRateDtoByTitle,
  ): Promise<ResultDto<TypeORMError>> {
    return this.rateUseCase.deleteRate(queryParams);
  }
}
