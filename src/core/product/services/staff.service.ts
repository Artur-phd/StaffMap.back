import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StaffEntity } from '../entities';
import { UserEntity } from 'src/core/users/entity';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(StaffEntity)
    private readonly staffRepository: Repository<StaffEntity>,
  ) {}

  public async createEmploy(user: UserEntity, inviter): Promise<void> {
    const newEmployee = this.staffRepository.create({
      user,
      manager: inviter,
    });
    await this.staffRepository.insert(newEmployee);
  }

  public async getAllMyStaff(id): Promise<StaffEntity[]> {
    console.log(id);
    return await this.staffRepository.find({
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
    });
  }
}
