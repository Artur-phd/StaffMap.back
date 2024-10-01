import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RateEntity } from '../entities';
import { Repository } from 'typeorm';

@Injectable()
export class RateService {
  constructor(
    @InjectRepository(RateEntity)
    private readonly rateRepository: Repository<RateEntity>,
  ) {}

  public async getInfoRates(): Promise<RateEntity[]> {
    return await this.rateRepository.find({
      where: { active: true },
      select: {
        title: true,
        points: true,
        financialControl: true,
        artificialIntelligence: true,
        employeesOfTheSomeClass: true,
        automationOfPayments: true,
        price: true,
      },
    });
  }
}
