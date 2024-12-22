import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/api/auth/decorators';
import { Route } from 'src/shared/decorators';
import { TokenPayloadDto } from 'src/shared/dtos';
import { HttpMethodEnum } from 'src/shared/enums/app';
import { RoleEnum } from 'src/shared/enums/user';
import { StaffUseCase } from '../use-cases';

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
}
