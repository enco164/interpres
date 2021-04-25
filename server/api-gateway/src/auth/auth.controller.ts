import { Controller, Get, Request, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { GithubAuthGuard } from "./github-auth.guard";
import { JwtAuthGuard } from "./jwt-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(GithubAuthGuard)
  @Get("github")
  async loginGithub(@Request() req) {
    return req.user;
  }

  @UseGuards(GithubAuthGuard)
  @Get("github/callback")
  async loginCallback(@Res() res, @Request() req) {
    return res.redirect(`/auth/success?accessToken=${req.user.accessToken}`);
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  async getProfile(@Request() req) {
    return this.authService.getUserProfile(req.user);
  }
}
