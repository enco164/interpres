import { Controller, Get, Logger, Query } from "@nestjs/common";
import { GitHubService } from "./git-hub/git-hub.service";
import { IntegrationService } from "./integration.service";

const logger = new Logger("IntegrationController");

@Controller()
export class IntegrationController {
  constructor(
    private readonly integrationService: IntegrationService,
    private readonly githubService: GitHubService
  ) {}

  @Get()
  getHello(): string {
    return this.integrationService.getHello();
  }

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
}
