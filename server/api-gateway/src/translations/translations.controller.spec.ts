import { Test, TestingModule } from "@nestjs/testing";
import { TranslationsController } from "./translations.controller";
import { TranslationsService } from "./translations.service";
import { ClientProxyFactory } from "@nestjs/microservices";

describe("TranslationsController", () => {
  let controller: TranslationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TranslationsController],
      providers: [
        TranslationsService,
        {
          provide: "CORE_SERVICE",
          useFactory: () => ClientProxyFactory.create({}),
        },
      ],
    }).compile();

    controller = module.get<TranslationsController>(TranslationsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
