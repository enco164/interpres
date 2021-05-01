import { Test, TestingModule } from "@nestjs/testing";
import { ProjectsService } from "./projects.service";
import { ClientProxyFactory } from "@nestjs/microservices";

describe("ProjectsService", () => {
  let service: ProjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsService,
        {
          provide: "CORE_SERVICE",
          useFactory: () => ClientProxyFactory.create({}),
        },
      ],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
