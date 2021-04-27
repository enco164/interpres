import { Injectable, Logger } from "@nestjs/common";
import { FindOrCreateGithubUserDto } from "./dto/find-or-create-github-user-dto";
import { FindUserRequest } from "./dto/find-user.request";
import { User } from "./entities/user.entity";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly userRepository: UserRepository) {}

  async findOrCreateGithubUser(
    findOrCreateGithubUserDto: FindOrCreateGithubUserDto
  ) {
    this.logger.log(
      `findOrCreateGithubUser: ${JSON.stringify(findOrCreateGithubUserDto)}`
    );

    const profile = findOrCreateGithubUserDto.profile;
    let user = await this.userRepository.findOne({
      providerId: profile.id,
      provider: profile.provider,
    });

    if (!user) {
      user = new User();
      user.provider = profile.provider;
      user.providerId = profile.id;
      user.displayName = profile.displayName;
      user.photo = profile.photos?.[0]?.value;
      user = await this.userRepository.save(user);
    }

    return user;
  }

  findUser(findUserDto: FindUserRequest) {
    return this.userRepository.findOne(findUserDto.userId);
  }
}
