import { Controller, Logger } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { AppService } from "./app.service";
import { ExportTranslationsToRepo } from "./git-hub/dto/export-translations-to-repo";
import { ImportTranslationsFromRepoParam } from "./git-hub/dto/import-translations-from-repo-param";
import { GitHubService } from "./git-hub/git-hub.service";

const logger = new Logger("AppController");

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly githubService: GitHubService
  ) {}

  @MessagePattern({ cmd: "import" })
  importFromRepo(data: ImportTranslationsFromRepoParam) {
    logger.log(`CMD[import] ${JSON.stringify(data)}`);
    return this.githubService.importTranslationsFromRepo(data);
  }

  @MessagePattern({ cmd: "export" })
  exportToRepo(data: ExportTranslationsToRepo) {
    logger.log(`CMD[export] ${JSON.stringify(data)}`);
    return this.githubService.exportTranslationsToRepo(data);
  }
}
