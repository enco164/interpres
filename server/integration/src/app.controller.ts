import { Controller, Get, Logger, Query } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { AppService } from "./app.service";
import { GitHubService } from "./git-hub/git-hub.service";

const logger = new Logger("AppController");

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly githubService: GitHubService
  ) {}

  @Get("/import")
  importTranslationsFromRepo(
    @Query("owner") owner: string,
    @Query("repo") repo: string,
    @Query("translations-load-path") translationsLoadPath: string
  ) {
    logger.log(
      `GET /import?owner=${owner}&repo=${repo}&translations-load-path=${translationsLoadPath}`
    );

    return this.githubService.importTranslationsFromRepo({
      owner,
      repo,
      translationsLoadPath,
    });
  }

  @MessagePattern({ cmd: "import" })
  accumulate(data: {
    owner: string;
    repo: string;
    translationsLoadPath: string;
  }) {
    logger.log(`CMD[import] ${JSON.stringify(data)}`);
    return this.githubService.importTranslationsFromRepo(data);
  }
}
