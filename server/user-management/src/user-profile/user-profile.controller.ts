import { Controller, Logger } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { FindOrCreateGithubUserDto } from "./dto/find-or-create-github-user-dto";
import { FindUserProfileRequest } from "./dto/find-user-profile-request";
import { UserProfileService } from "./user-profile.service";

@Controller()
export class UserProfileController {
  private readonly logger = new Logger(UserProfileController.name);

  constructor(private readonly userService: UserProfileService) {}

  @MessagePattern({ cmd: "userProfile/findOrCreateGithubUser" })
  findOrCreateGithubUser(
    @Payload() findOrCreateGithubUserDto: FindOrCreateGithubUserDto
  ) {
    this.logger.verbose(
      JSON.stringify(
        { cmd: "findOrCreateGithubUser", payload: findOrCreateGithubUserDto },
        null,
        2
      )
    );
    return this.userService.findOrCreateGithubUser(findOrCreateGithubUserDto);
  }

  @MessagePattern({ cmd: "userProfile/findUserProfile" })
  findUserProfile(@Payload() findUserDto: FindUserProfileRequest) {
    return this.userService.findUserProfile(findUserDto);
  }
}
