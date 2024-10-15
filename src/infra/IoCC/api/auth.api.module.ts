import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { authControllers, authImports, authProviders } from 'src/api/auth';
import { AppConfigType } from 'src/infra/app-config/types';
import { AppEnums } from 'src/shared/enums';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        const { jwtSecret: secret } = configService.getOrThrow<AppConfigType>(
          AppEnums.ConfigTypeEnum.APP,
        );
        return {
          secret,
          signOptions: { expiresIn: '30d' },
        };
      },
      inject: [ConfigService],
      global: true,
    }),
    ...authImports,
  ],
  controllers: authControllers,
  providers: authProviders,
})
export class AuthApiModule {}
