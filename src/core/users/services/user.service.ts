import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'argon2';
import { RoleEnum } from 'src/shared/enums/user';
import { QueryParamSignUpDto, SingUpAuthDto } from 'src/api/auth/dtos';

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
      const userData = {
        ...payload,
        password,
        role: RoleEnum.MANAGER,
      };
      if (metaData.role == RoleEnum.EMPLOY) {
        userData.role = metaData.role;
      }
      const newUser = await this.userRepository.create(userData);
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
