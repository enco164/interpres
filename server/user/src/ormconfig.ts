import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const config: TypeOrmModuleOptions = {
  type: "postgres",
  host: process.env.IDENTITY_DB_HOST,
  port: +process.env.IDENTITY_DB_PORT,
  username: process.env.IDENTITY_DB_USERNAME,
  password: process.env.IDENTITY_DB_PASSWORD,
  database: process.env.IDENTITY_DB_DATABASE,

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
