import { Test, TestingModule } from "@nestjs/testing";
import { UserManagementService } from "./user-management.service";
import { ClientProxyFactory } from "@nestjs/microservices";

describe("UserService", () => {
  let service: UserManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserManagementService,
        {
          provide: "USER_MANAGEMENT_SERVICE",
          useFactory: () => ClientProxyFactory.create({}),
        },
      ],
    }).compile();

    service = module.get<UserManagementService>(UserManagementService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
