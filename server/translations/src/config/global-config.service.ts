import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { config as configDotEnv } from "dotenv";

configDotEnv({ path: "../../../../.env" });

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue("PORT", true);
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: "postgres",

      host: this.getValue("TRANSLATIONS_DB_HOST"),
      port: parseInt(this.getValue("TRANSLATIONS_DB_PORT")),
      username: this.getValue("TRANSLATIONS_DB_USERNAME"),
      password: this.getValue("TRANSLATIONS_DB_PASSWORD"),
      database: this.getValue("TRANSLATIONS_DB_DATABASE"),

      entities: ["apps/translations/**/*.entity{.ts,.js}"],

      migrationsTableName: "migration",

      migrations: ["apps/translations/src/migration/*.ts"],

      cli: {
        migrationsDir: "apps/translations/src/migration",
      },

      // autoLoadEntities: true,
      // synchronize: true,
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  "TRANSLATIONS_DB_HOST",
  "TRANSLATIONS_DB_PORT",
  "TRANSLATIONS_DB_USERNAME",
  "TRANSLATIONS_DB_PASSWORD",
  "TRANSLATIONS_DB_DATABASE",
]);

export { configService };
