import { Test, TestingModule } from '@nestjs/testing';
import { ProjectRepository } from '../projects/project.repository';
import { repositoryMockFactory } from '../util/testing';
import { TranslationRepository } from './translation.repository';
import { TranslationsController } from './translations.controller';
import { TranslationsService } from './translations.service';

describe('TranslationsController', () => {
  let controller: TranslationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TranslationsController],
      providers: [
        TranslationsService,
        {
          provide: TranslationRepository,
          useFactory: repositoryMockFactory,
        },
        {
          provide: ProjectRepository,
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    controller = module.get<TranslationsController>(TranslationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
