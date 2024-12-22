import { Injectable } from '@nestjs/common';
import { StaffService } from 'src/core/product/services';
import { TokenPayloadDto } from 'src/shared/dtos';

@Injectable()
export class StaffUseCase {
  constructor(private readonly staffService: StaffService) {}

  public async getStaff(user: TokenPayloadDto) {
    return await this.staffService.getAllMyStaff(user.id);
  }
}
