import { Operation } from 'fast-json-patch';
import { BaseApiClient, VoidApiResponse } from '../core/api';

class TranslationsApiClient extends BaseApiClient {
  async patchTranslation(
    arg: { translationId: number; patches: Operation[] },
    signal: AbortSignal,
  ) {
    const result = await this.fetchApi(
      `/api/translation-service/translations/${arg.translationId}`,
      { method: 'PATCH', body: JSON.stringify(arg.patches), signal },
    );
    return new VoidApiResponse(result).value();
  }
}

export const TranslationsApi = new TranslationsApiClient();
