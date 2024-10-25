import { Body, Controller, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Route } from 'src/shared/decorators';
import { HttpMethodEnum } from 'src/shared/enums/app';
import { PointsUseCase } from '../use-cases';
import { ResponseDto, TokenPayloadDto } from 'src/shared/dtos';
import { PointsEntity } from 'src/core/product/entities';
import { PointDto, QueryPointDto } from '../dtos';
import { RoleEnum } from 'src/shared/enums/user';
import { CurrentUser } from 'src/api/auth/decorators';

@ApiTags('points')
@Controller('points')
export class PointsHttpController {
  constructor(private readonly pointsUseCase: PointsUseCase) {}

  @Route({
    title: 'get all my points',
    description: 'get points which is my',
    roles: [RoleEnum.ADMIN, RoleEnum.MANAGER],
    method: HttpMethodEnum.GET,
  })
  public async getAllPoints(
    @CurrentUser() user: TokenPayloadDto,
  ): Promise<ResponseDto<PointsEntity[]>> {
    console.log(user);
    return { data: await this.pointsUseCase.getAllMyPoints(user.id) };
  }

  @Route({
    title: 'Add point',
    description: 'Add',
    roles: [RoleEnum.ADMIN, RoleEnum.MANAGER],
    method: HttpMethodEnum.POST,
  })
  public async addNewPoint(
    @Body() body: PointDto,
    @CurrentUser() user: TokenPayloadDto,
  ) {
    return await this.pointsUseCase.addNewBusinessPoint(body, user.id);
  }

  @Route({
    title: 'Delete point',
    description: 'Delete by id',
    roles: [RoleEnum.ADMIN, RoleEnum.MANAGER, RoleEnum.SUPERADMIN],
    method: HttpMethodEnum.DELETE,
  })
  public async deleteById(@Query() queryParam: QueryPointDto) {
    return await this.pointsUseCase.deletePointById(queryParam);
  }

  @Route({
    title: 'Edit that point',
    description: 'by id',
    roles: [RoleEnum.ADMIN, RoleEnum.MANAGER],
    method: HttpMethodEnum.PUT,
  })
  public async editPoint(
    @Query() queryParam: QueryPointDto,
    @Body() body: PointDto,
  ) {
    return await this.pointsUseCase.editPointById(body, queryParam.id);
  }
}
