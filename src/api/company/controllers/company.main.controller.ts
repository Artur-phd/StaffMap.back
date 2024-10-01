import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RateUseCase } from '../use-cases';
import { Route } from 'src/shared/decorators';
import { HttpMethodEnum } from 'src/shared/enums/app';
import { ResponseDto } from 'src/shared/dtos';
import { RateEntity } from 'src/core/company/entities';

@ApiTags('company')
@Controller('company')
export class CompanyHttpController {
  constructor(private readonly rateUseCase: RateUseCase) {}

  @Route({
    title: 'Get the info rate',
    description: 'Just info',
    method: HttpMethodEnum.GET,
    path: 'rate',
  })
  public async getInfoAboutAllRate(): Promise<ResponseDto<RateEntity[]>> {
    return { data: await this.rateUseCase.getInfoRateAll() };
  }
}
