import { Injectable } from '@nestjs/common';
import { PointsService } from 'src/core/product/services';
import { PointDto, QueryPointDto } from '../dtos';

@Injectable()
export class PointsUseCase {
  constructor(private readonly pointsService: PointsService) {}

  public async getAllMyPoints() {
    return await this.pointsService.getAllPoints();
  }

  public async addNewBusinessPoint(payload: PointDto): Promise<void> {
    return await this.pointsService.addPoint(payload);
  }

  public async deletePointById(payload: QueryPointDto) {
    return await this.pointsService.deletePointById(payload.id);
  }
}
