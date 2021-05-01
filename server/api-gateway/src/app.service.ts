import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): string {
    return `<a href="/api/auth/github">Sign in with github</a>`;
  }
}
