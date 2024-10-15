import { CompanyCoreModule } from 'src/infra/IoCC/core/company.core.module';
import { CreateUserHttpController } from './controllers/auth.http.controller';
import { AuthUseCase } from './use-cases';
import { JwtHelper } from './helpers/jwt.helpers';
import { JwtGuard } from './guards';
import { JwtStrategy } from './strategies/strategy.jwt';
import { UserCoreModule } from 'src/infra/IoCC/core/user.core.module';

export const authControllers = [CreateUserHttpController];

export const authProviders = [AuthUseCase, JwtHelper, JwtGuard, JwtStrategy];

export const authImports = [CompanyCoreModule, UserCoreModule];
