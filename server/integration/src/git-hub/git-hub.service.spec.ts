import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { GitHubService } from "./git-hub.service";

describe("GitHubService", () => {
  let service: GitHubService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true })],
      providers: [GitHubService],
    }).compile();

    service = module.get<GitHubService>(GitHubService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
