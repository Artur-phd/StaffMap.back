import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Route } from 'src/shared/decorators';
import { HttpMethodEnum } from 'src/shared/enums/app';
import { PointsUseCase } from '../use-cases';
import { ResponseDto } from 'src/shared/dtos';
import { PointsEntity } from 'src/core/product/entities';

@ApiTags('points')
@Controller('points')
export class PointsHttpController {
  constructor(private readonly pointsUseCase: PointsUseCase) {}

  @Route({
    title: 'get all my points',
    description: 'get points which is my',
    method: HttpMethodEnum.GET,
  })
  public async getAllPoints(): Promise<ResponseDto<PointsEntity[]>> {
    return { data: await this.pointsUseCase.getAllMyPoints() };
  }
}
