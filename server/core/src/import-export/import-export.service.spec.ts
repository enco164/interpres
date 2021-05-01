import { ClientProxyFactory } from "@nestjs/microservices";
import { Test, TestingModule } from "@nestjs/testing";
import { ProjectRepository } from "../projects/project.repository";
import { ProjectsService } from "../projects/projects.service";
import { TranslationRepository } from "../translations/translation.repository";
import { TranslationsService } from "../translations/translations.service";
import { ImportExportService } from "./import-export.service";
import { TranslationDTO } from "../translations/dto/translation.dto";

describe("ImportExportService", () => {
  let service: ImportExportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ImportExportService,
        ProjectsService,
        ProjectRepository,
        TranslationsService,
        TranslationRepository,
        {
          provide: "INTEGRATION_SERVICE",
          useFactory: () => ClientProxyFactory.create({}),
        },
        {
          provide: "IMPORT_EXPORT_SERVICE",
          useFactory: () => ClientProxyFactory.create({}),
        },
        {
          provide: "CORE_SERVICE",
          useFactory: () => ClientProxyFactory.create({}),
        },
      ],
    }).compile();

    service = module.get<ImportExportService>(ImportExportService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return Array<{key: string, value: string}> from object", () => {
    const testObject = {
      key: "value",
      key2: {
        key3: { key4: "value 4" },
        key5: "value 5",
      },
    };

    const result = service.getKeyValues(testObject);

    expect(result).toEqual([
      { key: "key", value: "value" },
      { key: "key2.key3.key4", value: "value 4" },
      { key: "key2.key5", value: "value 5" },
    ]);
  });

  it("should build JSON tree from translations", () => {
    const translations: TranslationDTO[] = [
      TranslationDTO.from({
        id: "1",
        key: "key",
        value: "value",
        lang: "en",
        projectId: "1",
        namespace: "ns1",
      }),
      TranslationDTO.from({
        id: "2",
        key: "key1.key2",
        value: "value2",
        lang: "en",
        projectId: "1",
        namespace: "ns1",
      }),
      TranslationDTO.from({
        id: "3",
        key: "key1.key3",
        value: "value3",
        lang: "en",
        projectId: "1",
        namespace: "ns1",
      }),
    ];
    const result = service.buildJsonTreeFromTranslations(translations);
    expect(result).toEqual({
      key: "value",
      key1: {
        key2: "value2",
        key3: "value3",
      },
    });
  });
});
