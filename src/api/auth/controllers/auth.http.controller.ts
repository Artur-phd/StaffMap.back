import { Body, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Route } from 'src/shared/decorators';
import { HttpMethodEnum } from 'src/shared/enums/app';
import { AuthUseCase } from '../use-cases';
import { LogInAuthDto, SingUpAuthDto, TokenResponseDto } from '../dtos';

@ApiTags('auth')
@Controller('auth')
export class CreateUserHttpController {
  constructor(private readonly authUseCase: AuthUseCase) {}

  @Route({
    title: 'Crete new user',
    description: 'Sing up for simple users',
    method: HttpMethodEnum.POST,
    path: 'sing-up',
  })
  public async singUpUser(
    @Body() body: SingUpAuthDto,
  ): Promise<TokenResponseDto> {
    return this.authUseCase.createUser(body);
  }

  @Route({
    title: 'Login',
    description: 'Login by email and password',
    method: HttpMethodEnum.POST,
    path: 'login',
  })
  public async login(@Body() body: LogInAuthDto): Promise<TokenResponseDto> {
    return this.authUseCase.loginUser(body);
  }
}
