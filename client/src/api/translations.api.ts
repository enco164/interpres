import { Operation } from "fast-json-patch";
import { BaseApiClient, JSONApiResponse } from "../core/api";
import { CreateTranslationDto } from "../domain/create-translation.dto";
import { Translation } from "../domain/translation";

const BASE_URL = "/api/translations";

class TranslationsApiClient extends BaseApiClient {
  async createTranslation(arg: CreateTranslationDto, signal: AbortSignal) {
    const result = await this.fetchApi(BASE_URL, {
      method: "POST",
      body: JSON.stringify(arg),
      signal,
    });
    return new JSONApiResponse<Translation>(result).value();
  }

  async patchTranslation(
    arg: { translationId: number; patches: Operation[] },
    signal: AbortSignal
  ) {
    const result = await this.fetchApi(`${BASE_URL}/${arg.translationId}`, {
      method: "PATCH",
      body: JSON.stringify(arg.patches),
      signal,
    });
    return new JSONApiResponse<Translation>(result).value();
  }

  async getByProjectId(projectId: string) {
    const params = new URLSearchParams();
    params.append("projectId", projectId);

    const result = await this.fetchApi(`${BASE_URL}?${params.toString()}`);
    return new JSONApiResponse<Translation[]>(result).value();
  }
}

export const TranslationsApi = new TranslationsApiClient();
