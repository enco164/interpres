import { Test, TestingModule } from "@nestjs/testing";
import { ImportExportController } from "./import-export.controller";
import { ImportExportService } from "./import-export.service";
import { ClientProxyFactory } from "@nestjs/microservices";

describe("ImportExportController", () => {
  let controller: ImportExportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImportExportController],
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

    controller = module.get<ImportExportController>(ImportExportController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
