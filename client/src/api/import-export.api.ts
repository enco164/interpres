import { BaseApiClient, JSONApiResponse } from '../core/api';
import { toBase64 } from '../util';
import { ImportTranslationsDto } from './dto/import-translations.dto';

const BASE_URL = '/api/translation-service';

class ImportExportApiClient extends BaseApiClient {
  async importTranslations(param: ImportTranslationsDto, init?: RequestInit) {
    if (!param.file) {
      throw new Error('Missing file');
    }
    const fileBase64 = await toBase64(param.file);

    const response = await this.fetchApi(`${BASE_URL}/import`, {
      ...init,
      method: 'POST',
      body: JSON.stringify({ ...param, file: fileBase64 }),
    });
    return new JSONApiResponse<any[]>(response).value();
  }
}

export const ImportExportApi = new ImportExportApiClient();
