import { Injectable } from '@nestjs/common';
import { PointsService } from 'src/core/product/services';

@Injectable()
export class PointsUseCase {
  constructor(private readonly pointsService: PointsService) {}

  public async getAllMyPoints() {
    return await this.pointsService.getAllPoints();
  }
}
