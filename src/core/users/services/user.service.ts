import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'argon2';

import { addMonths } from 'date-fns';

import { RoleEnum } from 'src/shared/enums/user';
import { QueryParamSignUpDto, SingUpAuthDto } from 'src/api/auth/dtos';
import { UserEnums } from 'src/shared/enums';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async createUser(
    payload: SingUpAuthDto,
    metaData: QueryParamSignUpDto,
  ): Promise<boolean> {
    try {
      const password = await hash(payload.password);

      const createdAt = new Date();
      const newUser = await this.userRepository.create({
        ...payload,
        password,
        role: UserEnums.RoleEnum.MANAGER,
        createdAt: createdAt,
        trailEnd: addMonths(createdAt, 2),
      });
      const userData = {
        ...payload,
        password,
        role: RoleEnum.MANAGER,
      };
      if (metaData.role == RoleEnum.EMPLOY) {
        userData.role = metaData.role;
      }
      await this.userRepository.insert(newUser);
      return true;
    } catch {
      throw new BadRequestException(
        'Error creating a new user, please try again later',
      );
    }
  }

  public async findById(id: string): Promise<UserEntity> | null {
    return await this.userRepository.findOne({ where: { id } });
  }

  public async findByEmail(email: string): Promise<UserEntity> | null {
    return await this.userRepository.findOne({ where: { email } });
  }
}
