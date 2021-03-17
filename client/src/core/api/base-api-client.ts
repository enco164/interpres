import { ApiError } from "./response";

export class BaseApiClient {
  protected async fetchApi(
    input: RequestInfo,
    init?: RequestInit
  ): Promise<Response> {
    const response = await fetch(input, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...init?.headers,
      },
    });

    if (!response.ok) {
      throw new ApiError(await response.json());
    }

    return response;
  }
}
