import { Injectable, Logger } from "@nestjs/common";
import { Profile } from "passport-github2";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private userService: UserService) {}

  validateGithubUser(profile: Profile) {
    return this.userService.findOrCreateGithubUser(profile);
  }
}
