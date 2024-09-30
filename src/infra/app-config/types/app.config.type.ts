import { AppEnums } from "src/shared/enums";

export type AppConfigType = {
  version: string;
  port: number;
  enviroment: AppEnums.EnviromentEnum;
  baseUrl: string;
  jwtSecret: string;
  cryptoSecret: string;
  geoBaseUrl: string;
  notifyManagerEmail: string;
};