import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Profile } from "passport-github2";

@Injectable()
export class UserManagementService {
  constructor(
    @Inject("USER_SERVICE") private userMicroserviceClient: ClientProxy
  ) {}

  findOrCreateGithubUser(profile: Profile) {
    return this.userMicroserviceClient.send<Profile>(
      { cmd: "userProfile/findOrCreateGithubUser" },
      { profile }
    );
  }

  findUserProfile(userId: string) {
    return this.userMicroserviceClient.send<Profile>(
      { cmd: "userProfile/findUserProfile" },
      { userId }
    );
  }
}
