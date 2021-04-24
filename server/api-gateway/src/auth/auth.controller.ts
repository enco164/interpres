import { Controller, Get, Request } from "@nestjs/common";

@Controller("auth")
export class AuthController {
  @Get("github")
  async loginGithub(@Request() req) {
    return req.user;
  }

  @Get("github/callback")
  async loginCallback(@Request() req) {
    return req.user;
  }

  @Get("profile")
  async getProfile(@Request() req) {
    return req.user;
  }
}
