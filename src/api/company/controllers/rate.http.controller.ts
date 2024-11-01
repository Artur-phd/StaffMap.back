import { Body, Controller, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RateUseCase } from '../use-cases';
import { Route } from 'src/shared/decorators';
import { HttpMethodEnum } from 'src/shared/enums/app';
import { ResponseDto, ResultDto } from 'src/shared/dtos';
import { RateEntity } from 'src/core/company/entities';
import { DeleteRateDtoByTitle, RateDto } from '../dtos';
import { TypeORMError } from 'typeorm';
import { RoleEnum } from 'src/shared/enums/user';

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
    roles: [RoleEnum.SUPERADMIN],
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
    roles: [RoleEnum.SUPERADMIN],
  })
  public deleteRateByTitle(
    @Query() queryParams: DeleteRateDtoByTitle,
  ): Promise<ResultDto<TypeORMError>> {
    return this.rateUseCase.deleteRate(queryParams);
  }

  @Route({
    title: 'Edit rate',
    description: 'edit rate by id',
    method: HttpMethodEnum.PUT,
    roles: [RoleEnum.SUPERADMIN],
  })
  public async editRateById(
    @Body() body: RateDto,
  ): Promise<ResultDto<TypeORMError>> {
    return await this.rateUseCase.editRate(body);
  }
}
