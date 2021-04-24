import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { GithubAuthGuard } from "./auth/github-auth.guard";
import { UserModule } from "./user/user.module";

@Module({
  imports: [AuthModule, ConfigModule.forRoot({ isGlobal: true }), UserModule],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: GithubAuthGuard }],
})
export class AppModule {}
