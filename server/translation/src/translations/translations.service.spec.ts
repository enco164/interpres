import { Test, TestingModule } from '@nestjs/testing';
import { ProjectRepository } from '../projects/project.repository';
import { repositoryMockFactory } from '../util/testing';
import { TranslationRepository } from './translation.repository';
import { TranslationsService } from './translations.service';

describe('TranslationsService', () => {
  let service: TranslationsService;
  let translationRepository: TranslationRepository;
  let projectRepository: ProjectRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<TranslationsService>(TranslationsService);
    translationRepository = module.get(TranslationRepository);
    projectRepository = module.get(ProjectRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(translationRepository).toBeDefined();
    expect(projectRepository).toBeDefined();
  });
});
