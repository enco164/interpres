import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const config: TypeOrmModuleOptions = {
  type: "postgres",
  host: process.env.TRANSLATIONS_DB_HOST,
  port: +process.env.TRANSLATIONS_DB_PORT,
  username: process.env.TRANSLATIONS_DB_USERNAME,
  password: process.env.TRANSLATIONS_DB_PASSWORD,
  database: process.env.TRANSLATIONS_DB_DATABASE,

  entities: [__dirname + "/**/*.entity{.ts,.js}"],
  migrationsTableName: "migrations",
  migrations: [__dirname + "/migrations/**/*{.ts,.js}"],
  cli: {
    migrationsDir: "src/migrations",
  },
  synchronize: false,
  migrationsRun: true,
  logging: true,
  logger: "file",
};
