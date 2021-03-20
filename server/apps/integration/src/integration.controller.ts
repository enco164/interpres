import { Controller, Get } from "@nestjs/common";
import { GitHubService } from "./git-hub/git-hub.service";
import { IntegrationService } from "./integration.service";

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

  @Get("/installation-access-token")
  getRepoInstallationAccessToken() {
    // return this.githubService.getRemoteJSONFile(
    //   "enco164",
    //   "interpres",
    //   "client/public/locales/en/common.json"
    // );
    //
    // return this.githubService.createRemoteBranch(
    //   "enco164",
    //   "interpres",
    //   "test-interpres-bot"
    // );
    //
    return this.githubService.commitUpdatedFile({
      owner: "enco164",
      repo: "interpres",
      filePath: "client/public/locales/en/common.json",
      branchName: "test-interpres-bot",
      fileContent: `{
      "recent_projects_header": "Your Interpres projects TEST TEST",
      "new_project_button": "Add project",
      "create_project_button": "Create project",
      "project_name_input_label": "Project Name"
    }`,
    });
    //
    // return this.githubService.createPullRequest({
    //   owner: "enco164",
    //   repo: "interpres",
    //   branchName: "test-interpres-bot",
    // });
  }
}
