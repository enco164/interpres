import { BaseApiClient, JSONApiResponse } from '../core/api';
import { Translation } from '../domain/translation';
import { readJsonFile } from '../util';
import { ExportTranslationsDto } from './dto/export-translations.dto';
import { ImportTranslationsDto } from './dto/import-translations.dto';

const BASE_URL = '/api/translation-service';

class ImportExportApiClient extends BaseApiClient {
  async importTranslations(param: ImportTranslationsDto, init?: RequestInit) {
    if (!param.file) {
      throw new Error('Missing file');
    }
    const parsedJsonFile = await readJsonFile(param.file);

    const response = await this.fetchApi(
      `${BASE_URL}/projects/${param.projectId}/import`,
      {
        ...init,
        method: 'POST',
        body: JSON.stringify({ ...param, file: parsedJsonFile }),
      },
    );
    return new JSONApiResponse<Translation[]>(response).value();
  }

  async exportTranslations(param: ExportTranslationsDto, init?: RequestInit) {
    const response = await this.fetchApi(
      `${BASE_URL}/projects/${param.projectId}/export`,
      init,
    );
    return new JSONApiResponse(response).value();
  }
}

export const ImportExportApi = new ImportExportApiClient();
