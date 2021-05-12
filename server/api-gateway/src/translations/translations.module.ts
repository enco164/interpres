import { Module } from "@nestjs/common";
import { TranslationsController } from "./translations.controller";
import { TranslationsService } from "./translations.service";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    ClientsModule.registerAsync([
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
  controllers: [TranslationsController],
  providers: [TranslationsService],
})
export class TranslationsModule {}
