import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserProfileController } from "./user-profile.controller";
import { UserProfileRepository } from "./user-profile.repository";
import { UserProfileService } from "./user-profile.service";

@Module({
  imports: [TypeOrmModule.forFeature([UserProfileRepository])],
  controllers: [UserProfileController],
  providers: [UserProfileService],
})
export class UserProfileModule {}
