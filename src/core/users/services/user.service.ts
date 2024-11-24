import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEnums } from 'src/shared/enums';
import { hash } from 'argon2';
import { SingUpAuthDto } from 'src/api/auth/dtos';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async createUser(payload: SingUpAuthDto): Promise<boolean> {
    try {
      const password = await hash(payload.password);
      const newUser = await this.userRepository.create({
        ...payload,
        password,
        role: UserEnums.RoleEnum.MANAGER,
      });
      await this.userRepository.insert(newUser);
      return true;
    } catch {
      throw new BadRequestException(
        'Ошибка при создании пользователя - повторите позже',
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
