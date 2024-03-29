import { Module } from "@nestjs/common";
import { ProjectsController } from "./projects.controller";
import { ProjectsService } from "./projects.service";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        name: "INTEGRATION_SERVICE",
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>("INTEGRATION_SERVICE_HOST"),
            port: +configService.get<string>("INTEGRATION_SERVICE_PORT"),
          },
        }),
      },
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        name: "CORE_SERVICE",
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>("CORE_SERVICE_HOST"),
            port: +configService.get<string>("CORE_SERVICE_PORT"),
          },
        }),
      },
    ]),
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
