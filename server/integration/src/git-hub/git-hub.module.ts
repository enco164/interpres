import { HttpModule, Module } from "@nestjs/common";

import { GitHubService } from "./git-hub.service";

@Module({
  imports: [HttpModule],
  providers: [GitHubService],
  exports: [GitHubService],
})
export class GitHubModule {}
