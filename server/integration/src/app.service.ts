import { HttpService, Injectable } from "@nestjs/common";
import { GitHubService } from "./git-hub/git-hub.service";

@Injectable()
export class AppService {
  constructor(
    private readonly http: HttpService,
    private readonly githubService: GitHubService
  ) {}

  testConnection(data: {
    name: string;
    githubOwner: string;
    githubRepo: string;
    lngLoadPath: string;
  }) {
    return this.githubService.testConnection(data);
  }

  getHello(): string {
    return "Hello World!";
  }
}
