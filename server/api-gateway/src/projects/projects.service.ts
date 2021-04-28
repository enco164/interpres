import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ProjectDto } from "./dto/project.dto";

@Injectable()
export class ProjectsService {
  constructor(
    @Inject("CORE_SERVICE")
    private readonly coreMicroserviceClient: ClientProxy
  ) {}

  getProjects() {
    return this.coreMicroserviceClient.send<ProjectDto[]>(
      { cmd: "projects/getProjects" },
      {}
    );
  }
}
