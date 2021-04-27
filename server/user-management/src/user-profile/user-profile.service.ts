import { Injectable, Logger } from "@nestjs/common";
import { FindOrCreateGithubUserDto } from "./dto/find-or-create-github-user-dto";
import { FindUserProfileRequest } from "./dto/find-user-profile-request";
import { UserProfileEntity } from "./entities/user-profile.entity";
import { UserProfileRepository } from "./user-profile.repository";

@Injectable()
export class UserProfileService {
  private readonly logger = new Logger(UserProfileService.name);

  constructor(private readonly userRepository: UserProfileRepository) {}

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
      user = new UserProfileEntity();
      user.provider = profile.provider;
      user.providerId = profile.id;
      user.displayName = profile.displayName;
      user.photo = profile.photos?.[0]?.value;
      user = await this.userRepository.save(user);
    }

    return user;
  }

  findUserProfile(findUserDto: FindUserProfileRequest) {
    return this.userRepository.findOne(findUserDto.userId);
  }
}
