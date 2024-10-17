import { Body, Controller, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ConsultationUseCase } from '../use-cases';
import { Route } from 'src/shared/decorators';
import { HttpMethodEnum } from 'src/shared/enums/app';
import { ConsultationDto, DeleteOrderConsultationDto } from '../dtos';
import { ConsultationEntity } from 'src/core/company/entities';
import { ResponseDto } from 'src/shared/dtos';

@ApiTags('consultation')
@Controller('consultation')
export class ConsultationHttpController {
  constructor(private readonly consultationUseCase: ConsultationUseCase) {}

  @Route({
    title: 'Add new order',
    description: 'New order for consultation',
    method: HttpMethodEnum.POST,
  })
  public async addNewOrder(@Body() body: ConsultationDto) {
    return await this.consultationUseCase.createNewOrder(body);
  }

  @Route({
    title: 'Get all orders',
    description: 'Get all orders for call',
    method: HttpMethodEnum.GET,
  })
  public async getAllOrders(): Promise<ResponseDto<ConsultationEntity[]>> {
    return { data: await this.consultationUseCase.getAllOrders() };
  }

  @Route({
    title: 'Delete order',
    description: 'Delete by id',
    method: HttpMethodEnum.DELETE,
  })
  public async deleteOrderById(
    @Query() queryParams: DeleteOrderConsultationDto,
  ) {
    return await this.consultationUseCase.deleteOrderById(queryParams.id);
  }
}
