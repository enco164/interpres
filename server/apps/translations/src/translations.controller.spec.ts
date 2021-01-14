import { Test, TestingModule } from '@nestjs/testing';
import { TranslationsController } from './translations.controller';
import { TranslationsService } from './translations.service';

describe('TranslationsController', () => {
  let translationsController: TranslationsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TranslationsController],
      providers: [TranslationsService],
    }).compile();

    translationsController = app.get<TranslationsController>(TranslationsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(translationsController.getHello()).toBe('Hello World!');
    });
  });
});
