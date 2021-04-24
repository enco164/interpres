import { Injectable } from "@nestjs/common";
import { FindOrCreateGithubUserDto } from "./dto/find-or-create-github-user-dto";

@Injectable()
export class UserService {
  findOrCreateGithubUser(findOrCreateGithubUserDto: FindOrCreateGithubUserDto) {
    return findOrCreateGithubUserDto.profile;
  }
}
