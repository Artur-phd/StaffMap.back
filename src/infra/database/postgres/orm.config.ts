import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { config } from "dotenv";
import { companyEntities } from "src/core/company";
import { ConfigLoaders, ConfigTypes } from "src/infra/app-config";
import { DataSource, DataSourceOptions } from "typeorm";
import { join } from "path";

export const ormConfig = (dbConfig: ConfigTypes.DatabaseConfigType | object,
): TypeOrmModuleOptions => {
    const migrationsDir = join(__dirname, 'migrations', '**/*.js');
    return {
        ...dbConfig,
        type: "postgres",
        logging: false,
        synchronize: false,
        migrations: [migrationsDir],
        entities: [
            ...companyEntities
        ],
        autoLoadEntities: true,
        migrationsRun: true
    };
};

config()

export default new DataSource(
    ormConfig(ConfigLoaders.databaseLoader()) as DataSourceOptions,
)
