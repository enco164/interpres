import { Test, TestingModule } from "@nestjs/testing";
import { UserProfileService } from "./user-profile.service";
import { repositoryMockFactory } from "../../../core/src/util/testing";
import { UserProfileRepository } from "./user-profile.repository";

describe("UserProfileService", () => {
  let service: UserProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserProfileService,
        {
          provide: UserProfileRepository,
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<UserProfileService>(UserProfileService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
