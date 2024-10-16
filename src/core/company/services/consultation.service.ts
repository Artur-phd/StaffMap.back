import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, TypeORMError } from 'typeorm';
import { ConsultationEntity } from '../entities';
import { ResultDto } from 'src/shared/dtos';

@Injectable()
export class ConsultationService {
  constructor(
    @InjectRepository(ConsultationEntity)
    private readonly consultationsRepository: Repository<ConsultationEntity>,
  ) {}

  public async findAll(): Promise<ConsultationEntity[]> {
    return await this.consultationsRepository.find();
  }

  public async addNewOrder(payload): Promise<ResultDto<TypeORMError>> {
    try {
      const newOrder = this.consultationsRepository.create(payload);
      await this.consultationsRepository.insert(newOrder);
      return { result: true };
    } catch (TypeORMError) {
      return { result: false, error: TypeORMError };
    }
  }

  public async deleteOrderById(id: string): Promise<ResultDto<TypeORMError>> {
    try {
      await this.consultationsRepository.delete({ id });
      return { result: true };
    } catch (TypeORMError) {
      return { result: false, error: TypeORMError };
    }
  }
}
