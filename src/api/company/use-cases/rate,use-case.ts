import { Injectable } from '@nestjs/common';
import { RateEntity } from 'src/core/company/entities';
import { RateService } from 'src/core/company/services';

@Injectable()
export class RateUseCase {
  constructor(private readonly rateService: RateService) {}

  public async getInfoRateAll(): Promise<RateEntity[]> {
    return await this.rateService.getInfoRates();
  }
}
