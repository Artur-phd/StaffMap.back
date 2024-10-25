import { Injectable } from '@nestjs/common';
import { PointsService } from 'src/core/product/services';
import { PointDto, QueryPointDto } from '../dtos';

@Injectable()
export class PointsUseCase {
  constructor(private readonly pointsService: PointsService) {}

  public async getAllMyPoints(id: string) {
    return await this.pointsService.getPointsIsMy(id);
  }

  public async addNewBusinessPoint(
    payload: PointDto,
    userId: string,
  ): Promise<void> {
    return await this.pointsService.addPoint({ ...payload, user: userId });
  }

  public async deletePointById(payload: QueryPointDto) {
    return await this.pointsService.deletePointById(payload.id);
  }

  public async editPointById(payload: PointDto, id: string) {
    return await this.pointsService.editById(payload, id);
  }
}
