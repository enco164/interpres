import { ApiError } from "./response";
import { ACCESS_TOKEN_KEY } from "../../features/auth/constants";

export class BaseApiClient {
  protected async fetchApi(
    input: RequestInfo,
    init?: RequestInit
  ): Promise<Response> {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    let authHeader;
    if (token) {
      authHeader = { Authorization: `Bearer ${token}` };
    }
    const response = await fetch(input, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...authHeader,
        ...init?.headers,
      },
    });

    if (!response.ok) {
      throw new ApiError(await response.json());
    }

    return response;
  }
}
