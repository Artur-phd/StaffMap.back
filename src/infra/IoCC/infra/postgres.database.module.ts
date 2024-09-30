import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { ormConfig } from '../../database/postgres/orm.config';
import { ConfigTypes } from 'src/infra/app-config';
import { AppEnums } from 'src/shared/enums';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) =>
        ormConfig(
          configService.get<ConfigTypes.DatabaseConfigType>(
            AppEnums.ConfigTypeEnum.DATABASE,
          ),
        ),
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }

        return addTransactionalDataSource(new DataSource(options));
      },
      inject: [ConfigService],
    }),
  ],
})
export class PostgresDatabaseModule {}
