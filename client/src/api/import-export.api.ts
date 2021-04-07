import { BaseApiClient, JSONApiResponse, VoidApiResponse } from "../core/api";
import { ExportTranslationsDto } from "./dto/export-translations.dto";
import { ImportFromGithubDto } from "./dto/import-from-github.dto";

const BASE_URL = "/api/translation-service/import-export";

class ImportExportApiClient extends BaseApiClient {
  async exportTranslations(param: ExportTranslationsDto, init?: RequestInit) {
    const response = await this.fetchApi(`${BASE_URL}/export`, {
      ...init,
      method: "POST",
      body: JSON.stringify(param),
    });
    return new JSONApiResponse(response).value();
  }

  async importGithubToProject(param: ImportFromGithubDto, init?: RequestInit) {
    const response = await this.fetchApi(`${BASE_URL}/import`, {
      ...init,
      method: "POST",
      body: JSON.stringify(param),
    });
    return new VoidApiResponse(response).value();
  }
}

export const ImportExportApi = new ImportExportApiClient();
