import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const config: TypeOrmModuleOptions = {
  type: "postgres",
  host: process.env.CORE_SERVICE_DB_HOST,
  port: +process.env.CORE_SERVICE_DB_PORT,
  username: process.env.CORE_SERVICE_DB_USERNAME,
  password: process.env.CORE_SERVICE_DB_PASSWORD,
  database: process.env.CORE_SERVICE_DB_DATABASE,

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
