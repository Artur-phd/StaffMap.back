import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StaffEntity, TransactionsEntity } from '../entities';
import { UserEntity } from 'src/core/users/entity';
import { Transactional } from 'typeorm-transactional';
import { RoleEnum } from 'src/shared/enums/user';
import { TransactionTypes } from 'src/shared/enums/app';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(StaffEntity)
    private readonly staffRepository: Repository<StaffEntity>,
    @InjectRepository(TransactionsEntity)
    private readonly transactionsRepository: Repository<TransactionsEntity>,
  ) {}

  public async createEmploy(user: UserEntity, inviter): Promise<void> {
    const newEmployee = this.staffRepository.create({
      user,
      manager: inviter,
    });
    await this.staffRepository.insert(newEmployee);
  }

  public async getAllMyStaff(
    id,
    { take, skip },
  ): Promise<[StaffEntity[], number]> {
    return await this.staffRepository.findAndCount({
      relations: { user: true },
      where: { manager: { id } },
      select: {
        id: true,
        user: {
          firstName: true,
          lastName: true,
        },
        balance: true,
        moneyNow: true,
      },
      take,
      skip,
    });
  }

  private async getStaffOneById(id): Promise<StaffEntity> {
    try {
      return await this.staffRepository.findOne({
        relations: { user: true, manager: true },
        where: { user: { id } },
      });
    } catch {
      throw new HttpException('error, maybe some property is incorrect', 400);
    }
  }

  @Transactional()
  public async sendFineForOneStaff(payload): Promise<void> {
    const employData = await this.getStaffOneById(payload.recipientUserId);
    const jobForUpdate = {
      where: { user: { id: payload.recipientUserId } },
      job: { balance: employData.balance + payload.size },
    };

    if (payload.type === TransactionTypes.FINE) {
      jobForUpdate.job = { balance: employData.balance - payload.size };
    }

    if (
      employData.user.role == RoleEnum.EMPLOY &&
      employData.manager.role == RoleEnum.MANAGER &&
      employData.manager.id == payload.senderId
    ) {
      const transaction = this.transactionsRepository.create(payload);
      await this.transactionsRepository.insert(transaction);
      await this.staffRepository.update(jobForUpdate.where, jobForUpdate.job);
    } else {
      throw new HttpException('error, maybe some property is incorrect', 400);
    }
  }

  public async choicePointForNow(payload): Promise<void> {
    const employData = await this.getStaffOneById(payload.recipientUserId);
    await this.staffRepository.update(
      { id: employData.id },
      { pointNowId: payload.pointId },
    );
  }
}
