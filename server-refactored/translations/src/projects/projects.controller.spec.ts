import { Test, TestingModule } from "@nestjs/testing";
import { ImportExportService } from "../import-export/import-export.service";
import { TranslationRepository } from "../translations/translation.repository";
import { TranslationsService } from "../translations/translations.service";
import { repositoryMockFactory } from "../util/testing";
import { ProjectRepository } from "./project.repository";
import { ProjectsController } from "./projects.controller";
import { ProjectsService } from "./projects.service";

describe("ProjectsController", () => {
  let controller: ProjectsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [
        ProjectsService,
        ImportExportService,
        TranslationsService,
        { provide: ProjectRepository, useFactory: repositoryMockFactory },
        { provide: TranslationRepository, useFactory: repositoryMockFactory },
      ],
    }).compile();

    controller = module.get<ProjectsController>(ProjectsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
