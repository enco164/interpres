import { Module } from "@nestjs/common";
import { ImportExportController } from "./import-export.controller";
import { ImportExportService } from "./import-export.service";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        name: "IMPORT_EXPORT_SERVICE",
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            port: +configService.get<string>("IMPORT_EXPORT_SERVICE_PORT"),
          },
        }),
      },
    ]),
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        name: "CORE_SERVICE",
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            port: +configService.get<string>("CORE_SERVICE_PORT"),
          },
        }),
      },
    ]),
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        name: "INTEGRATION_SERVICE",
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            port: +configService.get<string>("INTEGRATION_SERVICE_PORT"),
          },
        }),
      },
    ]),
  ],
  controllers: [ImportExportController],
  providers: [ImportExportService],
})
export class ImportExportModule {}
