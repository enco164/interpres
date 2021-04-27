import { EntityRepository, Repository } from "typeorm";
import { UserProfileEntity } from "./entities/user-profile.entity";

@EntityRepository(UserProfileEntity)
export class UserProfileRepository extends Repository<UserProfileEntity> {}
