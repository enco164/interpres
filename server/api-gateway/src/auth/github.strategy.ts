import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-github2";
import { AuthService } from "./auth.service";

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(GithubStrategy.name);

  constructor(
    private authService: AuthService,
    private configService: ConfigService,
    private jwtService: JwtService
  ) {
    super({
      clientID: configService.get<string>("GITHUB_CLIENT_ID"),
      clientSecret: configService.get<string>("GITHUB_CLIENT_SECRET"),
      callbackURL: `${configService.get<string>(
        "BASE_URL"
      )}/api/auth/github/callback`,
      proxy: true,
      scope: ["user:email"],
    });
  }

  async validate(accessToken: string, refreshToken: any, profile: Profile) {
    const user = await this.authService.validateGithubUser(profile).toPromise();
    if (!user) {
      throw new UnauthorizedException();
    }
    const payload = { userId: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
