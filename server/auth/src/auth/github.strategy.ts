import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-github2";
import { AuthService } from "./auth.service";

const logger = new Logger("GithubStrategy");

console.log(process.env.GITHUB_CLIENT_ID);

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private configService: ConfigService
  ) {
    super({
      clientID: configService.get<string>("GITHUB_CLIENT_ID"),
      clientSecret: configService.get<string>("GITHUB_CLIENT_SECRET"),
      callbackURL: "http://localhost:8100/auth/github/callback",
      proxy: true,
      scope: ["user:email"],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: any,
    profile: Profile
  ): Promise<any> {
    logger.log(
      `${JSON.stringify(accessToken)} \n${JSON.stringify(
        refreshToken
      )} \n${JSON.stringify(profile)}`
    );
    const user = await this.authService.validateGithubUser(profile);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
