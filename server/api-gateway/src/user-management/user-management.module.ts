import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { UserManagementService } from "./user-management.service";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: "USER_MANAGEMENT_SERVICE",
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {
          return {
            transport: Transport.TCP,
            options: {
              host: configService.get<string>("USER_MANAGEMENT_SERVICE_HOST"),
              port: +configService.get<string>("USER_MANAGEMENT_SERVICE_PORT"),
            },
          };
        },
      },
    ]),
  ],
  providers: [UserManagementService],
  exports: [UserManagementService],
})
export class UserManagementModule {}
