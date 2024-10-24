import { Body, Controller, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Route } from 'src/shared/decorators';
import { HttpMethodEnum } from 'src/shared/enums/app';
import { PointsUseCase } from '../use-cases';
import { ResponseDto } from 'src/shared/dtos';
import { PointsEntity } from 'src/core/product/entities';
import { PointDto, QueryPointDto } from '../dtos';

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

  @Route({
    title: 'Add point',
    description: 'Add',
    method: HttpMethodEnum.POST,
  })
  public async addNewPoint(@Body() body: PointDto) {
    return await this.pointsUseCase.addNewBusinessPoint(body);
  }

  @Route({
    title: 'Delete point',
    description: 'Delete by id',
    method: HttpMethodEnum.DELETE,
  })
  public async deleteById(@Query() queryParam: QueryPointDto) {
    return await this.pointsUseCase.deletePointById(queryParam);
  }

  @Route({
    title: 'Edit that point',
    description: 'by id',
    method: HttpMethodEnum.PUT,
  })
  public async editPoint(
    @Query() queryParam: QueryPointDto,
    @Body() body: PointDto,
  ) {
    return await this.pointsUseCase.editPointById(body, queryParam.id);
  }
}
