import { Inject, Injectable, Logger } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ProjectDto } from "./dto/project.dto";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";

@Injectable()
export class ProjectsService {
  private readonly logger = new Logger(ProjectsService.name);

  constructor(
    @Inject("CORE_SERVICE")
    private readonly coreMicroserviceClient: ClientProxy,
    @Inject("INTEGRATION_SERVICE")
    private readonly integrationMicroserviceClient: ClientProxy
  ) {}

  getProjects() {
    return this.coreMicroserviceClient.send<ProjectDto[]>(
      { cmd: "projects/getProjects" },
      {}
    );
  }

  createProject(createProjectDto: CreateProjectDto) {
    return this.coreMicroserviceClient.send<ProjectDto>(
      { cmd: "projects/createProject" },
      createProjectDto
    );
  }

  updateProject(id: string, updateProjectDto: UpdateProjectDto) {
    return this.coreMicroserviceClient.send(
      { cmd: "projects/updateProject" },
      { id, updateProjectDto }
    );
  }

  getProjectById(id: string) {
    return this.coreMicroserviceClient.send(
      { cmd: "projects/getProjectById" },
      { id }
    );
  }

  testProjectConnection(createProjectDto: CreateProjectDto) {
    return this.integrationMicroserviceClient.send(
      { cmd: "test-connection" },
      { ...createProjectDto }
    );
  }
}
