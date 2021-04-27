import { Test, TestingModule } from "@nestjs/testing";
import { UserProfileController } from "./user-profile.controller";
import { UserProfileService } from "./user-profile.service";
import { repositoryMockFactory } from "../../../translations/src/util/testing";
import { UserProfileRepository } from "./user-profile.repository";

describe("UserController", () => {
  let controller: UserProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserProfileController],
      providers: [
        UserProfileService,
        {
          provide: UserProfileRepository,
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    controller = module.get<UserProfileController>(UserProfileController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
