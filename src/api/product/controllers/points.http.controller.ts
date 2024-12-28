import { Body, Controller, Query } from '@nestjs/common';
import { ApiBody, ApiHeader, ApiQuery, ApiTags } from '@nestjs/swagger';
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
  @ApiHeader({ name: 's-access-token', description: 'jwt token' })
  public async getAllPoints(): Promise<ResponseDto<PointsEntity[]>> {
    return { data: await this.pointsUseCase.getAllMyPoints() };
  }

  @Route({
    title: 'Add point',
    description: 'Add',
    roles: [RoleEnum.ADMIN, RoleEnum.MANAGER],
    method: HttpMethodEnum.POST,
  })
  @ApiHeader({ name: 's-access-token', description: 'jwt token' })
  public async addNewPoint(
    @Body() body: PointDto,
    @CurrentUser() user: TokenPayloadDto,
  ): Promise<void> {
    return await this.pointsUseCase.addNewBusinessPoint(body, user.id);
  }

  @Route({
    title: 'Delete point',
    description: 'Delete by id',
    roles: [RoleEnum.ADMIN, RoleEnum.MANAGER],
    method: HttpMethodEnum.DELETE,
  })
  @ApiHeader({ name: 's-access-token', description: 'jwt token' })
  @ApiQuery({ name: 'id' })
  public async deleteById(
    @Query() queryParam: QueryPointDto,
    @CurrentUser() user: TokenPayloadDto,
  ): Promise<void> {
    return await this.pointsUseCase.deletePointById(queryParam, user.id);
  }

  @Route({
    title: 'Edit that point',
    description: 'by id',
    roles: [RoleEnum.ADMIN, RoleEnum.MANAGER],
    method: HttpMethodEnum.PUT,
  })
  @ApiHeader({ name: 's-access-token', description: 'jwt token' })
  @ApiQuery({ name: 'id' })
  @ApiBody({ type: PointDto })
  public async editPoint(
    @Query() queryParam: QueryPointDto,
    @Body() body: PointDto,
    @CurrentUser() user: TokenPayloadDto,
  ): Promise<void> {
    return await this.pointsUseCase.editPointById(body, queryParam.id, user.id);
  }

  @Route({
    title: 'Update point working hours',
    description: 'Update and return new working hours of a point by its ID',
    roles: [RoleEnum.ADMIN, RoleEnum.MANAGER],
    method: HttpMethodEnum.PUT,
  })
  @ApiHeader({ name: 's-access-token', description: 'JWT token' })
  @ApiQuery({ name: 'id' })
  @ApiBody({ schema: { example: { newWorkingHours: '09:00-20:00' } } })
  public async updatePointWorkingHours(
    @Query('id') id: string,
    @Body('newWorkingHours') newWorkingHours: number,
  ): Promise<string> {
    return await this.pointsUseCase.updatePointWorkingHours(
      id,
      newWorkingHours,
    );
  }
}
