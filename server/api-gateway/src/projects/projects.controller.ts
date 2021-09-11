import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import { of } from "rxjs";
import { catchError } from "rxjs/operators";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { ProjectsService } from "./projects.service";

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
  @Get("test-connection")
  testProjectConnection(
    @Query("name") name: string,
    @Query("githubOwner") githubOwner: string,
    @Query("githubRepo") githubRepo: string,
    @Query("lngLoadPath") lngLoadPath: string
  ) {
    return this.projectsService
      .testProjectConnection({
        name,
        lngLoadPath,
        githubOwner,
        githubRepo,
      })
      .pipe(
        catchError((err) => {
          this.logger.error(err);
          return of(err);
        })
      );
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
