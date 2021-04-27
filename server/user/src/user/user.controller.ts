import { Controller, Logger } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { FindOrCreateGithubUserDto } from "./dto/find-or-create-github-user-dto";
import { FindUserRequest } from "./dto/find-user.request";
import { UserService } from "./user.service";

@Controller()
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: "findOrCreateGithubUser" })
  findOrCreateGithubUser(
    @Payload() findOrCreateGithubUserDto: FindOrCreateGithubUserDto
  ) {
    this.logger.verbose(
      `{cmd: "findOrCreateGithubUser", payload: ${JSON.stringify(
        findOrCreateGithubUserDto,
        null,
        2
      )}}`
    );
    return this.userService.findOrCreateGithubUser(findOrCreateGithubUserDto);
  }

  @MessagePattern({ cmd: "findUser" })
  findUser(@Payload() findUserDto: FindUserRequest) {
    return this.userService.findUser(findUserDto);
  }
}
