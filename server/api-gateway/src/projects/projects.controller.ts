import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { ProjectsService } from "./projects.service";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller("projects")
export class ProjectsController {
  private readonly logger = new Logger(ProjectsController.name);

  constructor(private readonly projectsService: ProjectsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getProjects() {
    this.logger.verbose({ request: "GET /projects" });
    return this.projectsService.getProjects();
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  getProjectById(@Param("id") id: string) {
    this.logger.verbose({ request: `GET /projects/${id}` });
    return this.projectsService.getProjectById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createProject(@Body() createProjectDto: CreateProjectDto) {
    this.logger.verbose({ request: "POST /projects", body: createProjectDto });
    return this.projectsService.createProject(createProjectDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(":id")
  updateProject(
    @Param("id") id: string,
    @Body() updateProjectDto: UpdateProjectDto
  ) {
    this.logger.verbose({
      request: `PUT /projects/${id}`,
      body: updateProjectDto,
    });

    return this.projectsService.updateProject(id, updateProjectDto);
  }
}
