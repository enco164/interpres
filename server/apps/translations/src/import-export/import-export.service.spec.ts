import { Test, TestingModule } from '@nestjs/testing';
import { Project } from '../projects/entities/project.entity';
import { Translation } from '../translations/entities/translation.entity';
import { ImportExportService } from './import-export.service';

describe('ImportExportService', () => {
  let service: ImportExportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImportExportService],
    }).compile();

    service = module.get<ImportExportService>(ImportExportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return Array<{key: string, value: string}> from object', () => {
    const testObject = {
      key: 'value',
      key2: {
        key3: { key4: 'value 4' },
        key5: 'value 5',
      },
    };

    const result = service.importFile(testObject);

    expect(result).toEqual([
      { key: 'key', value: 'value' },
      { key: 'key2.key3.key4', value: 'value 4' },
      { key: 'key2.key5', value: 'value 5' },
    ]);
  });

  it('should build JSON tree from translations', () => {
    const project = new Project();
    const translations: Translation[] = [
      {
        id: 1,
        key: 'key',
        value: 'value',
        lang: 'en',
        projectId: 1,
        project: Promise.resolve(project),
        namespace: 'ns1',
      },
      {
        id: 2,
        key: 'key1.key2',
        value: 'value2',
        lang: 'en',
        projectId: 1,
        project: Promise.resolve(project),
        namespace: 'ns1',
      },
      {
        id: 3,
        key: 'key1.key3',
        value: 'value3',
        lang: 'en',
        projectId: 1,
        project: Promise.resolve(project),
        namespace: 'ns1',
      },
    ];
    const result = service.buildJsonTreeFromTranslations(translations);
    expect(result).toEqual({
      key: 'value',
      key1: {
        key2: 'value2',
        key3: 'value3',
      },
    });
  });
});
