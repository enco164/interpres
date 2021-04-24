import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-github2";
import { AuthService } from "./auth.service";

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(GithubStrategy.name);

  constructor(
    private authService: AuthService,
    private configService: ConfigService
  ) {
    super({
      clientID: configService.get<string>("GITHUB_CLIENT_ID"),
      clientSecret: configService.get<string>("GITHUB_CLIENT_SECRET"),
      callbackURL: "http://localhost:8080/auth/github/callback",
      proxy: true,
      scope: ["user:email"],
    });
  }

  async validate(accessToken: string, refreshToken: any, profile: Profile) {
    const user = await this.authService.validateGithubUser(profile).toPromise();

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
