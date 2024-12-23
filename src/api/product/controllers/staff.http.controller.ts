import { Body, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/api/auth/decorators';
import { Route } from 'src/shared/decorators';
import { TokenPayloadDto } from 'src/shared/dtos';
import { HttpMethodEnum } from 'src/shared/enums/app';
import { RoleEnum } from 'src/shared/enums/user';
import { StaffUseCase } from '../use-cases';
import { StaffFineDto } from '../dtos';

@ApiTags('staff')
@Controller('staff')
export class StaffHttpController {
  constructor(private readonly staffUseCase: StaffUseCase) {}

  @Route({
    method: HttpMethodEnum.GET,
    title: 'Get all my staff',
    roles: [RoleEnum.MANAGER],
  })
  public async getMyStaff(@CurrentUser() user: TokenPayloadDto) {
    return await this.staffUseCase.getStaff(user);
  }

  @Route({
    path: 'transaction_inside',
    method: HttpMethodEnum.POST,
    title: 'fine for employe',
    roles: [RoleEnum.MANAGER],
  })
  public async fineForEmploye(
    @Body() body: StaffFineDto,
    @CurrentUser() user: TokenPayloadDto,
  ) {
    return await this.staffUseCase.sendFineForEmploy({
      ...body,
      senderId: user.id,
    });
  }
}
