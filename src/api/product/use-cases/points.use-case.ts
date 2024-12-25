import { Injectable } from '@nestjs/common';
import { PointsService } from 'src/core/product/services';
import { PointDto, QueryPointDto } from '../dtos';
import { PointsEntity } from 'src/core/product/entities';

@Injectable()
export class PointsUseCase {
  constructor(private readonly pointsService: PointsService) {}

  public async getAllMyPoints(): Promise<PointsEntity[]> {
    return await this.pointsService.getPointsIsMy();
  }

  public async addNewBusinessPoint(
    payload: PointDto,
    userId: string,
  ): Promise<void> {
    return await this.pointsService.addPoint({ ...payload, user: userId });
  }

  public async deletePointById(
    payload: QueryPointDto,
    userId: string,
  ): Promise<void> {
    return await this.pointsService.deletePointById(payload.id, userId);
  }

  public async editPointById(
    payload: PointDto,
    id: string,
    userId: string,
  ): Promise<void> {
    return await this.pointsService.editById(payload, id, userId);
  }

  public async editPointHours(
    pointDto: PointDto,
    pointId: string,
    workHours: number,
  ): Promise<void> {
    return await this.pointsService.editPointHours(
      pointDto,
      pointId,
      workHours,
    );
  }
}
