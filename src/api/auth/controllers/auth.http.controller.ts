import { Body, Controller, Query } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Route } from 'src/shared/decorators';
import { HttpMethodEnum } from 'src/shared/enums/app';
import { AuthUseCase } from '../use-cases';
import {
  LogInAuthDto,
  QueryParamSignUpDto,
  SingUpAuthDto,
  TokenResponseDto,
} from '../dtos';

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
  @ApiBody({ type: SingUpAuthDto, description: 'data for sign up' })
  public async singUpUser(
    @Body() body: SingUpAuthDto,
    @Query() query: QueryParamSignUpDto,
  ): Promise<TokenResponseDto> {
    return this.authUseCase.createUser(body, query);
  }

  @Route({
    title: 'Login',
    description: 'Login by email and password',
    method: HttpMethodEnum.POST,
    path: 'login',
  })
  @ApiBody({ type: LogInAuthDto, description: 'email and password' })
  public async login(@Body() body: LogInAuthDto): Promise<TokenResponseDto> {
    return this.authUseCase.loginUser(body);
  }
}
