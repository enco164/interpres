import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { UserManagementService } from "./user-management.service";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "USER_MANAGEMENT_SERVICE",
        transport: Transport.TCP,
        options: { port: 8085 },
      },
    ]),
  ],
  providers: [UserManagementService],
  exports: [UserManagementService],
})
export class UserManagementModule {}
