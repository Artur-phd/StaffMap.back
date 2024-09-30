import { registerAs } from '@nestjs/config';
import { AppEnums } from 'src/shared/enums';
import { ConfigTypes } from '..';

export const appLoader = registerAs(
  AppEnums.ConfigTypeEnum.APP,
  (): ConfigTypes.AppConfigType => ({
    version: process.env.npm_package_version,
    port: Number(process.env.APP_PORT),
    enviroment: process.env.NODE_ENV as AppEnums.EnviromentEnum,
    baseUrl: process.env.BASE_URL,
    jwtSecret: process.env.JWT_SECRET,
    cryptoSecret: process.env.CRYPTO_SECRET,
    geoBaseUrl: process.env.GEO_BASE_URL,
    notifyManagerEmail: process.env.NOTIFY_MANAGER_EMAIL,
  }),
);
