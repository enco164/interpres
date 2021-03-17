import { Test, TestingModule } from "@nestjs/testing";
import { ImportExportService } from "../import-export/import-export.service";
import { TranslationRepository } from "../translations/translation.repository";
import { TranslationsService } from "../translations/translations.service";
import { repositoryMockFactory } from "../util/testing";
import { ProjectRepository } from "./project.repository";
import { ProjectsService } from "./projects.service";

describe("ProjectsService", () => {
  let service: ProjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsService,
        TranslationsService,
        ImportExportService,
        { provide: ProjectRepository, useFactory: repositoryMockFactory },
        { provide: TranslationRepository, useFactory: repositoryMockFactory },
      ],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
