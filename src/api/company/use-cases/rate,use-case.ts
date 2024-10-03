import { Injectable } from '@nestjs/common';
import { RateEntity } from 'src/core/company/entities';
import { RateService } from 'src/core/company/services';
import { DeleteRateDtoByTitle, RateDto } from '../dtos';
import { ResultDto } from 'src/shared/dtos';
import { TypeORMError } from 'typeorm';

@Injectable()
export class RateUseCase {
  constructor(private readonly rateService: RateService) {}

  public async getInfoRateAll(): Promise<RateEntity[]> {
    return await this.rateService.getInfoRates();
  }

  public createNewRate(body: RateDto): Promise<ResultDto<TypeORMError>> {
    const newRate = this.rateService.createNewRateAtDB(body);
    return newRate;
  }

  public deleteRate(
    payload: DeleteRateDtoByTitle,
  ): Promise<ResultDto<TypeORMError>> {
    return this.rateService.deleteRate(payload.title);
  }
}
