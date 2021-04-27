import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UserManagementModule } from "./user-management/user-management.module";

@Module({
  imports: [AuthModule, ConfigModule.forRoot({ isGlobal: true }), UserManagementModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
