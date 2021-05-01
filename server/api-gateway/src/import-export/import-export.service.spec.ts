import { Test, TestingModule } from "@nestjs/testing";
import { ImportExportService } from "./import-export.service";
import { ClientProxyFactory } from "@nestjs/microservices";

describe("ImportExportService", () => {
  let service: ImportExportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ImportExportService,
        {
          provide: "IMPORT_EXPORT_SERVICE",
          useFactory: () => ClientProxyFactory.create({}),
        },
        {
          provide: "CORE_SERVICE",
          useFactory: () => ClientProxyFactory.create({}),
        },
        {
          provide: "INTEGRATION_SERVICE",
          useFactory: () => ClientProxyFactory.create({}),
        },
      ],
    }).compile();

    service = module.get<ImportExportService>(ImportExportService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
