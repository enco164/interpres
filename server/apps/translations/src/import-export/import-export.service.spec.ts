import { Test, TestingModule } from '@nestjs/testing';
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
});
