import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CompanyMainUseCase } from '../use-cases';
import { Route } from 'src/shared/decorators';
import { HttpMethodEnum } from 'src/shared/enums/app';

@ApiTags('company')
@Controller('company')
export class CompanyHttpController {
  constructor(private readonly companyUseCase: CompanyMainUseCase) {}

  @Route({
    title: 'It`s main path for company',
    description: 'path for get info',
    method: HttpMethodEnum.GET,
  })
  public getInoCompany() {
    return this.companyUseCase.getInfo();
  }
}
