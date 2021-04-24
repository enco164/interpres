import { Injectable, Logger } from "@nestjs/common";
import { Profile } from "passport-github2";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private usersService: UsersService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateGithubUser(profile: Profile) {
    return this.usersService.findOrCreateGithubUser(profile);
  }
}
