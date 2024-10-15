import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/core/users/services';
import { Transactional } from 'typeorm-transactional';
import { JwtHelper } from '../helpers/jwt.helpers';
import { LogInAuthDto, SingUpAuthDto, TokenResponseDto } from '../dtos';
import { verify } from 'argon2';

@Injectable()
export class AuthUseCase {
  constructor(
    private readonly userService: UserService,
    private readonly jwtHelper: JwtHelper,
  ) {}

  @Transactional()
  public async createUser(payload: SingUpAuthDto): Promise<TokenResponseDto> {
    const { email } = payload;
    const userIsActivated = await this.userService.findByEmail(email);
    if (userIsActivated) {
      throw new BadRequestException('Пользователь уже существует');
    }
    await this.userService.createUser(payload);
    const token = await this.jwtHelper.create(
      await this.userService.findByEmail(email),
    );
    return { token };
  }

  @Transactional()
  public async loginUser(payload: LogInAuthDto): Promise<TokenResponseDto> {
    const { email, password } = payload;
    const userIsActive = await this.userService.findByEmail(email);
    if (!userIsActive) {
      throw new BadRequestException('Неверный логин или пароль');
    }
    if (await verify(userIsActive.password, password)) {
      const token = await this.jwtHelper.create(userIsActive);
      return { token };
    } else {
      throw new BadRequestException('Неверный логин или пароль');
    }
  }
}
