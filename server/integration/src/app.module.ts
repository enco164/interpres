import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { GitHubModule } from "./git-hub/git-hub.module";

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), GitHubModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
