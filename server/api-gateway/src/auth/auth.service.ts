import { Injectable, Logger } from "@nestjs/common";
import { Profile } from "passport-github2";
import { UserManagementService } from "../user-management/user-management.service";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private userManagementService: UserManagementService) {}

  validateGithubUser(profile: Profile) {
    return this.userManagementService.findOrCreateGithubUser(profile);
  }

  getUserProfile(user: { userId: string }) {
    this.logger.log(`getUserProfile ${JSON.stringify(user)}`);
    return this.userManagementService.findUserProfile(user.userId);
  }
}
