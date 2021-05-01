import { Test, TestingModule } from "@nestjs/testing";
import { TranslationsService } from "./translations.service";
import { ClientProxyFactory } from "@nestjs/microservices";

describe("TranslationsService", () => {
  let service: TranslationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TranslationsService,
        {
          provide: "CORE_SERVICE",
          useFactory: () => ClientProxyFactory.create({}),
        },
      ],
    }).compile();

    service = module.get<TranslationsService>(TranslationsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
