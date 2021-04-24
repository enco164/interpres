import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): string {
    return "<a href='/auth/github'>Login with Github</a>'";
  }
}
