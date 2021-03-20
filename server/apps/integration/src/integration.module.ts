import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { IntegrationController } from "./integration.controller";
import { IntegrationService } from "./integration.service";
import { GitHubModule } from "./git-hub/git-hub.module";

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), GitHubModule],
  controllers: [IntegrationController],
  providers: [IntegrationService],
})
export class IntegrationModule {}
