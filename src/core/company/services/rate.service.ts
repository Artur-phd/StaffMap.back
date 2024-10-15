import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RateEntity } from '../entities';
import { Repository, TypeORMError } from 'typeorm';
import { RateDto } from 'src/api/company/dtos';
import { ResultDto } from 'src/shared/dtos';

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
        id: true,
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

  public async createNewRateAtDB(
    payload: RateDto,
  ): Promise<ResultDto<TypeORMError>> {
    try {
      const newData = this.rateRepository.create(payload);
      await this.rateRepository.save(newData);
      return { result: true };
    } catch (error) {
      return { result: false, error: error };
    }
  }

  public async deleteRate(title: string): Promise<ResultDto<TypeORMError>> {
    try {
      await this.rateRepository.delete({ title });
      return { result: true };
    } catch (error) {
      return { result: false, error: error };
    }
  }

  public async editById(payload: RateDto): Promise<ResultDto<TypeORMError>> {
    try {
      const dataUpdate = this.rateRepository.create(payload);
      await this.rateRepository.update(payload.id, dataUpdate);
      return { result: true };
    } catch (error) {
      return { result: false, error: error };
    }
  }
}
