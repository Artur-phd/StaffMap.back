import { HttpException, Injectable } from '@nestjs/common';
import { StaffService } from 'src/core/product/services';
import { UserService } from 'src/core/users/services';
import { PaginationQueryDto, TokenPayloadDto } from 'src/shared/dtos';
import { RoleEnum } from 'src/shared/enums/user';
import {
  getPaginationByQuery,
  getPaginationMetadata,
} from 'src/shared/utils/get-pagination-by-query.util';

@Injectable()
export class StaffUseCase {
  constructor(
    private readonly staffService: StaffService,
    private readonly userService: UserService,
  ) {}

  public async getStaff(
    user: TokenPayloadDto,
    { limit, page }: PaginationQueryDto,
  ) {
    const pagination = getPaginationByQuery({ limit, page });

    const [staff, total] = await this.staffService.getAllMyStaff(
      user.id,
      pagination,
    );
    return {
      data: staff,
      metadata: getPaginationMetadata({ limit, page }, total),
    };
  }

  public async sendFineForEmploy(payload) {
    const userRecipient = await this.userService.findById(
      payload.recipientUserId,
    );
    if (!userRecipient) {
      throw new HttpException('USER NOT EXIST', 400);
    }
    if (userRecipient.role === RoleEnum.EMPLOY) {
      return await this.staffService.sendFineForOneStaff(payload);
    }
  }

  public async choicePointFromStaff(payload) {
    if (payload.role === RoleEnum.EMPLOY) {
      return await this.staffService.choicePointForNow(payload);
    }
  }
}
