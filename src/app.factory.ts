import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigTypes } from './infra/app-config';
import { AppEnums } from './shared/enums';

export class AppFactory {
  private readonly configService: ConfigService;
  private readonly bootstrapMessage = ({ port, enviroment, version }) =>
    `🗺👨🏿‍💻 StaffMap app started on ${port} port. Version - ${version}. Environment - ${enviroment}`;
  public static logger = console;
  private readonly DEV_DOC_PASS = 'q1w2e3r4';

  constructor(private readonly _app: INestApplication) {
    this.configService = this._app.get(ConfigService);
    this._app.setGlobalPrefix('api');
  }

  get app() {
    return this._app;
  }

  public useCors() {
    this.app.enableCors();
    return this;
  }

  public useGlobalPipes() {
    this.app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    );
    return this;
  }

  public async listen() {
    const appConfigs = this.configService.getOrThrow(
      AppEnums.ConfigTypeEnum.APP,
    ) as ConfigTypes.AppConfigType;

    await this._app.listen(appConfigs.port, () =>
      AppFactory.logger.log(this.bootstrapMessage(appConfigs)),
    );
  }
}
