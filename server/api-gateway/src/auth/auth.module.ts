import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UserManagementModule } from "../user-management/user-management.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { GithubStrategy } from "./github.strategy";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports: [
    UserManagementModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, GithubStrategy, JwtStrategy],
})
export class AuthModule {}
