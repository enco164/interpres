import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import { AppService } from "./app.service";
import { GithubAuthGuard } from "./auth/github-auth.guard";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(GithubAuthGuard)
  @Get("auth/github")
  async loginGithub(@Request() req) {
    return req.user;
  }

  @UseGuards(GithubAuthGuard)
  @Get("auth/github/callback")
  async loginCallback(@Request() req) {
    return req.user;
  }

  @UseGuards(GithubAuthGuard)
  @Get("auth/profile")
  async getProfile(@Request() req) {
    return req.user;
  }
}
