import { BaseApiClient, JSONApiResponse } from "../core/api";
import { UserProfile } from "../features/auth/user-profile";

const BASE_URL = "/api/auth";

class AuthApiClient extends BaseApiClient {
  async getUserProfile(init?: RequestInit) {
    const result = await this.fetchApi(`${BASE_URL}/profile`, init);

    return new JSONApiResponse<UserProfile>(result).value();
  }
}

export const AuthApi = new AuthApiClient();
