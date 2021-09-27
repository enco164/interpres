import { Body, Controller, Logger, Param } from "@nestjs/common";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { ProjectsService } from "./projects.service";
import { MessagePattern } from "@nestjs/microservices";
import { tap } from "rxjs/operators";

@Controller("projects")
export class ProjectsController {
  private readonly logger = new Logger(ProjectsController.name);

  constructor(private readonly projectsService: ProjectsService) {}

  @MessagePattern({ cmd: "projects/getProjects" })
  getProjects() {
    this.logger.verbose({ cmd: "projects/getProjects" });
    return this.projectsService.findAll();
  }

  @MessagePattern({ cmd: "projects/createProject" })
  create(@Body() createProjectDto: CreateProjectDto) {
    this.logger.verbose({
      cmd: "projects/createProject",
      data: createProjectDto,
    });
    return this.projectsService.create(createProjectDto);
  }

  @MessagePattern({ cmd: "projects/updateProject" })
  update(@Body() body: { id: string; updateProjectDto: UpdateProjectDto }) {
    this.logger.verbose({
      cmd: "projects/updateProject",
      data: body,
    });
    return this.projectsService.update(body.id, body.updateProjectDto);
  }

  @MessagePattern({ cmd: "projects/getProjectById" })
  findOne(@Param("id") id: string) {
    return this.projectsService.findOne(id).pipe(tap((a) => console.log(a)));
  }

  @MessagePattern({ cmd: "projects/deleteProjectById" })
  delete(@Param("id") id: string) {
    return this.projectsService.delete(id);
  }
}
