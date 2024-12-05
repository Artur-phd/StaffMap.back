import { Injectable } from '@nestjs/common';
import { ConsultationEntity } from 'src/core/company/entities';
import { ConsultationService } from 'src/core/company/services';
import { ResultDto } from 'src/shared/dtos';
import { TypeORMError } from 'typeorm';

@Injectable()
export class ConsultationUseCase {
  constructor(private readonly consultationService: ConsultationService) {}

  public async createNewOrder(payload): Promise<ResultDto<TypeORMError>> {
    return await this.consultationService.addNewOrder(payload);
  }

  public async getAllOrders(): Promise<ConsultationEntity[]> {
    return await this.consultationService.findAll();
  }

  public async deleteOrderById(id: string): Promise<ResultDto<TypeORMError>> {
    return await this.consultationService.deleteOrderById(id);
  }
}
